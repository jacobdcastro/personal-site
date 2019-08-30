import React from 'react';
import { Wrapper } from '../styles/LayoutStyles';
import Header from '../components/layout/Header';
import ThemeToggleBtn from '../components/layout/ThemeToggleBtn';

const Layout = props => {
  return (
    <Wrapper>
      <Header />
      <main>{props.children}</main>
      <ThemeToggleBtn />
    </Wrapper>
  );
};

export default Layout;
