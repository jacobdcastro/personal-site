import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Layout from '../templates/layout';
import { IndexPageWrapper } from '../styles/index/IndexStyles';
import BlogListing from '../components/index/BlogListing';

import Twitter from '../images/svg/TwitterSVG';
import Instagram from '../images/svg/InstagramSVG';
import Facebook from '../images/svg/FacebookSVG';
import Linkedin from '../images/svg/LinkedinSVG';
import Snapchat from '../images/svg/SnapchatSVG'
import Github from '../images/svg/GithubSVG'

const Index = props => {
  const {
    twitterURL,
    instagramURL,
    githubURL,
    facebookURL,
    snapchat,
    linkedinURL,
  } = props.data.markdownRemark.frontmatter;

  return (
    <Layout>
      <IndexPageWrapper>
        <div className="indexIntro">
          <h1>
            I'm Jacob Daniel Castro,
            <br />a frontend Javascript developer.
          </h1>
          <ul className="introSocialLinks">
            <li>
              <a href={twitterURL}>
                <Twitter />
              </a>
            </li>
            <li>
              <a href={instagramURL}>
                <Instagram />
              </a>
            </li>
            <li>
              <a href={facebookURL}>
                <Facebook />
              </a>
            </li>
            <li>
              <a href={linkedinURL}>
                <Linkedin />
              </a>
            </li>
            <li>
              <a href={snapchat}>
                <Snapchat />
              </a>
            </li>
            <li>
              <a href={githubURL}>
                <Github />
              </a>
            </li>
          </ul>
        </div>

        {/* Blog posts */}
        {props.data.allMarkdownRemark.edges.map(({ node }) => (
          <BlogListing key={node.id} data={node} />
        ))}
      </IndexPageWrapper>
    </Layout>
  );
};

export default Index;

export const INDEX_POSTS_QUERY = graphql`
  query INDEX_POSTS_QUERY {
    allMarkdownRemark(
      filter: { frontmatter: { blogPost: { eq: "blogPost" } } }
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
          }
          excerpt
        }
      }
    }

    markdownRemark(id: { eq: "d21e791e-6fd7-5ccc-aa43-ea0a780039e5" }) {
      id
      html
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
`;
