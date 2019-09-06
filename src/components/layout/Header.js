import React, { useEffect, useState } from 'react';
import LogoSVG from '../../images/svg/SignatureLogoSVG'; // inline svg component
import { HeaderWrapper } from '../../styles/layout/HeaderStyles';
import '../../styles/layout/hamburgers.css';
import { Link } from 'gatsby';
import Hamburger from './Hamburger';

const Header = props => {
  const { mobileNavIsOpen, action } = props;
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   window.addEventListener('scroll', e => {
  // });

  return (
    <HeaderWrapper>
      <div className="navContainer">
        <div id="logo">
          <Link to="/">
            <LogoSVG />
            <h2>JACOB D. CASTRO</h2>
          </Link>
        </div>

        <Hamburger mobileNavIsOpen={mobileNavIsOpen} action={action} />
      </div>
    </HeaderWrapper>
  );
};

export default Header;
