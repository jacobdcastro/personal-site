import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../templates/layout';
import { IndexPagWrapper } from '../styles/index/IndexStyles';
import BlogListing from '../components/index/BlogListing';

const Index = props => {
  return (
    <Layout>
      <IndexPagWrapper>
        <h1>Hello there</h1>
        <Link to="/about">To About Page</Link>

        {props.data.allMarkdownRemark.edges.map(({ node }) => (
          <BlogListing key={node.id} data={node} />
        ))}
      </IndexPagWrapper>
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
  }
`;
