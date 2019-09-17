import styled from 'styled-components';

const FooterWrapper = styled.footer`
  text-align: center;
  span {
    display: block;
    transition: ${props => props.theme.transition};
    color: ${props => props.theme.textColor};
  }
`;

export default FooterWrapper;
