import React from "react";
import { Helmet } from "react-helmet";

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
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=UA-130258530-1"></script>
				<script>
				{window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments); }
					gtag('js', new Date());
					
					gtag('config', 'UA-130258530-1');}
				</script> */}
      </Helmet>
    );
  }
}

export default Head;
