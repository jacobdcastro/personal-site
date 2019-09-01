import React from 'react';
import LogoSVG from '../../images/svg/SignatureLogoSVG'; // inline svg component
import { HeaderWrapper } from '../../styles/HeaderStyles';
import '../../styles/hamburgers.css';
import { Link } from 'gatsby';

const Header = props => {
  const { mobileNavIsOpen, action } = props;

  return (
    <HeaderWrapper>
      <div className="navContainer">
        <div id="logo">
          <Link to="/">
            <LogoSVG />
            <h2>JACOB D. CASTRO</h2>
          </Link>
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
