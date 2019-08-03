import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Head from '../utils/Helmet.js';
import MobileNav from '../components/MobileNav';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container } from '../styles/IndexStyles';
import './normalize.css';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.openMobileNav = this.openMobileNav.bind(this);
    this.closeMobileNav = this.closeMobileNav.bind(this);

    this.state = {
      mobileNavIsOpen: false,
    };
  }

  openMobileNav() {
    this.setState({
      mobileNavIsOpen: true,
    });
  }

  closeMobileNav() {
    this.setState({
      mobileNavIsOpen: false,
    });
  }

  render() {
    return (
      <Container>
        <Head title="" />
        <MobileNav
          action={this.closeMobileNav}
          open={this.state.mobileNavIsOpen}
        />

        <Img
          id="bgImg"
          fluid={this.props.data.file.childImageSharp.fluid}
          style={{
            height: '100vh',
          }}
        />

        <div className="blackLayer">
          <div className="mainContent">
            {/* normal header menu */}
            <Navbar action={this.openMobileNav} />

            <div className="textContainer">
              <h1>
                I Design &amp; develop
                <br />
                Modern Websites.
                <br />
                For You.
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
        </div>
      </Container>
    );
  }
}

export default Index;

export const INDEX_QUERY = graphql`
  query INDEX_QUERY {
    file(relativePath: { eq: "chicago-river.jpg" }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
