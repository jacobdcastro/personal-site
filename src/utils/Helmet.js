import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

// Mailchimp script for website connection
const mcEmbed = `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/acfe9e33f6e477b7d4271061c/33f0b474bec5c1094df95b9ee.js");`;

const Head = ({ seo }) => {
  const data = useStaticQuery(graphql`
    query HELMET_QUERY {
      file(relativePath: { eq: "me.md" }) {
        childMarkdownRemark {
          frontmatter {
            miniBio
            email
            phone
            url
            handle
            username
            twitterURL
            instagramURL
            facebookURL
            snapchat
            linkedinURL
          }
        }
      }
    }
  `);

  const {
    miniBio,
    email,
    phone,
    url,
    handle,
    username,
    twitterURL,
    instagramURL,
    facebookURL,
    snapchat,
    linkedinURL,
  } = data.file.childMarkdownRemark.frontmatter;

  const breadcrumbs = seo.breadcrumbs.map((item, index) => {
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${url}${item.path}`,
    };
  });

  return (
    <Helmet>
      <title>{seo.title && `${seo.title} | `}Jacob D. Castro</title>
      <meta name="Description" content={seo.description} />
      <meta name="description" content={seo.description} />
      <meta
        name="google-site-verification"
        content="XxzBu338e5a9ZGebqx3Z0cDepD0hAZLEmUkyNEmBf9Q"
      />

      {/* Open Graph meta tags */}
      <meta
        property="og:title"
        content={`${seo.title && seo.title + ' | '}Jacob D. Castro`}
      />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta
        property="og:image"
        content={`https://jacobdcastro.com${seo.imgUrl}`}
      />
      <meta
        property="og:type"
        content={
          seo.page === 'blogPost' || seo.page === 'tutorial'
            ? 'article'
            : 'website'
        }
      />

      {/* Twitter meta tags */}
      <meta
        property="twitter:title"
        content={`${seo.title && seo.title + ' | '}Jacob D. Castro`}
      />
      <meta property="twitter:description" content={seo.description} />
      <meta
        property="twitter:type"
        content={
          seo.page === 'blogPost' || seo.page === 'tutorial'
            ? 'article'
            : 'website'
        }
      />

      {/* Person Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          email: `${email}`,
          image: '',
          jobTitle: 'Web Developer',
          name: 'Jacob Daniel Castro',
          birthPlace: 'Santa Barbara, CA',
          birthDate: '1997-05-27',
          gender: 'male',
          url: `${url}`,
          sameAs: [
            `${twitterURL}`,
            `${instagramURL}`,
            `${facebookURL}`,
            `${linkedinURL}`,
          ],
        })}
      </script>

      {/* Breadcrumbs Schema.org markup.
          only appears on non-index pages */}
      {seo.page !== 'index' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs,
          })}
        </script>
      )}

      <script id="mcjs">{mcEmbed}</script>
    </Helmet>
  );
};

export default Head;
