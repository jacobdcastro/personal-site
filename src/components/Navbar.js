import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (
      <header>
        <div className="header-container">
          <Link to="."><img className="head-logo" src={require('../images/Jacob-D-Castro.png')} /></Link>
          <div className="head-menu">
            <Link className="menuItem" to=".">Home</Link>
            {/* <a className="menuItem" href="#">Portfolio</a> */}
            <Link className="menuItem" to="./about">About</Link>
            {/* <a className="menuItem" href="#">Blog</a> */}
            <Link className="menuItem" to="./contact">Contact</Link>
            <img id="menuButton" className="menuButton" src={require('../images/icons/menu-options.svg')} />
          </div>
        </div>
      </header>
    );
  }
}

export default Navbar;
