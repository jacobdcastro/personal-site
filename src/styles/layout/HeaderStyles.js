import styled from 'styled-components';

const HeaderWrapper = styled.header`
  width: 100%;
  margin-left: -15px;
  height: 70px;

  .navContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    height: 70px;
    padding: 15px;
    width: 100%;
    background-color: ${props => props.theme.bgColor};
    transition: ${props => props.theme.transition};
    box-shadow: 5px 0px 8px #4d4d4d;
    z-index: 6;

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
