import styled, { keyframes } from 'styled-components';

const lightning = keyframes` 
  0% {
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  11% {
    opacity: 0;
  }

  21% {
    opacity: 1;
  }

  22% {
    opacity: 0;
  }

  37% {
    opacity: 1;
  }

  38% {
    opacity: 0;
  }

  49% {
    opacity: 1;
  }

  79% {
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

  88% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
`;

const rotateCW = keyframes`
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg);
  }
`;

const rotateCCW = keyframes`
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(-360deg);
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 0;
  top: 0;
  left: 0;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    /*   opacity: 0.5; */
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  }

  /* main purple color bg */
  .purpleBg {
    z-index: 1;
    background-color: #6b2fd6;
  }

  /* overlay to slightly darken entire div */
  .darkenBg {
    z-index: 2;
    background: black;
    opacity: 0.45;
  }

  .blackCircleContainer {
    z-index: 4;
  }

  .purpleCircleContainer {
    z-index: 5;
  }

  /* main overlay that changes 
  with keyframe for lightning effect */
  .lightningOverlay {
    z-index: 6;
    background: black;
    animation-duration: 10s;
    animation-name: ${lightning};
    animation-iteration-count: infinite;
  }
`;

export const PurpleCircle = styled.div`
  position: absolute;
  height: 500px;
  width: 500px;
  z-index: 3;
  background: rgb(188, 159, 240);
  background: radial-gradient(circle, #8b4cfa 0%, rgba(0, 0, 0, 0) 65%);
  animation: ${rotateCCW} 14s linear infinite;
  transform-origin: bottom left;
`;

export const BlackCircle = styled.div`
  position: absolute;
  top: calc(-100px + (-20vh + 30%));
  left: calc(-100px - (-20vw + 30%));
  height: 65vw;
  width: 65vw;
  border-radius: 50%;
  z-index: 3;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 65%
  );
  animation: ${rotateCW} 14s linear infinite;
  transform-origin: top left;
`;
