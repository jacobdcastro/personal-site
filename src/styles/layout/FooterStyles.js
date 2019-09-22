import styled from 'styled-components';

const FooterWrapper = styled.footer`
  text-align: center;
  margin: 0 auto 15px;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    display: block;
    transition: ${props => props.theme.transition};
    color: ${props => props.theme.textColor};
  }

  .stackIcons {
    margin-top: 25px;
    width: 100vw;
    max-width: 400px;
    ul {
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      li {
        list-style-type: none;
        display: flex;
        justify-content: center;
        align-items: center;
        a {
          img {
            height: auto;
            width: 40px;
          }
        }
      }
    }
  }
`;

export default FooterWrapper;
