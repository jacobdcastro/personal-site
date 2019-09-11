import React from 'react';
import { graphql } from 'gatsby';
// import Moment from 'react-moment';
import Layout from '../templates/layout';
import TutorialsPageWrapper from '../styles/tutorials/TutorialsPageStyles';
import BlogListing from '../components/index/BlogListing';

// TODO add `time to complete`
// <h4>{timeToRead + 10} minutes to complete</h4>

const Tutorials = ({ data }) => {
  return (
    <Layout>
      <TutorialsPageWrapper>
        <h1>Tutorials</h1>
        <div className="tutorialsList">
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <BlogListing data={node} />
          ))}
        </div>
      </TutorialsPageWrapper>
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
          excerpt(pruneLength: 400)
          html
          # timeToRead
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
