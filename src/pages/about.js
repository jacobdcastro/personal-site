import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../templates/layout';
import { AboutPageWrapper } from '../styles/about/AboutStyles';

const About = props => {
  const seo = {
    page: `about`,
    title: 'About Me',
    description: `${props.data.file.childMarkdownRemark.excerpt}`,
    url: `https://jacobdcastro.com/about`,
    breadcrumbs: [
      {
        name: `About`,
        path: `/about`,
      },
    ],
  };

  return (
    <Layout seo={seo}>
      <AboutPageWrapper
        dangerouslySetInnerHTML={{
          __html: props.data.file.childMarkdownRemark.html,
        }}
      />
    </Layout>
  );
};

export default About;

export const ABOUT_PAGE_QUERY = graphql`
  query ABOUT_PAGE_QUERY {
    file(relativePath: { eq: "me.md" }) {
      childMarkdownRemark {
        id
        excerpt(pruneLength: 370)
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
