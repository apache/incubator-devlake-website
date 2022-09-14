import React from "react";

import Link from '@docusaurus/Link';
import HeaderSvg from '@site/static/img/Homepage/HeaderIcon.svg';
import HeaderBG from '@site/static/img/Homepage/HeaderBG.png';
import HeaderBGMB from '@site/static/img/Homepage/HeaderBG-MB.png';

export function HomepageHeader() {
  return (
    <div>
      <img src={HeaderBG} alt='' className="
      absolute top-[0px] left-[0px] max-h-[580px] 
      xl:w-screen mobile:hidden" />
      <img src={HeaderBGMB} alt='' className="
      absolute top-[0px] left-[0px] h-[526px]
      hidden mobile:block" />
      <header
        className="relative
        pt-[64px] pb-[90px] px-[80px]
        mobile:pt-5 mobile:px-[32px] mobile:pb-[0px]
        flex mobile:flex-col
        justify-between items-center
        max-w-[80vw] mx-auto sm:max-w-none"
      >
        <div className=" z-10
          flex flex-col flex-nowrap
          justify-start w-[590px]
          mobile:flex-wrap mobile:w-auto
          mobile:text-center mobile:justify-center
        " >
          <div
            className="text-primary
            font-bold font-inter
            text-heading0
            mobile:text-heading2
            mobile:font-semibold mobile:text-center
            mb-[32px] mobile:mb-3"
          >
            Debug Your Software{' '}
            <br />
            Engineering Process
          </div>
          <div className="text-primary-800
            text-label24 font-inter font-normal mb-[48px]
            mobile:text-label16 mobile:leading-[22px] mobile:text-start mobile:mb-3
          ">
            Apache DevLake (Incubating) ingests, analyzes, and visualizes the fragmented data from DevOps tools to distill insights for engineering excellence.
          </div>
          <Link
            className="primary-button
              mobile:flex mobile:w-[160px] mobile:h-5 p-[0px] 
              whitespace-nowrap mobile:mx-auto mobile:rounded-[5px] mobile:mb-4"
            to="https://devlake.apache.org/docs/GettingStarted"
          >
            Getting Started
          </Link>
        </div>
        <HeaderSvg className="
        w-auto h-auto z-10
        mobile:w-[260px] mobile:h-[228px] mobile:mx-auto mobile:mb-5
      "/>
      </header>
    </div>
  );
}