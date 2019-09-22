import styled from 'styled-components';

const BlogPostPageWrapper = styled.div`
  margin-top: 100px;
  transition: ${props => props.theme.transition};
  background-color: ${props => props.theme.bgColor};
  width: 100%;

  h1 {
    font-size: 3rem;
  }

  .closing {
    margin: 40px 60px 0;
    svg {
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
