import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import MobileNavWrapper from '../../styles/layout/MobileNavStyles';
import Hamburger from './Hamburger';

const MobileNav = ({ mobileNavIsOpen, action }) => {
  return (
    <MobileNavWrapper isOpen={mobileNavIsOpen}>
      <Hamburger mobileNavIsOpen={mobileNavIsOpen} action={action} />

      <div className="mobileNav">
        <div className="darkLayer" onClick={action} />
        <div id="mobileMenu">
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
      </div>
    </MobileNavWrapper>
  );
};

MobileNav.propTypes = {
  mobileNavIsOpen: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
};

export default MobileNav;
