import styled from 'styled-components';
import fadeInUpward from '../_animations/fadeInUpward';

const IndexPageWrapper = styled.div`
  transition: ${props => props.theme.transition};

  .indexIntro {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto 0;

    .headline {
      animation: ${fadeInUpward} 1s;
      color: ${props => props.theme.textColor};
      letter-spacing: 0.5px;
    }

    .introSocialLinks {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      animation: ${fadeInUpward} 1s;
      width: 90vw;
      max-width: 350px;
      margin: 0;
      li {
        list-style-type: none;
        height: 45px;
        width: 45px;
        transition: 0.2s;
        background-color: ${props => props.theme.bgColor};
        transition: ${props => props.theme.transition};
      }
      li:hover {
        transform: translateY(-10px);
      }
      .icon {
        transition: ${props => props.theme.transition};
        height: 15px;
        width: auto;
        background-color: ${props => props.theme.bgColor};
        fill: ${props => props.theme.textColor};
      }
    }
  }

  .downArrowLink {
    width: 80%;
    margin: -14vh auto 0;
    text-align: center;
    align-self: flex-end;
    transition: ${props => props.theme.transition};

    a {
      height: 50px;
      width: 50px;

      svg {
        height: 50px;
        width: auto;
        margin: 0 0;
        background-color: ${props => props.theme.bgColor};
        transition: ${props => props.theme.transition};
        .icon {
          background-color: ${props => props.theme.bgColor};
          transition: ${props => props.theme.transition};
          fill: ${props => props.theme.textColor};
        }
      }
    }
  }

  #recentPublications {
    padding-top: 72px;
    margin-top: -40px;
    h1 {
      margin: 30px 0 0;
    }
  }

  @media (min-width: 550px) {
    .indexIntro {
      h1 {
        font-size: 2.6rem;
      }
    }
  }

  @media (min-width: 880px) {
    .indexIntro {
      /* margin-left: -10vw; */
      position: relative;
      left: 0px;
      max-width: 1000px;

      h1 {
        font-size: 3rem;
      }

      .introSocialLinks {
        margin-bottom: 25px;
        li {
          height: 55px;
          width: 55px;
        }
        .icon {
          height: 25px;
        }
      }
    }
  }
`;

export { IndexPageWrapper };
