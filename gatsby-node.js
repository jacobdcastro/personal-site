const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { blogPost: { eq: "blogPost" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reject(result.errors);
  }

  const blogPostTemplate = path.resolve('./src/templates/blogPost.js');

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `blog/${node.frontmatter.slug}`,
      component: blogPostTemplate,
      context: {
        id: node.id,
        slug: node.frontmatter.slug,
      },
    });
  });

  return;
};
