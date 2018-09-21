import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Home from './home';
import About from './about';
import Contact from './contact';

class Index extends React.Component {
  render() {
    return (
      <Router>
        <div id="body">
          <Route exact path="" component={Home}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/contact" component={Contact}/>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
