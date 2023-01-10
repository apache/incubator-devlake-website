import React, { useState, useEffect } from "react";
import Contributors from '../../../info/Team/contributors.json';
import { PersonCard } from "./PersonCard";
import { ContributorInfo } from "./types";
import { TeampageBottomBG } from "./TeampageBG";
import MakeContributionsBG from '@site/static/img/Team/Frame 308.png';
import Link from "@docusaurus/Link";
import { Dropdown } from "../Dropdown";


const meau = [
  'Jan-Mar-2023',
  'Oct-Dec-2022',
  'July-Sept-2022',
  'April-June-2022',
  // 'Jan-March-2022',
  'Time Not Specified'
]



export function Contributor() {
  const [selectedDate, setSelectedDate] = useState(meau[0]);
  return (
    <div className="relative">
      <TeampageBottomBG />
      <div className="relative z-10">
        <div className="py-[60px] sm:py-5 mobile:py-4">
          <h2
            className="
    text-primary-800 font-semibold
      text-heading1 sm:text-heading3
      mb-[16px] sm:mb-[12px] mobile:mb-[12px]
      "
          >
            Contributors
          </h2>
          <p className="text-label18 font-normal text-neutral-500 mb-[64px] sm:mb-[32px] mobile:mb-[24px] ">
            New contributors are always welcomed by our community. You will be
            awarded with a certificate once your first PRs get merged into the
            codebase.
          </p>
          <div>
          <div className="
            flex justify-between mobile:block
            h-[30px] sm:h-[24px] mobile:h-[60px] 
            mt-7 sm:mt-5 mobile:mt-4
            mb-4 sm:mb-3 mobile:mb-[18px]
            ">
              <h3 className="
                text-primary-800 font-semibold
                  text-heading2 sm:text-label18 mobile:text-label16Lake
              ">
                New Contributors
              </h3>
              <div className="relative">
                <Dropdown meau={meau} label={selectedDate} click={(select) => setSelectedDate(select)}/>
              </div>
            </div>
            <div
            className="
      grid grid-cols-3 gap-x-4 gap-y-4 mobile:gap-y-3 sm:grid-cols-2 mobile:grid-cols-1 
      z-10 max-w-[1200px] mx-auto relative"
          >
            {Contributors[selectedDate].map((contributor: ContributorInfo) => (
              <PersonCard info={contributor} />
            ))}
          </div>
          </div>
        </div>
        <TopCommunityContributors />
        <MakeContributions />
      </div>
    </div>
  );
}

function TopCommunityContributors() {
  return (
    <div className="py-[60px] sm:py-5 mobile:py-4">
      <h2
        className="
    text-primary-800 font-semibold
      text-heading1 sm:text-heading3
      mb-[64px] sm:mb-[32px] mobile:mb-[24px]
      "
      >
        Top Community Contributors
      </h2>
      <iframe
        className="w-[100%] h-[601px] mobile:h-[542px]"
        src="https://grafana-lake.demo.devlake.io/grafana/d/r_ruegRVz/bi-weekly-community-retro-for-community-huddle?orgId=1&var-repo_id=github:GithubRepo:1:484251804&var-repo_id=github:GithubRepo:1:384111310&var-issue_type=All&var-interval=14&viewPanel=52"
      />
    </div>
  );
}

function MakeContributions() {
  return (
    <div className="
    relative
    flex items-center bg-primary-200 rounded-[20px]
    mb-[60px] sm:mb-[40px] mobile:mb-5 h-[240px] sm:h-[162px] mobile:h-[210px]"> 
      <img  src={MakeContributionsBG} className="absolute top-[40px] mobile:top-[92px] left-[0] w-[100%] h-[200px] sm:h-[122px] mobile:h-[118px]"/>
      <div className="h-[80px] sm:h-[90px] mobile:h-[162px] mx-[48px] sm:mx-[24px] flex  items-center justify-between mobile:block w-full ">
        <div className="h-[80px] sm:h-[90px]">
          <h2 className="text-primary-800 font-semibold text-heading1 sm:text-heading2">
            Make Contributions
          </h2>
          <p className="text-neutral-500 text-label18 sm:text-label16Lake">
            Anyone can be a contributor of Apache DevLake. Come grow with us!
          </p>
        </div>
          <Link
          className="
            relative z-20
            mobile:mt-4
            bg-primary-500
            primary-button
            w-[160px] h-[48px] 
            rounded-[10px] font-normal text-heading4
            "
            to="https://devlake.apache.org/community/MakingContributions"
        >
            Start Contributing
          </Link>
      </div>
    </div>
  );
}
