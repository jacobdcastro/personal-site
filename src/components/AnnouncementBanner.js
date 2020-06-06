import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 10px #353535;
  border-radius: 8px;
`;

const AnnouncementBanner = () => {
  return (
    <Wrapper>
      Version 3.0 of this website is currently in the works!
      <br /> Check out the{' '}
      <a href="https://github.com/jacobdcastro/personal-site/tree/development">
        development branch
      </a>{' '}
      for a sneak peek.
    </Wrapper>
  );
};

export default AnnouncementBanner;
