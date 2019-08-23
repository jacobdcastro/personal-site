import React from 'react';
import Layout from '../templates/layout';
import { Wrapper } from '../styles/IndexStyles';

const Index = () => {
  return (
    <ThemeProvider>
      <Layout>
        <h1>Hello there</h1>
      </Layout>
    </ThemeProvider>
  );
};

export default Index;
