import React from 'react';
import { Wrapper } from '../styles/LayoutStyles';

const Layout = props => {
  return <Wrapper>{props.children}</Wrapper>;
};

export default Layout;
