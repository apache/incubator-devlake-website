import React from "react";

import Link from '@docusaurus/Link';
import HeaderSvg from '@site/static/img/Homepage/HeaderIcon.svg';
import HeaderBG from '@site/static/img/Homepage/HeaderBG.png';

export function HomepageHeader() {
  return (
    <div>
      <img src={HeaderBG} alt='' className="
      absolute top-[0px] left-[0px] max-h-[580px] 
      xl:w-screen
      mobile:hidden" />
      <header
        className="relative
        pt-[64px] pb-[90px] px-[80px]
        mobile:pt-5 mobile:px-[32px] mobile:pb-[0px]
        flex mobile:flex-col
        justify-between items-center
        max-w-[1320px] mx-auto
        mobile:bg-primary-100"
      >
        <div className=" z-10
          flex flex-col flex-nowrap
          justify-start w-[590px]
          mobile:flex-wrap mobile:w-auto
          mobile:text-center mobile:justify-center
        " >
          <div className="hidden mobile:block
            text-primary text-center
            font-bold font-inter
            text-heading2
            mb-[16px]">
            Apache DevLake (Incubating)
          </div>
          <div
            className="text-primary
            font-bold font-inter
            text-heading0
            mobile:text-label16 mobile:leading-[20px]
            mobile:font-normal mobile:text-center
            mb-[32px] mobile:mb-3"
          >
            Debug Your Software{' '}
            <br className="mobile:hidden" />
            Engineering Process
          </div>
          <Link
            className="hidden primary-button mobile:flex w-[160px] h-5 p-[0px] 
          whitespace-nowrap mx-auto rounded-[5px] mb-4"
            to="https://devlake.apache.org/docs/GettingStarted"
          >
            Getting Started
          </Link>
          <HeaderSvg className="hidden mobile:block 
          w-[240px] h-[240px] mx-auto mb-5" />
          <div className="text-primary-800
            text-label24 font-inter font-normal mb-[48px] 
            mobile:text-heading3 mobile:font-semibold
            mobile:text-primary-500
          ">
            <span className="hidden mobile:inline">I</span>
            <span className="mobile:hidden">Apache DevLake (Incubating) i</span>ngests, analyzes, and visualizes the fragmented data from DevOps tools to distill insights for engineering excellence.
          </div>
          <Link
            className="primary-button mobile:hidden"
            to="https://devlake.apache.org/docs/GettingStarted"
          >
            Getting Started
          </Link>
        </div>
        <HeaderSvg className="
        w-auto h-auto z-10 mobile:hidden
      "/>
      </header>
    </div>
  );
}