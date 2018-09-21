import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="social-icons">
          <a href="https://twitter.com/jacobdcastro" target="_blank"><img className="socialIcon" src={require('../images/icons/twitter.svg')} alt="Twitter" /></a>
          <a href="https://www.instagram.com/jacobdcastro/" target="_blank"><img className="socialIcon" src={require('../images/icons/instagram-logo.svg')} alt="Intstagram" /></a>
          <a href="https://www.facebook.com/jacobdcastro/" target="_blank"><img className="socialIcon" src={require('../images/icons/facebook-letter-logo.svg')} alt="Facebook" /></a>
          <a href="https://github.com/jacobdcastro" target="_blank"><img className="socialIcon" src={require('../images/icons/github-logo.svg')} alt="Github" /></a>
          <a href="https://www.linkedin.com/in/jacob-c-5b6257a4/" target="_blank"><img className="socialIcon" src={require('../images/icons/linkedin-logo.svg')} alt="Linkedin" /></a>
          {/* <a href="https://www.medium.com/jacobdcastro" target="_blank"><img className="socialIcon" src="images/icons/medium-logo.svg" alt="Medium" /></a> */}
        </div> {/* /.social-icons */}
        <p className="copyright"> &copy; Jacob D. Castro - 2018</p>
      </footer>
    );
  }
}

export default Footer;
