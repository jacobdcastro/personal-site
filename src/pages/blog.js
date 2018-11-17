import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import './normalize.css';
import PageIntro from '../components/PageIntro';
import MobileNav from '../components/MobileNav';
import BlogPreviewCard from '../components/BlogPreviewCard';
import Footer from '../components/Footer';

//styled component
const PageContainer = styled.div`
	margin: 0;
	padding: 0;
`;

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
	constructor(props) {
		super(props);
		this.openMobileNav = this.openMobileNav.bind(this);
		this.closeMobileNav = this.closeMobileNav.bind(this);

		this.state = {
			mobileNavIsOpen: false,
			bgImg: '../images/cave.jpg',
		};
	}

	openMobileNav() {
		this.setState({
			mobileNavIsOpen: true
		});
	}

	closeMobileNav() {
		this.setState({
			mobileNavIsOpen: false
		});
	}


	render() {
		return (
			<PageContainer>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Blog - Jacob D. Castro</title>
					<link rel="stylesheet" src="//normalize-css.googlecode.com/svn/trunk/normalize.css" />
					<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700" rel="stylesheet" />
				</Helmet>
				<MobileNav action={this.closeMobileNav} open={this.state.mobileNavIsOpen} />
				<PageIntro action={this.openMobileNav} headline="Blog" aboutPage={false} />

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

				<Footer backgroundIsBlack={false} />
			</PageContainer>
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
							html
							excerpt
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
