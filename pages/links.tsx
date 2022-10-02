import React, { useState } from 'react';
import Pfp from 'components/Pfp';
import SiteHead from 'components/Head';

const LinksPage = () => {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('jacobdcastro#0014');
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 1750);
  };

  return (
    <>
      <SiteHead />
      <div
        className="bg-black h-screen w-screen flex flex-col"
        style={{ minHeight: '805px' }}
      >
        <div className="w-full flex flex-col items-center text-center pt-10">
          <Pfp />

          <h1 className="monument font-black text-4xl tracking-widest uppercase mt-5 md:text-5xl">
            <span>Jacob D.</span>
            <br />
            Castro
          </h1>

          <ul>
            <li className="jetbrains-mono md:text-xl">web3 developer</li>
          </ul>
        </div>

        <nav className="flex justify-center h-full monument font-black text-lg md:text-2xl tracking-widest uppercase flex-grow -mt-10">
          <ul className="w-full h-full flex flex-col justify-center items-center">
            <li className="my-4">
              <a href="https://twitter.com/jacobdcastro">twitter</a>
            </li>
            <li className="my-4">
              <a href="https://instagram.com/jacobdcastro">instagram</a>
            </li>
            <li className="my-4">
              <a href="https://github.com/jacobdcastro">github</a>
            </li>
            <li className="my-4">
              <a href="https://blog.jdc.dev">tech blog</a>
            </li>
            <li className="my-4">
              <a href="https://mirror.xyz/xiv.eth">mirror</a>
            </li>
            <li
              className="my-4 text-sm md:text-2xl"
              onClick={() => handleCopy()}
            >
              {showCopied ? 'Copied!' : 'jacobdcastro#0014'}
            </li>
            <li className="my-4">
              <a href="mailto:jacob@jdc.dev">jacob@jdc.dev</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default LinksPage;
