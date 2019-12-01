import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import FooterWrapper from '../../styles/layout/FooterStyles';
// import EmailSubForm from './EmailSubForm';

import gatsbyImg from '../../images/tech-icons/Gatsby_Monogram.svg';
import javascriptImg from '../../images/tech-icons/javascript.svg';
import mdImg from '../../images/tech-icons/markdown.svg';
import netlifyImg from '../../images/tech-icons/netlify.svg';
import reactImg from '../../images/tech-icons/react.svg';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      me: file(relativePath: { eq: "me.md" }) {
        childMarkdownRemark {
          frontmatter {
            url
            email
            handle
            username
          }
        }
      }
      styledImg: file(
        relativePath: { eq: "tech-icons/styled-components.png" }
      ) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `);

  const { email, handle, url } = data.me.childMarkdownRemark.frontmatter;
  const images = [
    {
      img: javascriptImg,
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      title: 'Javascript',
      alt: 'unofficial javascript logo',
    },
    {
      img: reactImg,
      url: 'https://reactjs.org/',
      title: 'React',
      alt: 'react atom logo',
    },
    {
      img: gatsbyImg,
      url: 'https://gatsbyjs.org/',
      title: 'GatsbyJS',
      alt: 'gatsbyjs logo',
    },
    {
      img: data.styledImg.childImageSharp.fluid,
      url: 'https://www.styled-components.com/',
      title: 'styled-components',
      alt: 'nail painting emoji as styled components logo',
    },
    {
      img: mdImg,
      url: 'https://www.markdownguide.org/',
      title: 'Markdown',
      alt: 'markdown logo',
    },
    {
      img: netlifyImg,
      url: 'https://netlify.com/',
      title: 'Netlify',
      alt: 'netlify logo',
    },
  ];

  return (
    <FooterWrapper>
      <span>
        See a typo or want to contribute?{' '}
        <a href="mailto:jdcastro.business@gmail.com">Email me</a> or submit a PR
        or issue on{' '}
        <a href="https://github.com/jacobdcastro/personal-site/" rel="noopener">
          the Github repo
        </a>
        !
      </span>

      {/* <EmailSubForm /> */}

      <span>
        Let's connect! <br />
        Email me: <a href="mailto:jdcastro.business@gmail.com">{email}</a>
        <br />
        or{' '}
        <span>
          Follow me everywhere: <strong>{handle}</strong>
        </span>
      </span>
      <div className="stackIcons">
        <h4>This website built with:</h4>
        <ul>
          {images.map((m, i) => {
            const { img, url, title, alt } = m;
            return (
              <li key={i}>
                <a href={url} target="_blank" rel="noopener" aria-label={title}>
                  {title === 'styled-components' ? (
                    <Img
                      fluid={img}
                      title={title}
                      alt={alt}
                      style={{ height: '35px', width: '35px' }}
                    />
                  ) : (
                    <img src={img} title={title} alt={alt} />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <a
        href="https://github.com/jacobdcastro/personal-site/releases"
        rel="noopener"
      >
        v2.3.1
      </a>
      <a href={`${url}/sitemap.xml`}>Sitemap</a>
      <span>&copy;2019 - JDCastro Digital</span>
    </FooterWrapper>
  );
};

export default Footer;
