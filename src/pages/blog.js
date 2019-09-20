import React from 'react';
import { graphql } from 'gatsby';
// import Moment from 'react-moment';
import Layout from '../templates/layout';
import BlogPageWrapper from '../styles/blog/BlogPageStyles';
import BlogListing from '../components/index/BlogListing';

// TODO add `time to complete`
// <h4>{timeToRead + 10} minutes to complete</h4>

const Tutorials = ({ data }) => {
  const seo = {
    page: `blog`,
    title: `Blog`,
    description: `I like writing about things. Life updates, random epiphanies, cool lessons, etc. Find 'em here!`,
    url: `https://jacobdcastro.com/blog`,
    breadcrumbs: [
      {
        name: `Blog`,
        path: `/blog`,
      },
    ],
  };

  return (
    <Layout seo={seo}>
      <BlogPageWrapper>
        <h1>Blog Posts</h1>
        <div className="blogPostList">
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <BlogListing key={node.id} data={node} />
          ))}
        </div>
      </BlogPageWrapper>
    </Layout>
  );
};

export default Tutorials;

export const BLOG_PAGE_QUERY = graphql`
  query BLOG_PAGE_QUERY {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "blogPost" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 300)
          html
          timeToRead
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
