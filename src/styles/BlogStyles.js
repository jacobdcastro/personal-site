import styled from 'styled-components';

const Container = styled.div`
  height: auto;
  width: 90%;
  max-width: 1125px;
  margin: 20px auto;
  text-align: center;

  /* h1 {
    line-height: 3rem;
  } */

  h2 {
    font-family: 'Montserrat', 'Helvetica', sans-serif;
    text-align: center;
    letter-spacing: 1px;
    color: #353535;
    @media (min-width: 820px) {
      font-size: 2em;
      line-height: 2em;
    }
  }

  .blogPostList {
    display: grid;
    grid: auto / auto;
    padding: 0;
    margin: 0 auto;
    width: 95%;
    max-width: 1125px;
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    @media (min-width: 820px) {
      width: 760px;
      margin: auto;
      grid: auto / repeat(2, auto);
    }
    @media (min-width: 1270px) {
      width: 1100px;
      grid: auto / repeat(3, auto);
    }
  }
`;

export { Container };
