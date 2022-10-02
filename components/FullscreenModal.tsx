import React, { FC, useMemo } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const FullscreenModal: FC<Props> = ({ children, open, onClose }) => {
  return (
    <div
      className={`absolute z-50 transition duration-200 ease-linear h-screen w-screen bg-black ${
        open ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="fixed top-0">
        <button
          onClick={onClose}
          className="h-14 w-14 border border-white border-solid m-4 text-white monument pt-1"
        >
          X
        </button>
      </div>

      {children}
    </div>
  );
};

export default FullscreenModal;
