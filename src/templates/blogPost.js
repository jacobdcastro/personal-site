import React from 'react';
import Layout from './layout';
import { Link, graphql } from 'gatsby';

const blogPost = ({ data }) => {
  return (
    <Layout>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <h4>{data.markdownRemark.frontmatter.subtitle}</h4>

      <main dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
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
        date(formatString: "MM-DD-YYYY")
        tags
        blogPost
      }
    }
  }
`;
