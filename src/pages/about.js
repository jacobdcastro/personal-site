import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../templates/layout';
import { AboutPageWrapper } from '../styles/about/AboutStyles';

const About = ({ path, data }) => {
  const seo = {
    page: 'about',
    title: 'About Me',
    description: `${data.me.childMarkdownRemark.excerpt}`,
    url: 'https://jacobdcastro.com/about',
    imgUrl: `${data.pageImg.publicURL}`,
    imgAlt:
      'jdcastro logo, twitter, instagram, facebook, github icons with @jacobdcastro username',
    breadcrumbs: [
      {
        name: 'About',
        path: '/about',
      },
    ],
  };

  return (
    <Layout seo={seo} path={path}>
      <AboutPageWrapper
        dangerouslySetInnerHTML={{
          __html: data.me.childMarkdownRemark.html,
        }}
      />
    </Layout>
  );
};

About.propTypes = {
  path: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
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
