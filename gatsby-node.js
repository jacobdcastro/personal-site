const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, reject } = actions;
  const blogRes = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "blogPost" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
              image
            }
          }
        }
      }
    }
  `);

  if (blogRes.errors) {
    reject(blogRes.errors);
  }

  const blogPostTemplate = path.resolve('./src/templates/blogPost.js');

  blogRes.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `blog/${node.frontmatter.slug}`,
      component: blogPostTemplate,
      context: {
        id: node.id,
        slug: node.frontmatter.slug,
        // relative filepath for blogPost.js query
        imgUrl: `content/blog-posts/${node.frontmatter.image}`,
      },
    });
  });

  // ============================================================

  const tutorialRes = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "tutorial" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
              image
            }
          }
        }
      }
    }
  `);

  if (tutorialRes.errors) {
    reject(tutorialRes.errors);
  }

  // reuse blogPostTemplate from above
  // const blogPostTemplate = path.resolve('./src/templates/blogPost.js');

  tutorialRes.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `tutorials/${node.frontmatter.slug}`,
      component: blogPostTemplate,
      context: {
        id: node.id,
        slug: node.frontmatter.slug,
        // relative filepath for blogPost.js query
        imgUrl: `content/tutorials/${node.frontmatter.image}`,
      },
    });
  });

  return;
};
