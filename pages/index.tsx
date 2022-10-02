import React, { useState } from 'react';
import Hamburger from 'components/Hamburger';
import MainView from 'components/MainView';
import PurpleBg from 'components/PurpleBg';
import SocialLinks from 'components/SocialLinks';
import { shuffleArray, skills } from 'lib/skills';
import MobileNav from 'components/MobileNav';
import SiteHead from 'components/Head';

const HomePage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SiteHead />
      <div className="relative">
        <PurpleBg />

        <MobileNav open={open} setOpen={setOpen} />

        <div className="absolute h-screen w-screen bg-transparent z-20">
          <nav className="w-screen fixed flex justify-center z-30">
            <Hamburger onClick={() => setOpen(true)} />
          </nav>

          <MainView />

          <SocialLinks />

          <button className="ticker-wrap cursor-pointer">
            <div className="ticker">
              {shuffleArray(skills).map(item => (
                <div
                  key={item}
                  className="ticker-item text-white inline-block font-medium text-md whitespace-nowrap monument pr-24"
                >
                  {item}
                </div>
              ))}
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
