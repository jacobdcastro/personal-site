import styled from 'styled-components';

const AboutPageWrapper = styled.div`
  margin-top: 100px;
  h1 {
    color: ${props => props.theme.textColor};
  }

  @media (min-width: 800) {
    h1 {
      font-size: 3rem;
    }
  }
`;

export { AboutPageWrapper };
