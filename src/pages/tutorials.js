import React from 'react';
import { graphql } from 'gatsby';
import Moment from 'react-moment';
import Layout from '../templates/layout';
import TutorialsPageStyles from '../styles/tutorials/TutorialsPageStyles';
import BlogListing from '../components/index/BlogListing';

const Tutorials = ({ data }) => {
  return (
    <Layout>
      <TutorialsPageStyles>
        <h1>Tutorials</h1>
        <div className="tutorialsList">
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <BlogListing data={node} />
          ))}
        </div>
      </TutorialsPageStyles>
    </Layout>
  );
};

export default Tutorials;

export const TUTORIALS_PAGE_QUERY = graphql`
  query TUTORIALS_PAGE_QUERY {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "tutorial" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          html
          frontmatter {
            slug
            title
            date
            liveLink
            repo
            type
          }
        }
      }
    }
  }
`;
