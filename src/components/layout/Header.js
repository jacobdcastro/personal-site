import React from 'react';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';
import { Wrapper } from '../../styles/HeaderStyles';
import '../../styles/hamburgers.css';

const Header = () => {
  const data = useStaticQuery(graphql`
    query HEADER_LOGOS_QUERY {
      signatureBlack: imageSharp(
        id: { eq: "3bafda5b-ec40-5605-82b1-9516726148ed" }
      ) {
        id
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
      signatureWhite: imageSharp(
        id: { eq: "8407e358-b5d4-52b0-a6e2-e405c3e025bf" }
      ) {
        id
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  `);

  return (
    <Wrapper>
      <div id="logo">
        <Img
          fluid={data.signatureBlack.fluid}
          title="Signature Logo"
          alt="Jacob's Hand-drawn signature logo"
        />
      </div>
      <button className="hamburger hamburger--arrowalt" type="button">
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    </Wrapper>
  );
};

export default Header;
