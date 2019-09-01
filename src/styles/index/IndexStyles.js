import styled from 'styled-components';

const IndexPageWrapper = styled.div`
  .indexIntro {
    height: 80vh;
    display: flex;
    align-items: center;
    h1 {
      color: ${props => props.theme.textColor};
    }

    .icon {
      height: 15px;
      wdith: auto;
      fill: ${props => props.theme.textColor};
    }
  }
`;

export { IndexPageWrapper };
