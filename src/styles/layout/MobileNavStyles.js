import styled from 'styled-components';

const MobileNavWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
  opacity: ${props => (props.isOpen ? '100' : '0')};
  transition: ${props => props.theme.transition};
  background-color: transparent;
  overflow-x: hidden;
  z-index: 5;

  .darkLayer {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    transition: ${props => props.theme.transition};
    opacity: ${props => (props.isOpen ? '42' : '0')};
    background-color: #000;
    z-index: 6;
  }

  #mobileMenu {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    height: 100vh;
    width: 250px;
    box-shadow: -7px 0 18px #000;
    transition: ${props => props.theme.transition};
    transform: translateX(${props => (props.isOpen ? '0' : '250px')});
    -webkit-transform: translateX(
      ${props => (props.isOpen ? '0' : '250px')}
    ); /* WebKit */
    -moz-transform: translateX(
      ${props => (props.isOpen ? '0' : '250px')}
    ); /* Mozilla */
    -o-transform: translateX(
      ${props => (props.isOpen ? '0' : '250px')}
    ); /* Opera */
    -ms-transform: translateX(${props => (props.isOpen ? '0' : '250px')});
    margin-bottom: 20px;
    background-color: ${props => props.theme.bgColor};
    z-index: 6;
    nav {
      ul {
        list-style-type: none;
        margin: 0px 10px 60px 25px;

        li {
          list-style-type: none;
          a {
            color: ${props => props.theme.textColor};
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            text-decoration: none;
            font-size: 1.8rem;
          }
        }
      }
    }
  }
`;

export default MobileNavWrapper;
