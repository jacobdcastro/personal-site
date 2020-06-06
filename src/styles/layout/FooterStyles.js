import styled from 'styled-components';

const FooterWrapper = styled.footer`
  text-align: center;
  margin: 0 auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    display: block;
    transition: ${props => props.theme.transition};
    color: ${props => props.theme.textColor};
    margin-bottom: 5px;
  }

  .typoSpan {
    margin-top: 10px;
  }

  .stackIcons {
    padding: 25px 15px 15px;
    width: 100%;
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

  small {
    color: ${props => props.theme.textColor};
    padding-top: 5px;
  }
`;

export default FooterWrapper;
