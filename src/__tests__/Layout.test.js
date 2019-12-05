import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ThemeContextWrapper, { ThemeContext } from '../utils/ThemeContext';
import Layout from '../templates/Layout';
import { ThemeProvider } from 'styled-components';
import ThemeToggleBtn from '../components/layout/ThemeToggleBtn';
import 'jest-styled-components';
import { LayoutWrapper } from '../styles/layout/LayoutStyles';
import { darkTheme, lightTheme } from '../styles/layout/__themes';

afterEach(cleanup);

// TODO finish testing layout and theme context for background color

let themeState = {
  currentTheme: lightTheme,
  transition: '0.5s',
  toggleTheme: jest.fn(),
};

describe('Layout', () => {
  test('theme context provider works', () => {
    const themeContextTree = render(
      <ThemeContext.Provider value={themeState}>
        {/* <Layout /> */}
      </ThemeContext.Provider>
    );
  });

  // test('background color matches theme context', () => {
  //   const { findByTestId } = render(
  //     <ThemeContextWrapper>
  //       <ThemeProvider theme={themeState.currentTheme}>
  //         <LayoutWrapper data-testid="styled-layout-wrapper">
  //           <ThemeToggleBtn />
  //         </LayoutWrapper>
  //       </ThemeProvider>
  //     </ThemeContextWrapper>
  //   );

  //   const layoutWrapper = findByTestId('styled-layout-wrapper');
  //   // expect(layoutWrapper).toHaveStyleRule('background-color', '#f9f9f9');

  //   fireEvent.click(findByTestId('theme-toggle-btn'));
  // });
});
