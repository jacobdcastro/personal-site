import styled from 'styled-components';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 85%;
  max-width: 635px;
  height: ${props => props.height};
  overflow: hidden;
  text-align: left;
  background-color: #fff;
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  box-shadow: 0px 0px 8px #444;
  transition: 300ms;

  legend {
    font-family: 'Montserrat', 'Helvetica', sans-serif;
    font-weight: 700;
    letter-spacing: 1px;
    font-size: 1.1em;
    margin: 0px 8px;
  }
  p {
    font-family: 'Montserrat', 'Helvetica', sans-serif;
  }
  .nameSection {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
`;

export { Container };
