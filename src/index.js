import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './home';
import About from './about';
import Contact from './contact';

const Body = styled.div`
  height: 100%;
`;

class Index extends React.Component {
  render() {
    return (
      <Router>
        <Body id="body">
          <Route exact path="" component={Home}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/contact" component={Contact}/>
        </Body>
      </Router>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
