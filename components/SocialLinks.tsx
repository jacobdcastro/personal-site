import React from 'react';

const SocialLinks = () => {
  return (
    <div className="absolute right-0 flex justify-center items-center h-screen">
      <div className="flex items-center h-96">
        <ul className="h-full flex flex-col justify-evenly">
          <li className="monument text-xl transform -rotate-90 flex-grow-0 text-center tracking-wider">
            <a
              target="_blank"
              rel="noopener"
              href="https://twitter.com/jacobdcastro"
            >
              TW
            </a>
          </li>
          <li className="monument text-xl transform -rotate-90 flex-grow-0 text-center tracking-wider">
            <a
              target="_blank"
              rel="noopener"
              href="https://instagram.com/jacobdcastro"
            >
              IG
            </a>
          </li>
          <li className="monument text-xl transform -rotate-90 flex-grow-0 text-center tracking-wider">
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/jacobdcastro"
            >
              GH
            </a>
          </li>
          {/* <li className="monument text-xl transform -rotate-90 flex-grow-0 text-center tracking-wider">
            <a  target="_blank"
              rel="noopener" href="">DS</a>
          </li> */}
          {/* <li className="monument text-xl transform -rotate-90 flex-grow-0 text-center tracking-wider">
            <a
              target="_blank"
              rel="noopener"
              href="https://www.youtube.com/channel/UCmlPUMfWVjjF0IHM32cX7pw"
            >
              YT
            </a>
          </li> */}
          <li className="monument text-xl transform -rotate-90 flex-grow-0 text-center tracking-wider">
            <a
              target="_blank"
              rel="noopener"
              href="https://jacobdcastro.substack.com"
            >
              SS
            </a>
          </li>
          <li className="monument text-xl transform -rotate-90 flex-grow-0 text-center tracking-wider">
            <a
              target="_blank"
              rel="noopener"
              href="https://www.twitch.tv/jacobdcastro"
            >
              TV
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SocialLinks;
