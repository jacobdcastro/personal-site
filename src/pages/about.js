import React from 'react';
import { Link } from 'gatsby';
import Layout from '../templates/layout';
import { Container } from '../styles/AboutStyles';
import './normalize.css';

const About = () => {
  return (
    <Layout
      pageTitle="About Me - "
      headline="Who am I?"
      className="aboutPage"
      backgroundIsBlack={false}
    >
      <Container>
        <div className="aboutSection"></div>
      </Container>
    </Layout>
  );
};

export default About;
