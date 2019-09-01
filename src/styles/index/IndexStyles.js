import styled from 'styled-components';

const IndexPageWrapper = styled.div`
  .indexIntro {
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      color: ${props => props.theme.textColor};
    }

    .introSocialLinks {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 300px;
      li {
        list-style-type: none;
        height: 45px;
        width: 45px;
        transition: 0.2s;
      }
      li:hover {
        transform: translateY(-10px);
      }
      .icon {
        transition: ${props => props.theme.transition};
        height: 15px;
        width: auto;
        fill: ${props => props.theme.textColor};
      }
    }
  }
`;

export { IndexPageWrapper };
