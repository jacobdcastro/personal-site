import styled from 'styled-components';

const Container = styled.div`
  padding: 15px;
  width: 88%;
  max-width: 1125px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .aboutSection {
    max-width: 1025px;

    h2 {
      font-family: 'Montserrat', 'Helvetica', sans-serif;
      text-align: center;
      letter-spacing: 1px;
      color: #353535;
      @media (min-width: 820px) {
        font-size: 2em;
      }
    }

    p {
      font-family: 'Montserrat', 'Helvetica', sans-serif;
      margin: 14px auto;
      max-width: 1125px;
      font-weight: 500;
      letter-spacing: 0.5px;
      line-height: 27px;
      color: #353535;

      @media (min-width: 820px) {
        width: 80%;
        font-size: 1.1em;
      }

      a {
        text-decoration: underline;
        color: #000000;
      }
    }
  }
`;

export { Container };
