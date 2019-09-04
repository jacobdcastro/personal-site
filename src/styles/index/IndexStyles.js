import styled from 'styled-components';

const IndexPageWrapper = styled.div`
  .indexIntro {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      color: ${props => props.theme.textColor};
    }

    .introSocialLinks {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 400px;
      margin: 0;
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

  #downArrow {
    height: 50px;
    width: auto;
    /* padding-top: 60px; */
    margin: 15px auto;
  }
`;

export { IndexPageWrapper };
