import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import './normalize.css';
import Layout from '../templates/layout';
import BlogPreviewCard from '../components/BlogPreviewCard';

const BlogListContainer = styled.div`
	height: auto;
	width: 90%;
	max-width: 1125px;
	margin: 20px auto;
	text-align: center;
`;

const AboutHeadline = styled.h2`
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  text-align: center;
  letter-spacing: 1px;
  color: #353535;
    @media (min-width: 820px) {
      font-size: 2em;
    }
`;

const BlogPostList = styled.div`
	display: grid;
	grid: auto / auto;
  padding: 0;
	margin: 0 auto;
  width: 95%;
  max-width: 1125px;
	grid-row-gap: 20px;
	grid-column-gap: 20px;
	@media (min-width: 820px) {
		width: 760px;
		margin: auto;
		grid: auto / repeat(2, auto);
	}
	@media (min-width: 1270px) {
		width: 1100px;
		grid: auto / repeat(3, auto);
	}
`;

class Blog extends React.Component {
	render() {
		return (
			<Layout
				pageTitle="Blog - "
				headline="Blog"
				className="blogPage"
				backgroundIsBlack={false}
			>

				<BlogListContainer>
					<AboutHeadline>RECENT POSTS</AboutHeadline>
					<BlogPostList>
						{/* create new array of individual blog post preview cards */}
						{this.props.data.allContentfulBlogPost.edges.map(({node}) => {
							const blogSlug = `blog/${node.slug}`; //set dynamic slug and insert in <Link> component
							return (
								<Link key={node.id} to={blogSlug}
									style={{
										textDecoration: 'none',
										margin: '0',
										padding: '0'}}>
									<BlogPreviewCard key={node.id} postData={node} />
								</Link>
							);
						})}
					</BlogPostList>
				</BlogListContainer>

			</Layout>
		);
	}
}

export default Blog;

export const pageQuery = graphql`
	query BlogPageQuery {
		allContentfulBlogPost {
			edges {
				node {
					id
	        title
	        slug
	        subtitle
	        published(formatString: "MMMM Do, YYYY")
					bodyContent {
			      childMarkdownRemark {
							excerpt(pruneLength: 50)
						}
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
	        author {
	          id
	          name
	          email
	          birthday
	          biography {
	            biography
	          }
	        }
				}
			}
		}
	}
`;
