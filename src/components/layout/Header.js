import React, { useContext } from 'react';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';
import { Wrapper } from '../../styles/HeaderStyles';
import '../../styles/hamburgers.css';
import { ThemeContext } from '../../utils/ThemeContext';
import LogoSVG from './SignatureLogoSVG';

// TODO : add inline SVG's for logo and
// TODO : change background color w/ transition

const Header = () => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <Wrapper>
      <div id="logo">
        <LogoSVG />
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
