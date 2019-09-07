import styled from 'styled-components';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  margin-left: -15px;
  margin-top: -15px;
  height: 70px;

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
    background-color: ${props => props.theme.bgColor};
    transition: ${props => props.theme.transition};
    box-shadow: 0px 0px 8px #4d4d4d;
    z-index: 9;

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
