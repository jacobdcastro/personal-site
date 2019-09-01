import styled from 'styled-components';

const HeaderWrapper = styled.header`
  width: 100%;
  height: 70px;
  margin-left: -15px;

  .navContainer {
    height: 70px;
    padding: 15px;
    background-color: ${props => props.theme.bgColor};
    box-shadow: 5px 0px 8px #4d4d4d;
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    #logo {
      width: 40vw;
      .headerLogoSVG {
        transition: ${props => props.theme.transition};
        fill: ${props => props.theme.textColor};
        width: 80vw;
      }

      h2 {
        color: ${props => props.theme.textColor};
        font-size: 2vw;
        text-align: center;
        letter-spacing: 1vw;
        margin: 0;
      }
    }

    .hamburger-inner,
    .hamburger-inner::before,
    .hamburger-inner::after {
      background-color: ${props => props.theme.textColor};
    }
  }
`;

export { HeaderWrapper };
