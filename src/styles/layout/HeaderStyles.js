import styled from 'styled-components';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 70px;
  background-color: ${props => props.theme.bgColor};
  transition: ${props => props.theme.transition};
  box-shadow: 0px 0px 10px #4d4d4d;
  display: flex;
  justify-content: center;

  .navContainer {
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 15px;
    width: 100%;
    z-index: 9;
    max-width: 1000px;
    margin: 0 auto;

    #logo {
      position: absolute;
      z-index: 10;
      width: 165px;
      height: auto;
      .headerLogoSVG {
        transition: ${props => props.theme.transition};
        fill: ${props => props.theme.textColor};
        width: 100%;
      }

      a {
        text-decoration: none;
        outline: none;
      }

      h2 {
        color: ${props => props.theme.textColor};
        font-size: 0.563rem;
        text-align: center;
        letter-spacing: 4.4px;
        margin: 0;
      }
    }
  }
`;

export { HeaderWrapper };
