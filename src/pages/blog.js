import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import './normalize.css';
import { Container } from '../styles/BlogStyles';
import Layout from '../templates/layout';
import BlogPreviewCard from '../components/BlogPreviewCard';

class Blog extends React.Component {
  render() {
    return (
      <Layout
        pageTitle="Blog - "
        headline="Blog"
        className="blogPage"
        backgroundIsBlack={false}
      >
        <Container>
          <h2>RECENT POSTS</h2>
          <div className="blogPostList">
            {/* create new array of individual blog post preview cards */}
            {this.props.data.allContentfulBlogPost.edges.map(({ node }) => {
              const blogSlug = `blog/${node.slug}`; //set dynamic slug and insert in <Link> component
              return (
                <Link
                  key={node.id}
                  to={blogSlug}
                  style={{
                    textDecoration: 'none',
                    margin: '0',
                    padding: '0',
                  }}
                >
                  <BlogPreviewCard key={node.id} postData={node} />
                </Link>
              );
            })}
          </div>
        </Container>
      </Layout>
    );
  }
}

export default Blog;

export const pageQuery = graphql`
  query BlogPageQuery {
    allContentfulBlogPost(sort: { order: DESC, fields: createdAt }) {
      edges {
        node {
          id
          title
          slug
          subtitle
          published(formatString: "MMMM Do, YYYY")
          bodyContent {
            childMarkdownRemark {
              excerpt(pruneLength: 50)
            }
          }
          heroImage {
            title
            description
            file {
              url
              fileName
              contentType
            }
          }
          author {
            id
            name
            email
            birthday
            biography {
              biography
            }
          }
        }
      }
    }
  }
`;
