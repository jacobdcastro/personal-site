import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import Layout from '../src/templates/layout';
import ThemeToggleBtn from '../src/components/layout/ThemeToggleBtn';

test('theme toggle button works', () => {
  const layout = render(<Layout />);

  console.log(layout);

  debug();

  const button = getByTestId('theme-toggle-btn');

  fireEvent.click(button);

  console.log(button);
});
