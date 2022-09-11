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
    '>
    <div className="flex items-center h-[228px] justify-center">
      {children}
    </div>
    <div className="bg-white px-4 py-2 h-[240px]">
      <div className="font-inter text-neutral-300 text-label18 font-medium mb-2 pr-1">{lead}</div>
      <div className="font-inter text-primary-800 text-heading2 font-semibold mb-2 pr-1">{title}</div>
      <div className="font-inter text-neutral-500 text-label18 font-normal pr-1">{desc}</div>
    </div>
  </div>)
}

const UCIcon = ({ src }: { src: string }) => <img src={src} alt='' className="
  w-[240px] h-[180px]
  " />

export function UseCases() {
  return (<div className="flex flex-col relative  bg-white items-center
    h-[1206px] ">
    <BG className='absolute z-0' />
    <span
      className="section-title text-center mt-7"
    >Use Cases</span>
    <div className="grid grid-cols-2 gap-x-[72px] gap-y-6">
      <UCCard
        lead="Open-source Software Maintainers"
        title="Contribution Analysis for Community Growth"
        desc="Grow your community strategically by learning how developers participate, contribute and collaborate."
      >
        <UCIcon src={UC1} />
      </UCCard>
      <UCCard
        lead="Open-source Software Maintainers"
        title="Contribution Analysis for Community Growth"
        desc="Grow your community strategically by learning how developers participate, contribute and collaborate."
      >
        <UCIcon src={UC1} />
      </UCCard>
      <UCCard
        lead="Open-source Software Maintainers"
        title="Contribution Analysis for Community Growth"
        desc="Grow your community strategically by learning how developers participate, contribute and collaborate."
      >
        <UCIcon src={UC1} />
      </UCCard>
      <UCCard
        lead="Open-source Software Maintainers"
        title="Contribution Analysis for Community Growth"
        desc="Grow your community strategically by learning how developers participate, contribute and collaborate."
      >
        <UCIcon src={UC1} />
      </UCCard>
    </div>
  </div>)
}