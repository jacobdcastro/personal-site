import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
   margin: 75px auto;
   padding: 0;
   background-color: #e1e1e1;
   max-width: 500px;
   h1, p {
      font-family: 'Montserrat', 'Helvetica', sans-serif;
   }
`;

class ErrorPage extends React.Component {
   render() {
      return (
         <Container>
            <h1>Big oops. Much sorry.</h1>
            <p>You've hit a route that doesn't exist.</p>           
         </Container>
      );
   }
}

export default ErrorPage;