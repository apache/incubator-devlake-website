import React from "react";

import Link from "@docusaurus/Link";
import HeaderSvg from "@site/static/img/Homepage/HeaderIcon.svg";
import HeaderBG from "@site/static/img/Homepage/HeaderBG.png";
import HeaderBGMB from "@site/static/img/Homepage/HeaderBG-MB.png";

import RedHatIcon from "@site/static/img/Homepage/brand/RedHat.svg";
import StripeIcon from "@site/static/img/Homepage/brand/Stripe.svg";
import OrkesIcon from "@site/static/img/Homepage/brand/Orkes.png";
import ClickHouseIcon from "@site/static/img/Homepage/brand/ClickHouse.png";
import CrozIcon from "@site/static/img/Homepage/brand/Croz.png";
import CoderIcon from "@site/static/img/Homepage/brand/Coder.png";
import ScarfIcon from "@site/static/img/Homepage/brand/Scarf.svg";
import IBMIcon from "@site/static/img/Homepage/brand/IBM.svg";

export function HomepageHeader() {
    return (
        <div className="w-full">
          <img
            src={HeaderBG}
            alt=""
            className="
          absolute top-[0px] left-[0px] max-h-[580px] 
          xl:w-screen sm:hidden"
          />
          <img
            src={HeaderBGMB}
            alt=""
            className="
          absolute top-[0px] left-[0px] w-screen z-0
          sm:h-[496px] mobile:h-[526px]
          hidden sm:block"
          />
          <header
            className="
            flex justify-center
            items-center
            w-[840px] mobile:w-[90%]  sm:w-full  2xl:w-[1000px] custom-padding
            mobile:mt-[32px] sm:mt-[65px] mt-[71px]
            z-10
            mx-auto
            "
          >
            <div
              className="z-10
              flex flex-col 
              flex-wrap
            "
            >
              <div
                className="text-primary
                font-bold font-inter
                text-label40 sm:text-heading2 mobile:text-label20
                sm:font-semibold"
              >
                Debug engineering processes and discover opportunities with DORA, Community Growth, Engineering Throughput and more DevLake dashboards...
              </div>
              <div
                className="
                mt-5 mobile:mt-3 sm:mt-3
                text-primary-800
                text-label24
                sm:text-label16Lake mobile:text-label16Lake
                font-inter
            "
              >
                Apache DevLake&trade; (Incubating) ingests, analyzes, and visualizes the
                fragmented data from DevOps tools to distill insights for
                engineering excellence.
              </div>
              <div className="
                flex
                mobile:flex-col
                mt-[48px]  sm:mt-3
                items-center
                justify-between
                mb-[129px] 2xl:mb-[148px] sm:mb-[101px] mobile:mb-[44.9px]
                ">
              <Link
                className="primary-button
                  flex
                  whitespace-nowrap
                  mobile:mt-3
                  rounded-[8px] sm:rounded-[5px] mobile:rounded-[5px]
                  w-[200px] sm:w-[140px] mobile:w-[140px]
                  h-[48px] sm:h-[32px] mobile:h-[32px]"
                to="https://devlake.apache.org/livedemo/EngineeringLeads/DORA"
              >
                See it Live
              </Link>
              <Link
                className="primary-button
                flex
                whitespace-nowrap
                rounded-[8px] sm:rounded-[5px] mobile:rounded-[5px]
                bg-neutral-invert
                text-primary-500
                border-2 border-primary-500 border-solid
                hover:text-primary-500 
                hover:bg-neutral-invert
                hover:opacity-80
                mobile:mt-3
                w-[200px] sm:w-[140px] mobile:w-[140px]
                h-[48px] sm:h-[32px] mobile:h-[32px]"
                to="https://devlake.apache.org/docs/GettingStarted"
              >
                Install DevLake
              </Link>
              <Link
                className="primary-button
                flex
                whitespace-nowrap
                rounded-[8px] sm:rounded-[5px] mobile:rounded-[5px]
    
        
            
              
        
    
            
            Expand All
        
        @@ -121,14 +125,15 @@ export function HomepageHeader() {
      
                bg-neutral-invert
                text-primary-500
                border-2 border-primary-500 border-solid
                hover:text-primary-500 
                hover:bg-neutral-invert
                hover:opacity-80
                mobile:mt-3
                w-[200px] sm:w-[140px] mobile:w-[140px]
                h-[48px] sm:h-[32px] mobile:h-[32px]"
                to="https://join.slack.com/t/devlake-io/shared_invite/zt-20envwfbk-JUTZ4z9jSeRnrvNhBFLg9w"
              >
                Join Slack
              </Link>
              </div>
            </div>
          </header>
          <div className="
           flex
           text-heading4
           text-neutral-300
           font-inter
           text-center
           mx-[auto]
           w-[86%]
           h-[20px]
           mb-[40px]
           items-center
          ">
            <div className="h-[2px] bg-neutral-100 w-[46%] sm:w-[42%] mobile:w-[35%] relative"></div>
            <span className="
             flex-1
             w-[81px]
            ">
            Trusted by
            </span>
            <div className="h-[2px] bg-neutral-100 w-[46%] sm:w-[42%] mobile:w-[35%]"></div>
          </div>
          <div
            className=" 
                  pl-[30px] pr-[30px]
                  flex 
                  justify-between
                  sm:flex-wrap
                  xl:justify-between
                  sm:justify-around
                  items-center
                  m-auto
                  max-w-[90%]"
          >
            <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px] z-20">
              <a href="https://www.redhat.com/en"><RedHatIcon className="mobile:w-[72px]" /></a>
            </div>
            <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px] z-20">
              <a href="https://stripe.com/gb"><StripeIcon className="mobile:w-[36px]" /></a>
            </div>
            <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px] z-20">
              <a href="https://orkes.io/"><img className="w-[88px] mobile:w-[48px]" src={OrkesIcon} /></a>
            </div>
            <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px] z-20">
              <a href="https://clickhouse.com/"><img className="w-[140px] mobile:w-[71px]" src={ClickHouseIcon} /></a>
            </div>
            <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px] z-20">
              <a href="https://croz.net/"><img className="w-[80px] mobile:w-[36px]" src={CrozIcon} /></a>
            </div>
            <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px] z-20">
              <a href="https://coder.com/"><img className="w-[120px] mobile:w-[60px]" src={CoderIcon} /></a>
            </div>
            <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px] z-20">
              <a href="https://about.scarf.sh/"><ScarfIcon className="mobile:w-[48px]" /></a>
            </div>
            <div className="sm:flex-[0_0_25%] sm:text-center sm:mt-[14px] mobile:mt-[0px] z-20">
              <a href="https://www.ibm.com/"><IBMIcon className="mobile:w-[30px]" /></a>
                </div>
            </div>
        </div>
    );
}
