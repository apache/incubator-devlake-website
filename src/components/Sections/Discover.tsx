import React from "react";

import Link from '@docusaurus/Link';
import BG from "@site/static/img/Homepage/discover.png";

export function Discover() {
  return (<div className="flex flex-col items-center relative h-[324px] font-inter bg-primary-100
    mobile:px-6 mobile:h-[260px]">
    <img src={BG} alt='' className="absolute bottom-[0px] z-0" />
    <div className="font-medium text-primary-800 text-[32px] leading-[48px] mt-[72px]
      mobile:mt-5
      mobile:text-center mobile:font-normal mobile:text-heading3 mobile:text-primary-500
      ">Discover more engineering insights with</div>
    <div className="font-semibold text-primary-500 text-[40px] leading-[60px] mt-1 mb-3
      mobile:text-label24 mobile:leading-[30px] mobile:text-center">Apache DevLake (Incubating)</div>
    <Link
      className="primary-button z-10 mobile:flex mobile:w-[160px] mobile:h-5 mobile:p-[0px] 
      whitespace-nowrap mobile:mx-auto mobile:rounded-[5px] mobile:mb-4"
      to="https://devlake.apache.org/docs/GettingStarted"
    >
      Getting Started
    </Link>
  </div>)
}