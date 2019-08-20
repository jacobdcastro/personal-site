import React, { useState } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import Head from '../utils/Helmet.js';
import MobileNav from '../components/MobileNav';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container } from '../styles/IndexStyles';

const Index = ({ data }) => {
  const [mobileNavIsOpen, toggleMobileNav] = useState(false);

  const openMobileNav = () => {
    toggleMobileNav((mobileNavIsOpen = true));
  };

  const closeMobileNav = () => {
    toggleMobileNav((mobeilNavIsOpen = false));
  };

  return (
    <Container>
      <Head title="" />
      <MobileNav action={closeMobileNav} open={mobileNavIsOpen} />

      <div className="mainContent">
        {/* normal header menu */}
        <Navbar action={openMobileNav} />

        <div className="textContainer">
          <h1>
            I'm Jacob Daniel Castro <br /> and I'm a <br /> frontend web
            developer.
          </h1>
          <Link to="/contact/">
            <h4>
              Let's work
              <br />
              Together
            </h4>
          </Link>
        </div>

        <Footer backgroundIsBlack={true} />
      </div>
    </Container>
  );
};

export default Index;
