import React from 'react';

class MobileNav extends React.Component {
  render() {
    return (
      <div id="mySideNav" className="side-nav">
        <img id="closeButton" src={require('../images/icons/delete-button.svg')} href="javascript:void(0)" className="close-button" />
        <a className="side-menu-item" href="./index.html"><img className="black-logo" src={require('../images/JacobDCastro-black.png')} /></a>
        <a className="side-menu-item" href="./index.html">Home</a>
        <a className="side-menu-item" href="./pages/about.html">About</a>
        {/* <a className="side-menu-item" href="#">Portfolio</a> */}
        {/* <a className="side-menu-item" href="#">Blog</a> */}
        <a className="side-menu-item" href="./pages/contact.html">Contact</a>
      </div>
    );
  }
}

export default MobileNav;
