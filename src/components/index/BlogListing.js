import React from 'react';
import { Link } from 'gatsby';
import BlogListWrapper from '../../styles/index/BlogListingStyles';
import RightArrow from '../../images/svg/RightArrowSVG';

const BlogListing = ({ data }) => {
  const { frontmatter, excerpt } = data;

  return (
    <BlogListWrapper>
      <h1>{frontmatter.title}</h1>
      <ul>
        {frontmatter.tags.map((tag, i) => (
          <li className="listingTag" key={i}>
            {tag}
          </li>
        ))}
      </ul>
      <h3>Published: {frontmatter.date}</h3>
      <p>{excerpt}</p>
      <Link className="readMore" to={`/blog/${frontmatter.slug}`}>
        <p>Read More</p>
        <RightArrow />
      </Link>
    </BlogListWrapper>
  );
};

export default BlogListing;
