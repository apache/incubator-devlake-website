import React from "react";

import BG from '@site/static/img/Homepage/UC-bg.svg';
import UC1 from '@site/static/img/Homepage/UC1.png';
import UC2 from '@site/static/img/Homepage/UC2.png';
import UC3 from '@site/static/img/Homepage/UC3.png';
import UC4 from '@site/static/img/Homepage/UC4.png';

function UCCard({ lead, title, desc, children }: {
  lead: string,
  title: string,
  desc: string,
  children: React.ReactNode,
}) {
  return (<div className='use-case-card relative shadow-card overflow-hidden
    w-[460px] h-[468px] rounded-[16px]
    mobile:w-[312px] mobile:shadow-hide
    '>
    <div className="flex items-center h-[228px] justify-center
      mobile:h-auto mobile:mb-4">
      {children}
    </div>
    <div className="bg-white px-4 py-2 h-[240px] mobile:bg-transparent mobile:h-auto mobile:p-[0]">
      <div className="font-inter text-neutral-300 text-label18 font-medium mb-2 pr-1
        mobile:text-heading4 mobile:text-neutral-600 mobile:font-semibold mobile:mb-3">{lead}</div>
      <div className="font-inter text-primary-800 text-heading2 font-semibold mb-2 pr-1
        mobile:text-neutral-600 mobile:mb-3">{title}</div>
      <div className="font-inter text-neutral-500 text-label18 font-normal pr-1
        mobile:text-label14 mobile:text-neutral-400">{desc}</div>
    </div>
  </div>)
}

const UCIcon = ({ src }: { src: string }) => <img src={src} alt='' className="
  w-[240px] h-[180px]
  mobile:w-[308px] mobile:h-[250px]
  " />

export function UseCases() {
  return (<div className="flex flex-col relative items-center
    h-[1206px] mobile:h-auto mobile:bg-primary-100 mobile:pb-6">
    <BG className='absolute z-0 mobile:hidden' />
    <span className="section-title text-center mt-7
      mobile:mt-[0]">Use Cases</span>
    <div className="grid grid-cols-2 gap-x-[72px] gap-y-6
      mobile:grid-cols-1">
      <UCCard
        lead="Open-source Software Maintainers"
        title="Contribution Analysis for Community Growth"
        desc="Grow your community strategically by learning how developers participate, contribute and collaborate."
      >
        <UCIcon src={UC1} />
      </UCCard>
      <UCCard
        lead="Product Managers"
        title="Dev Workflow Improvement"
        desc="Align sprint planning with high-level goals and ensure the development progress is on track with metrics that help with improving the workflow."
      >
        <UCIcon src={UC2} />
      </UCCard>
      <UCCard
        lead="Tech Leads"
        title="Bring Out the Best in Your Team"
        desc="Gain insights into the development and delivery process. Remove blockers and risks to establish best practices."
      >
        <UCIcon src={UC3} />
      </UCCard>
      <UCCard
        lead="Data Engineers"
        title="The Foundation to Build What You Want"
        desc="Integrate user-defined data sources with DevLake and easily implement customized metrics and dashboards without reinventing the wheel."
      >
        <UCIcon src={UC4} />
      </UCCard>
    </div>
  </div>)
}