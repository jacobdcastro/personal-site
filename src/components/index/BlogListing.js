import React from 'react';

const BlogListing = ({ data }) => {
  const { frontmatter, excerpt } = data;
  return (
    <div className="indexBlogListing">
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      <p>{excerpt}</p>
    </div>
  );
};

export default BlogListing;
