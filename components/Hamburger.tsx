import React from 'react';

interface Props {
  onClick: () => void;
}

const Hamburger = ({ onClick }: Props) => {
  return (
    <button onClick={onClick}>
      <div className="p-3">
        <div className="h-1 w-64 bg-white mb-3" />
        <div className="h-1 w-56 bg-white mb-3" />
        <div className="h-1 w-44 bg-white" />
      </div>
    </button>
  );
};

export default Hamburger;
