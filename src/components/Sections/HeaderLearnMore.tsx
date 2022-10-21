import React from "react";

import Link from "@docusaurus/Link";

import IBMIcon from "@site/static/img/Homepage/brand/IBM.svg";
export function HeaderLearnMore() {
  return (
    <header
      className="sticky 
        top-[60px]
        bg-[#3C5088]
        z-30
        "
    >
      <div
        className="
        flex
        min-h-[56px]
        items-center
        justify-center
        mobile:flex-wrap sm:flex-wrap 
        mobile:w-[342px] sm:w-[696px]
        mx-auto
        w-[100%]
    "
      >
        <div
          className="
            text-center
            font-medium
            text-neutral-invert
            text-label18 mobile:text-label14 sm:text-label14
            mobile:my-1 sm:my-1
       "
        >
          Apache DevLake now supports DORA metrics. Discover DORA with us!
        </div>
        <Link
          className="
            bg-[#7497F7]
            primary-button
            w-[100px]
            sm:w-[81px] mobile:w-[81px]
            h-[32px] sm:h-[24px] mobile:h-[24px]
            rounded-[4px]
            ml-[16px] 
            font-normal
            text-label14
            mobile:text-body-sm sm:text-body-sm
            mobile:my-[8px] sm:my-[8px]
            mobile:mx-auto sm:mx-auto
            "
          to="https://devlake.apache.org/docs/v0.14/UserManuals/DORA"
        >
          Learn More
        </Link>
      </div>
    </header>
  );
}
