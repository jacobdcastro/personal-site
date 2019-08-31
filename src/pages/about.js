import React from 'react';
import { Link } from 'gatsby';
import Layout from '../templates/layout';
import { IndexPagWrapper } from '../styles/index/IndexStyles';

const About = () => {
  return (
    <Layout>
      <IndexPagWrapper>
        <h1>About Me!</h1>
        <Link to="/">To Home Page</Link>
      </IndexPagWrapper>
    </Layout>
  );
};

export default About;
