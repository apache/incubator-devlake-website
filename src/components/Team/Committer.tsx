import React from "react";
import committerInfo from '../../../info/Team/committers.json';
import { PersonCard } from './PersonCard';
import { ContributorInfo } from './types';

export function Committer() {
  return (
    <div className="py-[60px] sm:py-5 mobile:py-4">
      <h2 className="
    text-primary-800 font-semibold
      text-heading1 sm:text-heading3
      mb-[16px] sm:mb-[12px] mobile:mb-[12px]
      ">
        Committers
      </h2>
      <p className="text-label18 font-normal text-neutral-500 mb-[64px] sm:mb-[32px] mobile:mb-[24px] ">
        Committers contribute to the codebase, participate in the discussion via the dev mailing list, edit the documentation, work on the issue tracker, fostering the dynamic and engaging community we all love.
      </p>
      <div className="
      grid grid-cols-3 gap-x-4 gap-y-4 mobile:gap-y-3 sm:grid-cols-2 mobile:grid-cols-1 
      z-10 max-w-[1200px] mx-auto relative">
        {committerInfo.data.map((committer: ContributorInfo) => <PersonCard info={committer}/>)}
      </div>
    </div>
  );
}
