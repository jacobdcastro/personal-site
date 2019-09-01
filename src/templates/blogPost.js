import React from 'react';
import Layout from './layout';
import { Link, graphql } from 'gatsby';

const blogPost = props => {
  const data = props.data.markdownRemark;

  return (
    <Layout>
      <h1>{data.frontmatter.title}</h1>
      <h4>{data.frontmatter.subtitle}</h4>

      <main dangerouslySetInnerHTML={{ __html: data.html }} />
    </Layout>
  );
};

export default blogPost;

export const BLOG_POST_QUERY = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        slug
        subtitle
        date(formatString: "MM-DD-YYYY")
        image
        imageAlt
        imageTitle
        tags
        blogPost
      }
    }
  }
`;
