import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
   margin: 0;
   padding: 0;
   background-color: #e1e1e1;
`;

class ErrorPage extends React.Component {
   render() {
      return (
         <Container>
            <h1>Oops, sorry!!!!!!!!!!!!!!</h1>
         </Container>
      );
   }
}

export default ErrorPage;