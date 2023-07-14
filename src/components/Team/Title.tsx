import React from "react";
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

export function Title() {
  return (
    <div>
    <Head>
      <meta property="og:title" content='The Global Community Behind the Open-Source DORA Platform - Apache DevLake Team & PPMC' /> 
      <meta property="og:description" content="Get to know the team behind Apache DevLake, the open-source platform to measure cycle time, track engineering performance, and implement DORA metrics." />
      <meta property="og:keywords" content="How to Measure Cycle Time, How to Accelerate Software Delivery, How to Track Engineering Performance, How to Track Engineering Productivity" />
    </Head>
    <div className="flex flex-col w-[100%]
    h-[232px] sm:h-[132px] mobile:h-[116px] justify-center">
      <h3
        className="text-heading0 sm:text-heading2 text-primary-500"
      >
        Team
      </h3>
      <p
        className="text-label24 sm:text-label16Lake text-primary-800"
      >
        We deeply appreciate your contribution!
      </p>
    </div>
    </div>

  );
}
