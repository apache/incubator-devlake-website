import React from "react";

import Link from '@docusaurus/Link';
import HeaderSvg from '@site/static/img/Homepage/HeaderIcon.svg';
import HeaderBG from '@site/static/img/Homepage/HeaderBG.png';
import HeaderBGMB from '@site/static/img/Homepage/HeaderBG-MB.png';

import RedHatIcon from '@site/static/img/Homepage/brand/RedHat.svg';
import StripeIcon from '@site/static/img/Homepage/brand/Stripe.svg';
import OrkesIcon from '@site/static/img/Homepage/brand/Orkes.png';
import ClickHouseIcon from '@site/static/img/Homepage/brand/ClickHouse.png';
import CrozIcon from '@site/static/img/Homepage/brand/Croz.png';
import CoderIcon from '@site/static/img/Homepage/brand/Coder.png';
import ScarfIcon from '@site/static/img/Homepage/brand/Scarf.svg';
import IBMIcon from '@site/static/img/Homepage/brand/IBM.svg'

export function HomepageHeader() {
  return (
    <div>
      <img src={HeaderBG} alt='' className="
      absolute top-[0px] left-[0px] max-h-[580px] 
      xl:w-screen sm:hidden" />
      <img src={HeaderBGMB} alt='' className="
      absolute top-[0px] left-[0px] w-screen z-0
      sm:h-[496px] mobile:h-[526px]
      hidden sm:block" />
      <header
        className="relative 
        pl-[30px] pr-[30px]
        pt-[64px] pb-[90px]
        sm:pt-5 sm:pb-[0px]
        flex sm:flex-col
        justify-between items-center
        max-w-[80%] xl:max-w-[1440px] mx-auto sm:max-w-[90%]"
      >
        <div className=" z-10
          flex flex-col flex-nowrap
          justify-start w-[670px]
          sm:flex-wrap sm:w-auto
          sm:text-center mobile:justify-center
        " >
          <div
            className="text-primary
            font-bold font-inter
            text-heading0
            sm:text-heading2
            sm:font-semibold sm:text-center
            mb-[32px] sm:mb-3"
          >
            Debug Engineering Process{' '}
            <br className="sm:hidden mobile:block" />
            Demystify Dev Data
          </div>
          <div className="text-primary-800
            text-label24 font-inter font-normal mb-[48px]
            sm:text-label16 sm:text-start sm:mb-3
          ">
            Apache DevLake (Incubating) ingests, analyzes, and visualizes the fragmented data from DevOps tools to extract insights for engineering excellence, developer experience, and community growth.
          </div>
          <Link
            className="primary-button
              sm:flex sm:w-[137px] sm:h-5 p-[0px] sm:text-[14px]
              whitespace-nowrap sm:mx-auto sm:rounded-[5px] sm:mb-4"
            to="https://devlake.apache.org/docs/GettingStarted"
          >
            Get Started
          </Link>
        </div>
        <HeaderSvg className="
        w-auto h-auto z-10
        xl:relative xl:mr-8 xl:ml-2
        md:mr-0
        sm:w-[260px] sm:h-[228px] sm:mx-auto sm:mb-5
      "/>
      </header>
      <div
        className=" 
              pl-[30px] pr-[30px]
              flex sm:flex-wrap
              xl:justify-between
              sm:justify-around
              items-center"
      >
        <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px]">
          <RedHatIcon className="mobile:w-[72px]" />
        </div>
        <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px]">
          <StripeIcon className="mobile:w-[36px]" />
        </div>
        <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px]">
          <img className="w-[88px] mobile:w-[48px]" src={OrkesIcon} />
        </div>
        <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px]">
          <img className="w-[140px] mobile:w-[71px]" src={ClickHouseIcon} />
        </div>
        <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px]">
          <img className="w-[80px] mobile:w-[36px]" src={CrozIcon} />
        </div>
        <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px]">
          <img className="w-[120px] mobile:w-[60px]" src={CoderIcon} />
        </div>
        <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px]">
          <ScarfIcon className="mobile:w-[48px]" />
        </div>
        <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px]">
          <IBMIcon className="mobile:w-[30px]" />
        </div>
      </div>
    </div>
  );
}