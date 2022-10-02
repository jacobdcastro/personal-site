import React from 'react';
import {
  Wrapper as BgWrapper,
  PurpleCircle,
  BlackCircle,
} from './BgComponents';

const ranPos = () => {
  const top = ['-500px'];
};

const PurpleBg = () => {
  const purpleCircleCount = 3;
  const blackCircleCount = 7;

  return (
    <BgWrapper>
      <div className="bg purpleBg" />
      <div className="bg darkenBg" />
      <div className="bg lightningOverlay" />

      <div className="bg container white-container">
        {/* {new Array(purpleCircleCount).map((_, i) => (
          <PurpleCircle key={i} />
        ))} */}
        {/* <PurpleCircle /> */}
      </div>

      <div className="bg container black-container">
        {/* {new Array(blackCircleCount).map((_, i) => (
          <BlackCircle key={i} />
        ))} */}
        {/* <BlackCircle /> */}
      </div>
    </BgWrapper>
  );
};

export default PurpleBg;
