import React from 'react';
import { Link } from 'gatsby';
import Layout from '../templates/layout';
import { AboutPageWrapper } from '../styles/about/AboutStyles';

const About = () => {
  return (
    <Layout>
      <AboutPageWrapper>
        <h1>About Me!</h1>
        <Link to="/">To Home Page</Link>
      </AboutPageWrapper>
    </Layout>
  );
};

export default About;
