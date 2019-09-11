import styled from 'styled-components';

const BlogListWrapper = styled.div`
  border-bottom: 4px solid ${props => props.theme.textColor};
  transition: ${props => props.theme.transition};
  margin: 40px 0 25px;

  a {
    color: ${props => props.theme.textColor};
    text-decoration: none;
  }

  h2 {
    margin: 10px 0 10px;
  }
  h3 {
    font-size: 1rem;
    font-weight: 300;
    margin: 8px 0 15px;
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    margin: 0;
    height: auto;

    .listingTag {
      margin: 0 8px 5px 0;
      font-size: 0.8rem;
    }
  }

  p {
    margin-bottom: 11px;
  }

  .readMore {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 108px;
    height: 50px;
    margin: -10px 0 15px;
    justify-content: space-between;

    ul {
      .listingTag {
        font-weight: 400;
        h5 {
          color: ${props => props.theme.accentColor};
        }
      }
    }

    h3 {
      margin-bottom: 10px;
    }

    p {
      margin: 0;
      color: ${props => props.theme.textColor};
    }
    .rightArrow {
      transition: 0.3s;
      height: 18px;
      .icon {
        transition: ${props => props.theme.transition};
        fill: ${props => props.theme.textColor};
      }
    }
  }
  &:hover {
    .rightArrow {
      transform: translateX(8px);
    }
  }
`;

export default BlogListWrapper;
