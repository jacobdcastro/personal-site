import styled from 'styled-components';

export const PrimaryLetter = styled.span`
  display: block;
  width: 20px;
`;

export const SecondaryLetter = styled.span`
  display: block;
  width: 0;
  animation: 200ms;
  opacity: 1;

  &:hover {
    width: 20px;
    opacity: 1;
  }
`;
