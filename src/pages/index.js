import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../templates/layout';
import { IndexPageWrapper } from '../styles/index/IndexStyles';
import BlogListing from '../components/index/BlogListing';

import Twitter from '../images/svg/TwitterSVG';
import Instagram from '../images/svg/InstagramSVG';
import Facebook from '../images/svg/FacebookSVG';
import Linkedin from '../images/svg/LinkedinSVG';
import Snapchat from '../images/svg/SnapchatSVG';
import Github from '../images/svg/GithubSVG';
import Arrow from '../images/svg/DownArrowSVG';

const Index = ({ path, data }) => {
  const {
    miniBio,
    twitterURL,
    instagramURL,
    githubURL,
    facebookURL, // soon to be launched
    snapchat, // I may use snap?
    linkedinURL,
  } = data.me.childMarkdownRemark.frontmatter;

  const seo = {
    page: `index`,
    title: '',
    description: `${miniBio}`,
    url: `https://jacobdcastro.com`,
    imgUrl: `${data.pageImg.publicURL}`,
    imgAlt:
      'jdcastro logo, twitter, instagram, facebook, github icons with @jacobdcastro username',
    breadcrumbs: [],
  };

  return (
    <Layout seo={seo} path={path}>
      <IndexPageWrapper>
        <div className="indexIntro">
          <h1>
            I'm Jacob Daniel Castro,
            <br />a fullstack JavaScript
            <br /> developer.
          </h1>
          <ul className="introSocialLinks">
            <li>
              <a
                target="_blank"
                href={twitterURL}
                rel="noopener"
                aria-label="Jacob's twitter profile"
              >
                <Twitter />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href={instagramURL}
                rel="noopener"
                aria-label="Jacob's Instagram page"
              >
                <Instagram />
              </a>
            </li>
            {/* <li>
              <a
                target="_blank"
                href={facebookURL}
                rel="noopener"
                aria-label="Jacob's Facebook page"
              >
                <Facebook />
              </a>
            </li> */}
            <li>
              <a
                target="_blank"
                href={linkedinURL}
                rel="noopener"
                aria-label="Jacob's linkedin profile"
              >
                <Linkedin />
              </a>
            </li>
            {/* <li>
              <a
                target="_blank"
                href={snapchat}
                rel="noopener"
                aria-label="jacob's snapchat account"
              >
                <Snapchat />
              </a>
            </li> */}
            <li>
              <a
                target="_blank"
                href={githubURL}
                rel="noopener"
                aria-label="Jacob's Github page"
              >
                <Github />
              </a>
            </li>
          </ul>
        </div>

        <div className="downArrowLink">
          <a
            href="#recentPublications"
            aria-label="scroll down to recent publications section"
            style={{ height: '50px', width: '50px' }}
          >
            <Arrow />
          </a>
        </div>

        {/* Blog posts */}
        <div id="recentPublications">
          <h1>All Recent Publications</h1>

          {data.allMarkdownRemark.edges.map(({ node }) => (
            <BlogListing key={node.id} data={node} />
          ))}
        </div>
      </IndexPageWrapper>
    </Layout>
  );
};

Index.propTypes = {
  path: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default Index;

export const INDEX_POSTS_QUERY = graphql`
  query INDEX_POSTS_QUERY {
    # all blog posts, sorted by most recent
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { type: { in: ["blogPost", "tutorial"] } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            date
            title
            slug
            subtitle
            tags
            type
          }
          excerpt(pruneLength: 300)
          timeToRead
        }
      }
    }

    # social links from about markdown file
    me: file(relativePath: { eq: "me.md" }) {
      childMarkdownRemark {
        id
        frontmatter {
          email
          phone
          handle
          miniBio
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

    pageImg: file(relativePath: { eq: "page-meta-img.jpg" }) {
      publicURL # used for SEO
    }
  }
`;
