import styled from 'styled-components';

const FooterWrapper = styled.footer`
  text-align: center;
  margin: 0 auto 15px;
  width: auto;

  span {
    display: block;
    transition: ${props => props.theme.transition};
    color: ${props => props.theme.textColor};
  }
`;

export default FooterWrapper;
