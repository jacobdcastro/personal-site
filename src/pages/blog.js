import React from 'react';
import { graphql } from 'gatsby';
// import Moment from 'react-moment';
import Layout from '../templates/layout';
import BlogPageWrapper from '../styles/blog/BlogPageStyles';
import BlogListing from '../components/index/BlogListing';

// TODO add `time to complete`
// <h4>{timeToRead + 10} minutes to complete</h4>

const Tutorials = props => {
  const seo = {
    page: `blog`,
    title: `Blog`,
    description: `I like writing about things. Life updates, random epiphanies, cool lessons, etc. Find 'em here!`,
    url: `https://jacobdcastro.com/blog`,
    imgUrl: `${props.data.pageImg.publicURL}`,
    imgAlt:
      'jdcastro logo, twitter, instagram, facebook, github icons with @jacobdcastro username',
    breadcrumbs: [
      {
        name: `Blog`,
        path: `/blog`,
      },
    ],
  };

  return (
    <Layout seo={seo} path={props.path}>
      <BlogPageWrapper>
        <h1>Blog Posts</h1>
        <div className="blogPostList">
          {props.data.allMarkdownRemark.edges.map(({ node }) => (
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

    pageImg: file(relativePath: { eq: "page-meta-img.jpg" }) {
      publicURL # used for SEO
    }
  }
`;
