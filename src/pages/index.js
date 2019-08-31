import React from 'react';
import Layout from '../templates/layout';
import { Wrapper } from '../styles/index/IndexStyles';
import { ThemeContext } from '../utils/ThemeContext';

const Index = () => {
  return (
    <Layout>
      <Wrapper>
        <h1>Hello there</h1>
      </Wrapper>
    </Layout>
  );
};

export default Index;
