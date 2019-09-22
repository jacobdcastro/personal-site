import styled from 'styled-components';

const MobileNavWrapper = styled.div`
  .mobileNav {
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
      opacity: ${props => (props.isOpen ? '100' : '0')};
      background-color: rgba(0, 0, 0, 0.4);
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
      box-shadow: -2px 0 22px #000;
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
      z-index: 7;
      nav {
        ul {
          list-style-type: none;
          margin: 0px 10px 60px 20px;

          li {
            list-style-type: none;
            a {
              transition: ${props => props.theme.transition};
              border-bottom: 4px solid transparent;
              color: ${props => props.theme.textColor};
              font-family: 'Montserrat', sans-serif;
              font-weight: 600;
              text-decoration: none;
              font-size: 1.8rem;
              padding: 5px 4px 8px;
              margin-bottom: 8px;
            }
          }
          a:hover {
            border-bottom: 4px solid ${props => props.theme.textColor};
          }

          .activePage {
            border-bottom: 4px solid ${props => props.theme.textColor};
          }
        }
      }
    }
  }
  @media (min-width: 980px) {
    .hamburger {
      display: none;
    }
  }
`;

export default MobileNavWrapper;
