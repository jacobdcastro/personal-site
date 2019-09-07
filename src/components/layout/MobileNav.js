import React from 'react';
import { Link } from 'gatsby';
import MobileNavWrapper from '../../styles/layout/MobileNavStyles';

const MobileNav = ({ mobileNavIsOpen, action }) => {
  return (
    <MobileNavWrapper isOpen={mobileNavIsOpen}>
      <div className="darkLayer" onClick={action} />
      <div id="mobileMenu">
        <nav>
          <ul>
            <li>
              <Link activeClassName="activePage" to="/about">
                About Me
              </Link>
            </li>
            {/* <li>
              <Link activeClassName="activePage" to="/blog">
                Blog
              </Link>
            </li> */}
            <li>
              <Link activeClassName="activePage" to="/tutorials">
                Tutorials
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </MobileNavWrapper>
  );
};

export default MobileNav;
