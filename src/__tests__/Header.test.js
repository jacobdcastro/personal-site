import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Header from '../components/layout/Header';

afterEach(cleanup);

describe('Header', () => {
  it('renders correctly', () => {
    const tree = render(<Header />);
    expect(tree).toMatchSnapshot();
    tree.debug();
  });
});
