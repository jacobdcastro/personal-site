import React from 'react';
import { Link } from 'gatsby';
import { Container } from '../styles/BlogPostCardStyles';

class BlogPreviewCard extends React.Component {
  render() {
    const data = this.props.postData;
    const imageURL = `${data.heroImage.file.url}?`;
    return (
      <Container url={imageURL}>
        <div className="blackLayer">
          <div className="blogTitleSection">
            <h1>{data.title}</h1>
            <h3>{data.subtitle}</h3>
            {/* <h4>By: {data.author.name}</h4> */}
            <p>{data.bodyContent.childMarkdownRemark.excerpt}</p>
            <h5>{data.published}</h5>
          </div>
        </div>
      </Container>
    );
  }
}

export default BlogPreviewCard;
