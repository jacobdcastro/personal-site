// @ts-nocheck
import React from 'react';
import Head from 'next/head';

type Props = { title?: string };

const SiteHead = (props: Props) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Jacob D. Castro - Web3 Developer</title>
        <link rel="icon" type="image/png" href="https://jdc.dev/pfp.png" />
        <meta
          name="description"
          content="A Web3 Developer building fullstack dapps using React, Express.js, and Solidity. Passionate about crypto literacy, buidling, DAOs, and community."
        ></meta>
        {/* <meta property="og:image" content="https://jdc.dev/pfp.png" /> */}
        <meta property="og:title" content="Jacob D. Castro - Web3 Developer" />
        <meta
          property="og:description"
          content="A Web3 Developer building fullstack dapps using React, Express.js, and Solidity. Passionate about crypto literacy, buidling, DAOs, and community."
        />
      </Head>
    </>
  );
};

export default SiteHead;
