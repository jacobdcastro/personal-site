import React from 'react';
import ReactDOM from 'react-dom';
import MobileNav from './components/MobileNav';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Contact extends React.Component {
  render() {
    return (
      <div className="container">
        <MobileNav />
        <div className="black-layer">
          <div id="main" className="main-content">

            {/* normal header menu */}
            <Navbar />

            <div className="texts">
              <h1>CONTACT PAGE</h1>
              <Link to="/contact"><h4>Let's work<br />
                  Together</h4></Link>
            </div> {/* /.texts */}

            <Footer />
          </div> {/* /.main-content */}
        </div> {/* /.black-layer */}
      </div>
    );
  }
}

export default Contact;
