import React from 'react';
import LogoSVG from './SignatureLogoSVG'; // inline svg component
import { HeaderWrapper } from '../../styles/HeaderStyles';
import '../../styles/hamburgers.css';

const Header = props => {
  const { mobileNavIsOpen, action } = props;

  return (
    <HeaderWrapper>
      <div className="navContainer">
        <div id="logo">
          <LogoSVG />
          <h1>JACOB D. CASTRO</h1>
        </div>

        <button
          className={`hamburger hamburger--arrowalt ${mobileNavIsOpen &&
            'is-active'}`}
          onClick={action}
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
