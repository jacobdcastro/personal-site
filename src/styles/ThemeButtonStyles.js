import styled from 'styled-components';

const Wrapper = styled.button`
  position: absolute;
  right: 30px;
  bottom: 30px;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background-color: #824ee1;
  z-index: 10;

  &:hover {
    cursor: pointer;
  }
`;

export { Wrapper };
