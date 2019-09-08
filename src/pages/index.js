import React from 'react';
import { Link, graphql } from 'gatsby';
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

const Index = props => {
  const {
    twitterURL,
    instagramURL,
    githubURL,
    facebookURL, // soon to be launched
    snapchat, // I may use snap?
    linkedinURL,
  } = props.data.file.childMarkdownRemark.frontmatter;

  return (
    <Layout>
      <IndexPageWrapper>
        <div className="indexIntro">
          <h1>
            I'm Jacob Daniel Castro,
            <br />a frontend Javascript
            <br /> developer.
          </h1>
          <ul className="introSocialLinks">
            <li>
              <a target="_blank" href={twitterURL}>
                <Twitter />
              </a>
            </li>
            <li>
              <a target="_blank" href={instagramURL}>
                <Instagram />
              </a>
            </li>
            {/* <li>
              <a target="_blank" href={facebookURL}>
                <Facebook />
              </a>
            </li> */}
            <li>
              <a target="_blank" href={linkedinURL}>
                <Linkedin />
              </a>
            </li>
            {/* <li>
              <a target="_blank" href={snapchat}>
                <Snapchat />
              </a>
            </li> */}
            <li>
              <a target="_blank" href={githubURL}>
                <Github />
              </a>
            </li>
          </ul>
        </div>

        <div className="downArrowLink">
          <a href="#blogPosts">
            <Arrow />
          </a>
        </div>

        {/* Blog posts */}
        <div id="blogPosts">
          <h1>Recent Blog Posts</h1>

          {props.data.allMarkdownRemark.edges.map(({ node }) => (
            <BlogListing data={node} />
          ))}
        </div>
      </IndexPageWrapper>
    </Layout>
  );
};

export default Index;

export const INDEX_POSTS_QUERY = graphql`
  query INDEX_POSTS_QUERY {
    # all blog posts, sorted by most recent
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "blogPost" } } }
      sort: { fields: frontmatter___date, order: DESC }
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
          excerpt(pruneLength: 370)
          timeToRead
        }
      }
    }

    # social links from about markdown file
    file(relativePath: { eq: "me.md" }) {
      childMarkdownRemark {
        id
        frontmatter {
          email
          phone
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
  }
`;
