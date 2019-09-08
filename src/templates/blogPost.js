import React from 'react';
import Layout from './layout';
import { Link, graphql } from 'gatsby';

// TODO add next and previous post links

const blogPost = ({ data }) => {
  return (
    <Layout style={{ textAlign: 'left' }}>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <h4>{data.markdownRemark.frontmatter.subtitle}</h4>

      <article dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Layout>
  );
};

export default blogPost;

export const BLOG_POST_QUERY = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        slug
        subtitle
        date
        tags
        type
      }
    }
  }
`;
