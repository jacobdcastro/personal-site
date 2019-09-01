import styled from 'styled-components';

const LayoutWrapper = styled.div`
  margin: 0;
  transition: ${props => props.theme.transition};
  background-color: ${props => props.theme.bgColor};
  padding: 15px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    transition: ${props => props.theme.transition};
    color: ${props => props.theme.textColor};
  }

  #themeToggleBtn {
    transition: ${props => props.theme.transition};
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    bottom: 20px;
    right: 20px;
    height: 55px;
    width: 55px;
    border: none;
    border-radius: 50%;
    background-color: ${props => props.theme.accentColor};
    color: ${props => props.theme.bgColor};
    box-shadow: 2px 2px 8px #3d3d3d;
    z-index: 5;

    img {
      height: 30px;
      width: auto;
      margin: 0 auto 5px;
    }
  }
  #themeToggleBtn:hover {
    cursor: pointer;
    transform: scale(1.08);
  }

  .mainContent {
    background-color: #fafafa;
    width: 100%;
    padding: 12px 0px 24px;
    margin: 2px auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

export { LayoutWrapper };
