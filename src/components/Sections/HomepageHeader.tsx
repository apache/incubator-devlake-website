import React from "react";

import Link from '@docusaurus/Link';
import HeaderSvg from '@site/static/img/Homepage/HeaderIcon.svg';
import HeaderBgSvg from '@site/static/img/Homepage/HeaderBgVec.svg';

export function HomepageHeader() {
  return (
    <header
      className="relative
        pt-[64px] pb-[90px] px-[80px]
        flex
        justify-between items-center"
    >
      <HeaderBgSvg className='absolute z-[-1] top-[0px] left-[0px]' />
      <div
        className="
          flex flex-col flex-nowrap
          justify-start w-[590px]
        "
      >
        <div
          className="text-primary
            font-bold font-inter
            text-heading0
            mb-[32px]"
        >
          Debug Your Software
          <br />
          Engineering Process
        </div>
        <div
          className="text-primary-800
            text-label24 font-inter font-normal
            mb-[48px]
          "
        >
          Apache DevLake (Incubating) ingests, analyzes, and visualizes the fragmented data from DevOps tools to distill insights for engineering excellence.
        </div>
        <Link
          className="primary-button"
          to="https://devlake.apache.org/docs/GettingStarted"
        >
          Getting Started
        </Link>
      </div>
      <HeaderSvg className="w-auto h-auto"
      />
    </header>
  );
}