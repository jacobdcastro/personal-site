import React from 'react';
import styled from 'styled-components';

const HamburgerButton = styled.button`
  outline: none;
  position: absolute;
  right: 15px;
  z-index: 10;

  .hamburger {
    outline: none;
    display: inline-block;
    cursor: pointer;
    transition-property: opacity, filter;
    transition-duration: 0.2s;
    transition-timing-function: linear;
    font: inherit;
    color: inherit;
    text-transform: none;
    background-color: transparent;
    border: 0;
    margin: 0;
    margin-top: 5px;
    padding: 0;
    overflow: visible;
  }

  .hamburger-box {
    width: 40px;
    height: 24px;
    display: inline-block;
    position: relative;
    outline: none;
  }

  .hamburger-inner {
    display: block;
    top: 50%;
    margin-top: -2px;
  }

  .hamburger-inner,
  .hamburger-inner::before,
  .hamburger-inner::after {
    width: 40px;
    height: 4px;
    border-radius: 4px;
    position: absolute;
    transition: background-color ${props => props.theme.transition},
      transform 0.15s ease 0.15s;
    background-color: ${props => props.theme.textColor};
  }
  .hamburger-inner::before,
  .hamburger-inner::after {
    content: '';
    display: block;
    transition: ${props => props.theme.transition};
  }
  .hamburger-inner::before {
    top: -10px;
  }
  .hamburger-inner::after {
    bottom: -10px;
  }

  /*
   * Arrow Alt
   */
  .hamburger--arrowalt .hamburger-inner::before {
    transition: top 0.1s 0.1s ease,
      transform 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .hamburger--arrowalt .hamburger-inner::after {
    transition: bottom 0.1s 0.1s ease,
      transform 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .hamburger--arrowalt.is-active .hamburger-inner::before {
    top: 0;
    transform: translate3d(-8px, -10px, 0) rotate(-45deg) scale(0.7, 1);
    transition: top 0.1s ease,
      transform 0.1s 0.1s cubic-bezier(0.895, 0.03, 0.685, 0.22);
  }

  .hamburger--arrowalt.is-active .hamburger-inner::after {
    bottom: 0;
    transform: translate3d(-8px, 10px, 0) rotate(45deg) scale(0.7, 1);
    transition: bottom 0.1s ease,
      transform 0.1s 0.1s cubic-bezier(0.895, 0.03, 0.685, 0.22);
  }
`;

const Hamburger = ({ mobileNavIsOpen, action }) => {
  return (
    <HamburgerButton
      className={`hamburger hamburger--arrowalt ${mobileNavIsOpen &&
        'is-active'}`}
      onClick={action}
      type="button"
      aria-label="open mobile navigation menu"
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </HamburgerButton>
  );
};

export default Hamburger;
