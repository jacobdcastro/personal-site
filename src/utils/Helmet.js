import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Head = props => {
  // const data = useStaticQuery(graphql`
  //   query HELMET_QUERY {

  //   }`);

  return (
    <Helmet>
      <title>{props.title}Jacob D. Castro</title>
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
      <meta property="og:title" content="Jacob D. Castro" />
      <meta property="og:description" content="Jacob D. Castro" />
      <meta property="og:title" content="Jacob D. Castro" />
    </Helmet>
  );
};

export default Head;
