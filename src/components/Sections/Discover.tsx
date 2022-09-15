import React from "react";

import Link from '@docusaurus/Link';
import BG from "@site/static/img/Homepage/discover.png";

export function Discover() {
  return (<div className="flex flex-col items-center relative h-[324px] font-inter bg-primary-100
    sm:px-6 sm:h-[260px] ">
    <img src={BG} alt='' className="absolute bottom-[0px] z-0" />
    <div className="font-medium text-primary-800 text-[32px] leading-[48px] mt-[72px]
      sm:mt-5 sm:text-center sm:text-heading3 sm:leading-[30px]
      ">Discover more engineering <br className="hidden sm:block" /> insights with</div>
    <div className="font-semibold text-primary-500 text-[40px] leading-[60px] mt-1 mb-3
      sm:text-label24 sm:leading-[30px] sm:text-center sm:whitespace-nowrap">Apache DevLake</div>
    <Link
      className="primary-button z-10 sm:flex sm:w-[137px] sm:h-5 sm:p-[0px] 
      whitespace-nowrap sm:mx-auto sm:rounded-[5px] sm:mb-4"
      to="https://devlake.apache.org/docs/GettingStarted"
    >
      Getting Started
    </Link>
  </div>)
}