import styled from 'styled-components';

const Wrapper = styled.header`
  height: 400px;

  .headerLogoSVG {
    transition: ${props => props.theme.transition};
    fill: ${props => props.theme.textColor};
  }
`;

export { Wrapper };
