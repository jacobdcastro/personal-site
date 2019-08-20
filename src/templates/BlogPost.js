import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../utils/normalize.css';
import { graphql } from 'gatsby';
import Helmet from '../utils/Helmet';
import MobileNav from '../components/MobileNav';
import BlogPageIntro from '../components/BlogPageIntro';
import BlogSubheader from '../components/BlogSubheader';
import Signature from '../components/Signature';
import Footer from '../components/Footer';

const BlogPost = () => {
  const [mobileNavIsOpen, toggleMobileNav] = useState(false);

  const openMobileNav = () => {
    toggleMobileNav((mobileNavIsOpen = true));
  };

  const closeMobileNav = () => {
    toggleMobileNav((mobileNavIsOpen = false));
  };

  return (
    <Container>
      <Helmet title="blog title from query" />
      <MobileNav action={closeMobileNav} open={mobileNavIsOpen} />
      <BlogPageIntro
        action={openMobileNav}
        headline={data.title}
        bgImg={data.heroImage.file.url}
      />
      <ContentWrapper>
        <BlogSubheader data={data} />
        <BlogParagraph
          dangerouslySetInnerHTML={{
            __html: data.bodyContent.childMarkdownRemark.html,
          }}
        />
        <Signature />
      </ContentWrapper>

      <Footer backgroundIsBlack={false} />
    </Container>
  );
};

BlogPost.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BlogPost;

// export const pageQuery = graphql`
//   query blogPostQuery($slug: String!) {
//     contentfulBlogPost(slug: { eq: $slug }) {
//       id
//       slug
//       tags
//       title
//       subtitle
//       published(formatString: "MMMM Do, YYYY")
//       heroImage {
//         id
//         title
//         description
//         file {
//           url
//         }
//       }
//       bodyContent {
//         childMarkdownRemark {
//           html
//         }
//       }
//       author {
//         id
//         name
//         email
//         birthday
//         twitterURL
//         instagramURL
//         githubURL
//         avatar {
//           file {
//             url
//           }
//         }
//         biography {
//           biography
//         }
//       }
//     }
//   }
// `;
