import styled from 'styled-components';

const BlogPostPageWrapper = styled.div`
  margin-top: 100px;
  transition: ${props => props.theme.transition};
  background-color: ${props => props.theme.bgColor};
  h1 {
    font-size: 3rem;
  }
`;

export default BlogPostPageWrapper;
