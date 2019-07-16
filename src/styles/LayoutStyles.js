import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: auto 18%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;

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

export { Container };
