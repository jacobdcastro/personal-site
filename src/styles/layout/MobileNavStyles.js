import styled from 'styled-components';

const MobileNavWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
  opacity: ${props => (props.isOpen ? '100' : '0')};
  transition: ${props => props.theme.transition};
  background-color: transparent;
  z-index: 5;

  .darkLayer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    transition: ${props => props.theme.transition};
    opacity: ${props => (props.isOpen ? '100' : '0')};
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 6;
  }

  #mobileMenu {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    transition: ${props => props.theme.transition};
    transform: translateX(${props => (props.isOpen ? '0' : '250px')});
    background-color: ${props => props.theme.bgColor};
    z-index: 7;
    nav {
      a {
        color: ${props => props.theme.textColor};
      }
    }
  }
`;

export default MobileNavWrapper;
