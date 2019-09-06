import styled from 'styled-components';

const IndexPageWrapper = styled.div`
  .indexIntro {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 15px;

    h1 {
      color: ${props => props.theme.textColor};
    }

    .introSocialLinks {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 90vw;
      max-width: 350px;
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

  .downArrowLink {
    width: 80%;
    margin: -20px auto 0;
    text-align: center;

    svg {
      height: 50px;
      width: auto;
      margin: 0 0;
      .icon {
        transition: ${props => props.theme.transition};
        fill: ${props => props.theme.textColor};
      }
    }
  }

  #blogPosts {
    padding-top: 60px;
    margin-top: -40px;
    h1 {
      margin: 30px 0 0;
    }
  }
`;

export { IndexPageWrapper };
