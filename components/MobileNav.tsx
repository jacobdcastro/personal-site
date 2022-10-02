import React, { FC } from 'react';
import FullscreenModal from './FullscreenModal';

interface Props {
  open: boolean;
  setOpen: (p: boolean) => void;
}

const MobileNav: FC<Props> = ({ open = false, setOpen }) => {
  return (
    <FullscreenModal open={open} onClose={() => setOpen(false)}>
      <div className="flex justify-center h-full monument font-black text-2xl tracking-widest uppercase">
        <ul className="w-full flex flex-col justify-center items-center">
          <li className="my-3">
            <a href="https://jacobdcastro.substack.com">Substack</a>
          </li>
          <li className="my-3">
            <a href="https://blog.jdc.dev">Tech Blog</a>
          </li>
          <li className="my-3">
            <a href="https://xiv.eth.xyz">xiv.eth</a>
          </li>
          <li className="my-3">
            <a href="mailto:jacob@jdc.dev">Email</a>
          </li>
          <li className="my-3">
            <a href="/jacob-d-castro-resume_08-2022.pdf">Resume</a>
          </li>
        </ul>
      </div>
    </FullscreenModal>
  );
};

export default MobileNav;
