import React from "react";
import ppmcInfo from '/info/Team/ppmc.json';
import { PersonCard } from './PersonCard';
import { ContributorInfo } from './types';

export function PPMC() {
  return (
    <div className="py-[60px] sm:py-5 mobile:py-4">
      <h2 className="
    text-primary-800 font-semibold
      text-heading1 sm:text-heading3
      mb-[64px] sm:mb-[32px] mobile:mb-[24px]
      ">
        PPMC
      </h2>
      <div className="
      grid grid-cols-3 gap-x-4 gap-y-4 mobile:gap-y-3 sm:grid-cols-2 mobile:grid-cols-1 
      z-10 max-w-[1200px] mx-auto relative">
        {ppmcInfo.data.map((ppmc: ContributorInfo) => <PersonCard info={ppmc}/>)}
      </div>
    </div>
  );
}
