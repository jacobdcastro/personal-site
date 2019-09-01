import React from 'react';
import { Link } from 'gatsby';

const BlogListing = ({ data }) => {
  const { frontmatter, excerpt } = data;
  console.log(frontmatter.tags);
  return (
    <div className="indexBlogListing">
      <h1>{frontmatter.title}</h1>
      <h3>{frontmatter.date}</h3>
      {/* <ul>
        <li></li>
      </ul> */}
      <p>{excerpt}</p>
      <Link to={`blog/${frontmatter.slug}`}>Read More</Link>
    </div>
  );
};

export default BlogListing;
