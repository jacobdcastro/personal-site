import styled from 'styled-components';

const BlogPostPageWrapper = styled.div`
  margin-top: 100px;
  transition: ${props => props.theme.transition};
  background-color: ${props => props.theme.bgColor};
  width: 100%;

  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 1.7rem;
    margin: 10px 0;
  }
  .published {
    margin-bottom: 3px;
  }

  .author {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    align-items: center;

    div {
      height: 100px;
      padding: 10px;
    }
    .portrait {
      align-self: flex-start;
    }
    .myInfo {
      height: auto;
    }
    h3 {

      margin: 0 0 10px;
    }
    p {
      font-size: 0.9rem;
      max-width: 680px;
    }
  }

  .closing {
    margin: 40px 60px 0;
    svg {
      transition: ${props => props.theme.transition};
      fill: ${props => props.theme.textColor};
      width: 65vw;
      height: auto;
      max-width: 400px;
    }
    h3 {
      margin-top: 15px;
      margin-left: 35px;
    }
  }
  @media (max-width: 620px) {
    .author {
      margin-bottom: 10px;
      p {
        margin-bottom: 0;
        font-size: 0.8rem;
      }
    }

    .closing {
      margin: 30px 15px 10px;

      svg {
        width: 80vw;
        height: auto;
        max-width: 380px;
      }
    }
  }
`;

export default BlogPostPageWrapper;
