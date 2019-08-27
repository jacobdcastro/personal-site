import React, { useContext } from 'react';
import Layout from '../templates/layout';
import { Wrapper } from '../styles/index/IndexStyles';
import { ThemeContext } from 'styled-components';

const Index = () => {
  const themeContext = useContext(ThemeContext);
  console.log(themeContext);
  return (
    <Layout>
      <Wrapper>
        <h1>Hello there</h1>
      </Wrapper>
    </Layout>
  );
};

export default Index;
