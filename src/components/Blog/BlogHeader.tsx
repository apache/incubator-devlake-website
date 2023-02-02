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
          <a href="https://devlake.apache.org/community/make-contribution/BlogSubmission/"><button>Contribute</button></a>
        </div>
    </div>
  );
}
