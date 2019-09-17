import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

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
  console.log(data.file.childMarkdownRemark);

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
      <meta
        name="google-site-verification"
        content="XxzBu338e5a9ZGebqx3Z0cDepD0hAZLEmUkyNEmBf9Q"
      />
      <meta
        property="og:title"
        content={`${seo.title && seo.title + ' | '}Jacob D. Castro`}
      />
      <meta property="og:description" content={seo.description} />
      <meta
        property="og:type"
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
    </Helmet>
  );
};

export default Head;
