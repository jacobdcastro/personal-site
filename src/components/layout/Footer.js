import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import FooterWrapper from '../../styles/layout/FooterStyles';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "me.md" }) {
        childMarkdownRemark {
          frontmatter {
            url
            email
            handle
            username
          }
        }
      }
    }
  `);
  const { email, handle, url } = data.file.childMarkdownRemark.frontmatter;

  return (
    <FooterWrapper>
      <a href={`${url}/sitemap.xml`}>Sitemap</a>
      <span>
        <a href="mailto:jdcastro.business@gmail.com">{email}</a>
      </span>
      <span>{`Follow me everywhere: ${handle}`}</span>
      <span>&copy;2019 - JDCastro Digital</span>
    </FooterWrapper>
  );
};

export default Footer;
