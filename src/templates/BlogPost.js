import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import '../pages/normalize.css';
import { graphql } from 'gatsby';
import Helmet from 'gatsby';
import BlogPageIntro from '../components/BlogPageIntro';
import Footer from '../components/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const ContentWrapper = styled.div`
  padding: 15px;
  width: 88%;
  max-width: 1125px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlogParagraph = styled.p`
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  margin: 14px auto;
  max-width: 1125px;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 27px;
  color: #353535;

  @media (min-width: 820px) {
    width: 80%;
    font-size: 1.1em;
  }
`;

class BlogPost extends React.Component {
	constructor(props) {
		super(props);
		this.openMobileNav = this.openMobileNav.bind(this);
		this.closeMobileNav = this.closeMobileNav.bind(this);

		this.state = {
			mobileNavIsOpen: false,
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
			<Container>
				<Helmet>
					<meta charSet="utf-8" />
					<title>{this.props.data.contentfulBlogPost.title} - Jacob D. Castro</title>
					<link rel="stylesheet" src="//normalize-css.googlecode.com/svn/trunk/normalize.css" />
					<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700" rel="stylesheet" />
				</Helmet>
				<BlogPageIntro
					action={this.openMobileNav}
					headline={this.props.data.contentfulBlogPost.title}
					subheadline={this.props.data.contentfulBlogPost.subtitle}
					aboutPage={false} />

				<ContentWrapper>
					<BlogParagraph>
						{this.props.data.contentfulBlogPost.bodyContent.bodyContent}
					</BlogParagraph>
				</ContentWrapper>

				<Footer />
			</Container>
		);
	}
}

BlogPost.propTypes = {
	data: PropTypes.object.isRequired
};

export default BlogPost;

export const pageQuery = graphql`
  query blogPostQuery($slug: String!){
    contentfulBlogPost(slug: {eq: $slug}) {
			title
      slug
      subtitle
      bodyContent {
        bodyContent
      }
      published
      heroImage {
        file {
          url
          fileName
          contentType
        }
      }
    }
  }
`;
