import React from 'react';
import ReactDOM from 'react-dom';
import MobileNav from './components/MobileNav';
import registerServiceWorker from './registerServiceWorker';

class Index extends React.Component {
  render() {
    return (
      <div className="container">
        <MobileNav />
        <div className="black-layer">
          <div id="main" className="main-content">

            {/* normal header menu */}
            <header>
              <div className="header-container">
                <a href="index.html"><img className="head-logo" src={require('./images/Jacob-D-Castro.png')} /></a>
                <div className="head-menu">
                  <a className="menuItem" href="index.html">Home</a>
                  {/* <a className="menuItem" href="#">Portfolio</a> */}
                  <a className="menuItem" href="pages/about.html">About</a>
                  {/* <a className="menuItem" href="#">Blog</a> */}
                  <a className="menuItem" href="pages/contact.html">Contact</a>
                  <img id="menuButton" className="menuButton" src="images/icons/menu-options.svg" />
                </div>
              </div>
            </header>

            <div className="texts">
              <h1>I Design &amp; develop<br />
                  Modern Websites.<br />
                  For You.</h1>
              <a href="pages/contact.html"><h4>Let's work<br />
                  Together</h4></a>
            </div> {/* /.texts */}

            <footer>
              <div className="social-icons">
                <a href="https://twitter.com/jacobdcastro" target="_blank"><img className="socialIcon" src="images/icons/twitter.svg" alt="Twitter" /></a>
                <a href="https://www.instagram.com/jacobdcastro/" target="_blank"><img className="socialIcon" src="images/icons/instagram-logo.svg" alt="Intstagram" /></a>
                <a href="https://www.facebook.com/jacobdcastro/" target="_blank"><img className="socialIcon" src="images/icons/facebook-letter-logo.svg" alt="Facebook" /></a>
                <a href="https://github.com/jacobdcastro" target="_blank"><img className="socialIcon" src="images/icons/github-logo.svg" alt="Github" /></a>
                <a href="https://www.linkedin.com/in/jacob-c-5b6257a4/" target="_blank"><img className="socialIcon" src="images/icons/linkedin-logo.svg" alt="Linkedin" /></a>
                {/* <a href="https://www.medium.com/jacobdcastro" target="_blank"><img className="socialIcon" src="images/icons/medium-logo.svg" alt="Medium" /></a> */}
              </div> {/* /.social-icons */}
              <p className="copyright"> &copy; Jacob D. Castro - 2018</p>
            </footer>

          </div> {/* /.main-content */}
        </div> {/* /.black-layer */}
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('body'));
registerServiceWorker();
