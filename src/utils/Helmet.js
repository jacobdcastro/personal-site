import React from 'react';
import { Helmet } from 'react-helmet';

class Head extends React.Component {
  render() {
    return (
      <Helmet>
        <title>{this.props.title}Jacob D. Castro</title>
        <link
          rel="stylesheet"
          src="//normalize-css.googlecode.com/svn/trunk/normalize.css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700"
          rel="stylesheet"
        />
        <meta
          name="google-site-verification"
          content="XxzBu338e5a9ZGebqx3Z0cDepD0hAZLEmUkyNEmBf9Q"
        />
      </Helmet>
    );
  }
}

export default Head;
