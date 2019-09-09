import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const BlogAuthor = () => {
  const myData = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "me.md" }) {
        childMarkdownRemark {
          id
          frontmatter {
            name
            miniBio
            portrait
            email
            handle
            twitterURL
            instagramURL
            githubURL
            # facebookURL
            # snapchat
            linkedinURL
          }
        }
      }
    }
  `);
  const {
    name,
    miniBio,
    portrait,
    email,
    handle,
  } = myData.file.childMarkdownRemark.frontmatter;

  return (
    <div className="author">
      <h3>{name}</h3>
    </div>
  );
};

export default BlogAuthor;
