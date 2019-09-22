import React from 'react';
import styled from 'styled-components';

const HamburgerButton = styled.button`
  outline: none;
  position: fixed;
  top: 19px;
  right: 15px;
  z-index: 100;

  &::selection {
    outline: none;
  }

  .hamburger {
    outline: none;
    display: inline-block;
    cursor: pointer;

    transition: opacity 0.2s linear, filter 0.2s linear;
    -webkit-transition: opacity 0.2s linear, filter 0.2s linear;
    -moz-transition: opacity 0.2s linear, filter 0.2s linear;
    -o-transition: opacity 0.2s linear, filter 0.2s linear;
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
    outline: none;
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
    -webkit-transition: opacbackground-color ${props => props.theme.transition},
      transform 0.15s ease 0.15s;
    -moz-transition: opacbackground-color ${props => props.theme.transition},
      transform 0.15s ease 0.15s;
    -o-transition: opacbackground-color ${props => props.theme.transition},
      transform 0.15s ease 0.15s;
    background-color: ${props => props.theme.textColor};
  }
  .hamburger-inner::before,
  .hamburger-inner::after {
    content: '';
    display: block;
    transition: background-color ${props => props.theme.transition};
    -webkit-transition: background-color ${props => props.theme.transition};
    -moz-transition: background-color ${props => props.theme.transition};
    -o-transition: background-color ${props => props.theme.transition};
  }
  .hamburger-inner::before {
    top: -10px;
  }
  .hamburger-inner::after {
    bottom: -10px;
  }

  /*
     * Spin Reverse

  -webkit-transition:
  -moz-transition:
  -o-transition:

     */
  .hamburger--spin-r .hamburger-inner {
    transition-duration: 0.22s;
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  .hamburger--spin-r .hamburger-inner::before {
    transition: top 0.1s 0.25s ease-in, opacity 0.1s ease-in;
    -webkit-transition: top 0.1s 0.25s ease-in, opacity 0.1s ease-in;
    -moz-transition: top 0.1s 0.25s ease-in, opacity 0.1s ease-in;
    -o-transition: top 0.1s 0.25s ease-in, opacity 0.1s ease-in;
  }
  .hamburger--spin-r .hamburger-inner::after {
    transition: bottom 0.1s 0.25s ease-in,
      transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    -webkit-transition: bottom 0.1s 0.25s ease-in,
      transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    -moz-transition: bottom 0.1s 0.25s ease-in,
      transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    -o-transition: bottom 0.1s 0.25s ease-in,
      transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  .hamburger--spin-r.is-active .hamburger-inner {
    transform: rotate(-225deg);
    transition-delay: 0.12s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  .hamburger--spin-r.is-active .hamburger-inner::before {
    top: 0;
    opacity: 0;
    transition: top 0.1s ease-out, opacity 0.1s 0.12s ease-out;
    -webkit-transition: top 0.1s ease-out, opacity 0.1s 0.12s ease-out;
    -moz-transition: top 0.1s ease-out, opacity 0.1s 0.12s ease-out;
    -o-transition: top 0.1s ease-out, opacity 0.1s 0.12s ease-out;
  }
  .hamburger--spin-r.is-active .hamburger-inner::after {
    bottom: 0;
    transform: rotate(90deg);
    transition: bottom 0.1s ease-out,
      transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transition: bottom 0.1s ease-out,
      transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
    -moz-transition: bottom 0.1s ease-out,
      transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
    -o-transition: bottom 0.1s ease-out,
      transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;

const Hamburger = ({ mobileNavIsOpen, action }) => {
  return (
    <HamburgerButton
      className={`hamburger hamburger--spin-r ${mobileNavIsOpen &&
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
