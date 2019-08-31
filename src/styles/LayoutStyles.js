import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0;
  padding: 45px;
  transition: ${props => props.theme.transition};
  background-color: ${props => props.theme.bgColor};

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

export { Wrapper };
