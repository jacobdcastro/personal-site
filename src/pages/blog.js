import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import './normalize.css';
import PageIntro from '../components/PageIntro';
import MobileNav from '../components/MobileNav';
import BlogPreviewCard from '../components/BlogPreviewCard';
import Footer from '../components/Footer';

const PageContainer = styled.div`
	margin: 0;
	padding: 0;
`;

const BlogListContainer = styled.div`
	height: auto;
	max-width: 1125px;
	margin: 20px auto;
	text-align: center;
`;

const BlogPostList = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
  padding: 15px;
	margin: 0 auto;
  width: 88%;
  max-width: 1125px;

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
		// variable 'posts' is an array of all blog posts
		// const posts = this.props.data.allContentfulBlogPost.edges;
		console.log(this.props.data.allContentfulBlogPost.edges);

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
					<h1>Recent Posts</h1>
					<BlogPostList>
						{this.props.data.allContentfulBlogPost.edges.map(({node}) => {
							return (
								<Link key={node.id} to={node.slug}>
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
					published
					heroImage {
						file {
							url
							fileName
							contentType
						}
					}
					author {
						firstName
						lastName
						birthday
					}
				}
			}
		}
	}
`;
