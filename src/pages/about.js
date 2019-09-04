import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../templates/layout';
import { AboutPageWrapper } from '../styles/about/AboutStyles';

const About = props => {
  return (
    <Layout>
      <AboutPageWrapper>
        <Link to="/">To Home Page</Link>
        <div
          dangerouslySetInnerHTML={{
            __html: props.data.file.childMarkdownRemark.html,
          }}
        />
      </AboutPageWrapper>
    </Layout>
  );
};

export default About;

export const ABOUT_PAGE_QUERY = graphql`
  query ABOUT_PAGE_QUERY {
    file(relativePath: { eq: "me.md" }) {
      childMarkdownRemark {
        id
        frontmatter {
          title
          lastUpdated
          name
          email
          phone
          miniBio
          portrait
          handle
          username
          twitterURL
          instagramURL
          githubURL
          facebookURL
          snapchat
          linkedinURL
        }
        html
      }
    }
  }
`;
