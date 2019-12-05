import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import MobileNav from '../components/layout/MobileNav';

afterEach(cleanup);

// mimic 'toggleMobileNav' in <Layout>
const mobileNavAction = jest.fn();

describe('Mobile Navigation', () => {
  it('renders correctly', () => {
    const mobileNavTree = render(<MobileNav />);
    expect(mobileNavTree).toMatchSnapshot();
  });

  it('opens/closes correctly', () => {
    const { debug, getByTestId } = render(
      <MobileNav mobileNavIsOpen={false} action={mobileNavAction} />
    );

    // open mobile nav
    fireEvent.click(getByTestId('hamburger'));

    // close mobile nav
    fireEvent.click(getByTestId('hamburger'));

    expect(mobileNavAction).toHaveBeenCalledTimes(2);

    debug();
  });
});
