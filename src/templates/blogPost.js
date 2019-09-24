import React from 'react';
import Layout from './layout';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Moment from 'react-moment';
import BlogAuthor from '../components/blog/BlogAuthor';
import BlogPostPageWrapper from '../styles/blog/BlogPostStyles';
import JDCLogo from '../images/svg/SignatureLogoSVG';

// TODO add next and previous post links

const blogPost = props => {
  const {
    title,
    subtitle,
    slug,
    type,
    imageTitle,
    imageAlt,
    date,
  } = props.data.markdownRemark.frontmatter;

  // ? set SEO meta data depending on post type
  let seo;
  if (type === 'blogPost') {
    seo = {
      page: `${type}`,
      title: `${title}`,
      description: `${props.data.markdownRemark.excerpt}`,
      url: `https://jacobdcastro.com/${slug}`,
      imgUrl: `${props.data.file.publicURL}`,
      imgAlt: `${props.data.file.imageAlt}`,
      breadcrumbs: [
        {
          name: `Blog`,
          path: `/blog`,
        },
        {
          name: `${title}`,
          path: `/blog/${slug}`,
        },
      ],
    };
  } else if (type === 'tutorial') {
    seo = {
      page: `${type}`,
      title: `${title}`,
      description: `${props.data.markdownRemark.excerpt}`,
      url: `https://jacobdcastro.com/${slug}`,
      imgUrl: `${props.data.file.publicURL}`,
      imgAlt: `${props.data.file.imageAlt}`,
      breadcrumbs: [
        {
          name: `Tutorials`,
          path: `/tutorials`,
        },
        {
          name: `${title}`,
          path: `/tutorials/${slug}`,
        },
      ],
    };
  }

  return (
    <Layout seo={seo} path={props.path} style={{ textAlign: 'left' }}>
      <BlogPostPageWrapper>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p className="published">
          Published: <Moment date={date} format="MMM DD, YYYY" />
        </p>

        {props.data.markdownRemark.timeToRead &&
          (type === 'tutorial' ? (
            <p>
              Approx. {props.data.markdownRemark.timeToRead + 5} minutes to
              complete
            </p>
          ) : (
            <p>{props.data.markdownRemark.timeToRead} minute read</p>
          ))}

        <BlogAuthor />

        <Img
          style={{
            marginBottom: '25px',
          }}
          fluid={props.data.file.childImageSharp.fluid}
          alt={imageAlt}
          title={imageTitle}
        />

        <article
          dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
        />

        <div className="closing">
          <JDCLogo />
          <h3>- Jacob D. Castro</h3>
        </div>
      </BlogPostPageWrapper>
    </Layout>
  );
};

export default blogPost;

export const BLOG_POST_QUERY = graphql`
  query($slug: String!, $imgUrl: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      excerpt(pruneLength: 370)
      timeToRead
      frontmatter {
        type
        title
        slug
        subtitle
        image
        imageTitle
        imageAlt
        date
        tags
      }
    }

    file(relativePath: { eq: $imgUrl }) {
      publicURL # used for SEO
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
