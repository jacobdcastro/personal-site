import React from 'react';
import { Link } from 'gatsby';
import Layout from '../templates/layout';
import { AboutPageWrapper } from '../styles/about/AboutStyles';

const About = ({ data }) => {
  return (
    <Layout>
      <AboutPageWrapper>
        <Link to="/">To Home Page</Link>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </AboutPageWrapper>
    </Layout>
  );
};

export default About;

export const ABOUT_PAGE_QUERY = graphql`
  query ABOUT_PAGE_QUERY {
    markdownRemark(id: { eq: "d21e791e-6fd7-5ccc-aa43-ea0a780039e5" }) {
      id
      html
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
    }
  }
`;
