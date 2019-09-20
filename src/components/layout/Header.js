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
          <Link to="/" aria-label="to home page">
            <LogoSVG />
            <h2>JACOB D. CASTRO</h2>
          </Link>
        </div>

        <div className="headerMenuSection">
          {/* <Hamburger mobileNavIsOpen={mobileNavIsOpen} action={action} /> */}
          <nav style={{ display: 'none' }}>
            <ul>
              <li>
                <Link activeClassName="activePage" to="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link activeClassName="activePage" to="/tutorials">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link activeClassName="activePage" to="/about">
                  About Me
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
