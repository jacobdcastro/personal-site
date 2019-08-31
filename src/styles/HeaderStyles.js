import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: sticky;

  .navContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #logo {
    width: 40vw;
    .headerLogoSVG {
      transition: ${props => props.theme.transition};
      fill: ${props => props.theme.textColor};
      width: 80vw;
    }

    h1 {
      color: ${props => props.theme.textColor};
      font-size: 2vw;
      text-align: center;
      letter-spacing: 1vw;
    }
  }

  .hamburger-inner,
  .hamburger-inner::before,
  .hamburger-inner::after {
    background-color: ${props => props.theme.textColor};
  }
`;

export { HeaderWrapper };
