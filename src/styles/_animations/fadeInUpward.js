import { keyframes } from 'styled-components';

const fadeInUpward = keyframes`
  0%, 20% {
    transform: translateY(65px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export default fadeInUpward;
