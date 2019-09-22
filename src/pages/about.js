import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../templates/layout';
import { AboutPageWrapper } from '../styles/about/AboutStyles';

const About = props => {
  const seo = {
    page: `about`,
    title: 'About Me',
    description: `${props.data.me.childMarkdownRemark.excerpt}`,
    url: `https://jacobdcastro.com/about`,
    imgUrl: `${props.data.pageImg.publicURL}`,
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
          __html: props.data.me.childMarkdownRemark.html,
        }}
      />
    </Layout>
  );
};

export default About;

export const ABOUT_PAGE_QUERY = graphql`
  query ABOUT_PAGE_QUERY {
    me: file(relativePath: { eq: "me.md" }) {
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

    pageImg: file(relativePath: { eq: "page-meta-img.jpg" }) {
      publicURL # used for SEO
    }
  }
`;
