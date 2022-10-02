import React from 'react';

const Pfp = () => {
  return (
    <div className="h-32 w-32 rounded-full md:h-44 md:w-44">
      <a href="https://opensea.io/assets/0x792496a3f678187e59e1d1d5e075799cd1e124c2/3937">
        <img
          src="/me-pfp.jpg"
          alt="Jacob's squishy squad nft pfp"
          className="rounded-full h-full w-full"
        />
      </a>
    </div>
  );
};

export default Pfp;
