const path = require('path');

exports.createPages = ({ graphql, actions }) => {
	const {createPage} = actions;
	return new Promise((resolve, reject) => {
		const blogPostTemplate = path.resolve('src/templates/BlogPost.js');
		resolve(
			graphql(`
				{
				  allContentfulBlogPost (limit: 100) {
				    edges {
				      node {
								id
				        title
				        slug
				        subtitle
				        published(formatString: "MMMM Do, YYYY")
				        bodyContent {
				          bodyContent
				        }
								heroImage {
				          title
				          description
				          file {
				            url
				            fileName
				            contentType
				          }
				        }
								bodyContent {
						      childMarkdownRemark {
										html
										excerpt(pruneLength: 77)
									}
						    }
				        author {
				          id
				          name
				          email
				          birthday
									avatar {
										file {
											url
										}
									}
				          biography {
				            biography
				          }
				        }
				      }
				    }
				  }
				}
      `).then((result) => {
				if (result.errors) {
					reject(result.errors);
				}
				result.data.allContentfulBlogPost.edges.forEach((edge) => {
					createPage ({
						path: `blog/${edge.node.slug}`,
						component: blogPostTemplate,
						context: {
							slug: edge.node.slug
						}
					});
				});

				return;
			})
		);
	});
};
