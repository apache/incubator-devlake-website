import React from "react";

import BG from '@site/static/img/Homepage/UCBG.png';
import BGMB from '@site/static/img/Homepage/UCBG-MB.png';
import UC1 from '@site/static/img/Homepage/UC1.png';
import UC2 from '@site/static/img/Homepage/UC2.png';
import UC3 from '@site/static/img/Homepage/newUC3.png';
import UC4 from '@site/static/img/Homepage/UC4.png';
import * as C from "./Components";

function UCCard({ lead, title, desc, demoURL, children }: {
  lead: string,
  title: string,
  desc: string,
  demoURL: string,
  children: React.ReactNode,
}) {
  return (<div className='use-case-card relative shadow-card overflow-hidden
    xl:w-[30vw] h-[496px] max-w-[650px] rounded-[16px]
    sm:w-[62vw] sm:h-[360px] sm:mx-auto
    mobile:w-auto mobile:h-[420px]'>
    <div className="flex items-center h-[232px] justify-center
      sm:h-[182px]">
      {children}
    </div>
    <div className="bg-white px-4 py-2 h-[264px] sm:h-[152px] sm:p-2 mobile:h-[240px]">
      <div className="font-inter text-neutral-300 text-label18 font-medium mb-2 pr-1
        sm:text-label16 sm:font-normal sm:mb-[4px]">{lead}</div>
      <div className="font-inter text-primary-800 text-heading2 font-semibold mb-2 pr-1
        sm:text-[20px] sm:leading-[28px] sm:mb-[4px] sm:pr-[0]">{title}</div>
      <div className="font-inter text-neutral-500 text-label18 font-normal pr-1
        sm:text-label16 sm:pr-[0]">{desc}</div>
       <C.TextLink link={demoURL}>{lead === "Data Engineers" ? "Learn More" : "See it Live"}</C.TextLink>
    </div>
  </div>)
}

const UCIcon = ({ src }: { src: string }) => <img src={src} alt='' className="
  w-[240px] h-[180px]
  mobile:w-[212px] mobile:h-[160px]
  " />

export function UseCases() {
  return (
    <div className="h-[1206px] sm:h-[1590px] mobile:h-[1752px]">
      <img src={BG} alt='' className='absolute z-0 sm:hidden 
        xl:w-screen h-[1206px] left-[0px]' />
      <img src={BGMB} alt='' className='absolute z-0 hidden 
        sm:block sm:w-full
        xl:w-screen left-[0px] h-[1590px] mobile:h-[1752px]' />
      <div className="flex flex-col relative items-center
        mobile:pb-6">
        <span className="section-title text-center mt-7
          sm:mt-[0] sm:text-heading2">Use Cases</span>
        <div className="grid grid-cols-2 gap-x-[72px] xl:gap-x-10 gap-y-6
          sm:grid-cols-1 sm:gap-y-4">
          <UCCard
            lead="Engineering Leads"
            title="Implement DORA Fast"
            desc="Implement DORA metrics in minutes to enable and manage delivery processes your developers and users will love."
            demoURL="https://grafana-lake.demo.devlake.io/grafana/goto/qBPPBS44k?orgId=1"
          >
          <UCIcon src={UC3} />
          </UCCard>
          <UCCard
            lead="Open Source Maintainers"
            title="Fuel Community Growth with Analysis"
            desc="Grow your community strategically with insights on how developers participate, contribute, and collaborate."
            demoURL="https://grafana-lake.demo.devlake.io/grafana/goto/7z1QfSV4z?orgId=1"
          >
            <UCIcon src={UC1} />
          </UCCard>
          <UCCard
            lead="Product Managers"
            title="Dev Workflow Improvement"
            desc="Align sprint planning with high-level goals and ensure the development progress is on track."
            demoURL="https://grafana-lake.demo.devlake.io/grafana/d/KXWvOFQnz/github?orgId=1"
          >
            <UCIcon src={UC2} />
          </UCCard>
          <UCCard
            lead="Data Engineers"
            title="The Foundation to Build What You Want"
            desc="Integrate user-defined data sources with DevLake and easily implement customized metrics and dashboards without reinventing the wheel."
            demoURL="https://devlake.apache.org/docs/DataModels/DevLakeDomainLayerSchema"
          >
            <UCIcon src={UC4} />
          </UCCard>
        </div>
      </div>
    </div>)
}