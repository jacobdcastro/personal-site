// const path = require('path');

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions;
//   const result = await graphql(`
//     {
//       allMarkdownRemark(
//         sort: { fields: [frontmatter___date], order: DESC }
//         filter: { frontmatter: { blogPost: { eq: "blogPost" } } }
//       ) {
//         edges {
//           node {
//             id
//             frontmatter {
//               title
//               date
//               slug
//               blogPost
//             }
//           }
//         }
//       }
//     }
//   `);

//   if (result.errors) {
//     reject(result.errors);
//   }

//   const blogPostTemplate = path.resolve('src/templates/BlogPost.js');

//   result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//     createPage({
//       path: `blog/${node.slug}`,
//       component: blogPostTemplate,
//       context: {
//         id: node.id,
//         slug: node.frontmatter.slug,
//       },
//     });
//   });

//   return;
// };
