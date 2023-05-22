import React from "react";

export function BlogHeader() {
  return (
    <div className="mt-[80px] sm:mt-[32px] mobile:mt-[24px] mb-6 sm:mb-5 mobile:mb-4">
        <h1 className="font-bold text-heading0 sm:text-heading2 text-primary-500">
            Blog
        </h1>
        <div className="text-primary-800 text-label24 sm:text-label16Lake mt-3">
          <p className="m-[0]">
          See what is happening with Apache DevLake. 
          </p>
          <p className="m-[0]">
          Gain insights into data-driven engineering from our passionate developers.
          </p>
          <br></br>
          <a href="https://devlake.apache.org/community/MakingContributions/BlogSubmission/" target="_blank" rel="noopener noreferrer" class="primary-button flex whitespace-nowrap rounded-[8px] sm:rounded-[5px] mobile:rounded-[5px] bg-neutral-invert text-primary-500 border-2 border-primary-500 border-solid hover:text-primary-500  hover:bg-neutral-invert hover:opacity-80 mobile:mt-3 w-[200px] sm:w-[140px] mobile:w-[140px] h-[48px] sm:h-[32px] mobile:h-[32px]">Contribute</a>
        </div>
    </div>
  );
}
