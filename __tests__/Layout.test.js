import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import Layout from '../src/templates/layout';
import ThemeToggleBtn from '../src/components/layout/ThemeToggleBtn';

test('theme toggle button works', () => {
  const { debug } = render(<Layout />);

  debug();

  const button = getByTestId('theme-toggle-btn');

  console.log(button);
});
