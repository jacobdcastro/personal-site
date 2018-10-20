import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import './normalize.css';
import PageIntro from '../components/PageIntro';
import MobileNav from '../components/MobileNav';
import BlogPostCard from '../components/BlogPostCard';
import Footer from '../components/Footer';

const Container = styled.div`
	margin: 0;
	padding: 0;
`;

const BodyContent = styled.div`
  padding: 15px;
  width: 88%;
  max-width: 1125px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class Blog extends React.Component {
	constructor(props) {
		super(props);
		this.openMobileNav = this.openMobileNav.bind(this);
		this.closeMobileNav = this.closeMobileNav.bind(this);

		this.state = {
			mobileNavIsOpen: false,
			bgImg: '../images/cave.jpg'
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
		const posts = this.props.data.allContentfulBlogPost;
		return (
			<Container>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Blog - Jacob D. Castro</title>
					<link rel="stylesheet" src="//normalize-css.googlecode.com/svn/trunk/normalize.css" />
					<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700" rel="stylesheet" />
				</Helmet>

				<MobileNav action={this.closeMobileNav} open={this.state.mobileNavIsOpen} />

				<PageIntro action={this.openMobileNav} headline="Blog" aboutPage={true} />

				<BodyContent>
					<Link to={posts.edges[0].node.slug}>
						<h1>{posts.edges[0].node.title}</h1>
					</Link>
					<Link to={posts.edges[1].node.slug}>
						<h1>{posts.edges[1].node.title}</h1>
					</Link>
				</BodyContent>

				<Footer backgroundIsBlack={false} />

			</Container>
		);
	}
}

export default Blog;

export const pageQuery = graphql`
	query BlogPageQuery {
		allContentfulBlogPost (filter: {
			node_locale: {eq: "en-US"}
		}) {
			edges {
				node {
					title
					slug
				}
			}
		}
	}
`;
