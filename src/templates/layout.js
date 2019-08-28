import React from 'react';
import { Wrapper } from '../styles/LayoutStyles';
import Header from '../components/layout/Header';

const Layout = props => {
  return (
    <Wrapper>
      <Header />
      <main>{props.children}</main>
    </Wrapper>
  );
};

export default Layout;
