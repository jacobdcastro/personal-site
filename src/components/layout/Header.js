import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import LogoSVG from '../../images/svg/SignatureLogoSVG'; // inline svg component
import { HeaderWrapper } from '../../styles/layout/HeaderStyles';
import '../../styles/layout/hamburgers.css';

const Header = () => {
  // set boolean state and listen for scroll events
  // isScrolled value sent to <HeaderWrapper> styled component
  let [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 30 ||
        document.documentElement.scrollTop > 30
      ) {
        setIsScrolled((isScrolled = true));
      } else {
        setIsScrolled((isScrolled = false));
      }
    });
  }, []);

  return (
    <HeaderWrapper isScrolled={isScrolled}>
      <div className="navContainer">
        <div id="logo">
          <Link to="/" aria-label="to home page">
            <LogoSVG />
            <h2>JACOB D. CASTRO</h2>
          </Link>
        </div>

        <nav>
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
            <li>
              <Link activeClassName="activePage" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
