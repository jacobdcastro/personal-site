import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import '../pages/normalize.css';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import MobileNav from '../components/MobileNav';
import BlogPageIntro from '../components/BlogPageIntro';
import BlogSubheader from '../components/BlogSubheader';
import Signature from '../components/Signature';
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
  width: 100%;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 27px;
  color: #353535;

  h1 {
    line-height: 2.1rem;
  }

  img {
    width: 100%;
    height: auto;
    max-width: 650px;
  }

  @media (min-width: 820px) {
    width: 80%;
    font-size: 1.1em;
  }
`;

// TODO convert to function component and use Hooks

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
      mobileNavIsOpen: true,
    });
  }

  closeMobileNav() {
    this.setState({
      mobileNavIsOpen: false,
    });
  }

  render() {
    const data = this.props.data.contentfulBlogPost;
    return (
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{data.title} - Jacob D. Castro</title>
          <link
            rel="stylesheet"
            src="//normalize-css.googlecode.com/svn/trunk/normalize.css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700"
            rel="stylesheet"
          />
        </Helmet>
        <MobileNav
          action={this.closeMobileNav}
          open={this.state.mobileNavIsOpen}
        />
        <BlogPageIntro
          action={this.openMobileNav}
          headline={data.title}
          bgImg={data.heroImage.file.url}
        />
        <ContentWrapper>
          <BlogSubheader data={data} />
          <BlogParagraph
            dangerouslySetInnerHTML={{
              __html: data.bodyContent.childMarkdownRemark.html,
            }}
          />
          <Signature />
        </ContentWrapper>

        <Footer backgroundIsBlack={false} />
      </Container>
    );
  }
}

BlogPost.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BlogPost;

export const pageQuery = graphql`
  query blogPostQuery($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      id
      slug
      tags
      title
      subtitle
      published(formatString: "MMMM Do, YYYY")
      heroImage {
        id
        title
        description
        file {
          url
        }
      }
      bodyContent {
        childMarkdownRemark {
          html
        }
      }
      author {
        id
        name
        email
        birthday
        twitterURL
        instagramURL
        githubURL
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
`;
