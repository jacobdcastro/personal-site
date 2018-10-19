import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import '../pages/normalize.css';
import { graphql } from 'gatsby';
import PageIntro from '../components/PageIntro';
import Footer from '../components/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 1.4em;
`;

const ContentWrapper = styled.div`
	margin: 15px auto;
	padding: 8px;
`;

class BlogPost extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { title } = this.props.data.contentfulBlogPost;
		return (
			<Container>
				<PageIntro action={this.openMobileNav} headline={title} aboutPage={false} />

				<ContentWrapper>
					<h1>{title}</h1>
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
          title
          description
        }
    }
  }
`;
