import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
// import Moment from 'react-moment';
import Layout from '../templates/layout';
import BlogPageWrapper from '../styles/blog/BlogPageStyles';
import BlogListing from '../components/index/BlogListing';

const Blog = ({ path, data }) => {
  const seo = {
    page: 'blog',
    title: 'Blog',
    description:
      // eslint-disable-next-line quotes
      "I like writing about things. Life updates, random epiphanies, cool lessons, etc. Find 'em here!",
    url: 'https://jacobdcastro.com/blog',
    imgUrl: `${data.pageImg.publicURL}`,
    imgAlt:
      'jdcastro logo, twitter, instagram, facebook, github icons with @jacobdcastro username',
    breadcrumbs: [
      {
        name: 'Blog',
        path: '/blog',
      },
    ],
  };

  return (
    <Layout seo={seo} path={path}>
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

Blog.propTypes = {
  path: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default Blog;

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
            tags
          }
        }
      }
    }

    pageImg: file(relativePath: { eq: "page-meta-img.jpg" }) {
      publicURL # used for SEO
    }
  }
`;
