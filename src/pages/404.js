import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

const Container = styled.div`
  margin: 75px auto;
  padding: 0;
  background-color: #e1e1e1;
  max-width: 500px;
  h1,
  p {
    font-family: "Montserrat", "Helvetica", sans-serif;
  }

  button {
    padding: 8px;
    margin: 12px;
    background-color: #353535;
  }
`;

class ErrorPage extends React.Component {
  render() {
    return (
      <Container>
        <h1>Big oops. Much sorry.</h1>
        <p>You've hit a route that doesn't exist.</p>
        <p>Go back to the home page here!</p>
        <Link to="/">
          <button>To Home Page</button>
        </Link>
      </Container>
    );
  }
}

export default ErrorPage;
