import React from "react";

import UF1 from '@site/static/img/Homepage/Setting.svg';
import UF2 from '@site/static/img/Homepage/Grid.svg';
import UF3 from '@site/static/img/Homepage/Report.svg';
import UF4 from '@site/static/img/Homepage/BarChart.svg';
import BlueArrow from '@site/static/img/Homepage/blue-arrow.svg';
import { InlineLink } from "./Components";

const Card = ({ icon, text, children }: {
  icon: React.ReactNode,
  text: String,
  children: React.ReactNode,
}) => (<div className="w-[220px] xl:w-[15vw] xl:max-w-[260px] mobile:mb-6 mobile:text-center">
  <div className="flex flex-col items-center
   bg-primary-100 w-[220px] xl:w-[15vw] xl:max-w-[260px]  h-[140px] rounded-[6px]
   border-primary-500 border-[1px] border-solid
  ">
    <div className="mt-[40px]">{icon}</div>
    <div className="mt-[10px] text-heading4 font-inter font-semibold text-primary-800">{text}</div>
  </div>
  <div className="mt-5 text-label18 font-inter pl-1 text-neutral-500">{children}</div>
</div>)

const Arrow = () => <div className="h-[140px] flex items-center"><BlueArrow className="xl:w-[3.33vw] xl:max-w-[80px] " /></div>

export function UserFlow() {
  return (
    <div className="hidden flex-col relative items-center
      xl:flex">
      <span
        className="section-title text-center mt-[72px] mb-6"
      >User Flow</span>
      <div className="flex mb-[72px]">
        <Card
          icon={<UF1 width={40} height={40} />}
          text="Set up DevLake"
        >
          <InlineLink link="https://devlake.apache.org/docs/GettingStarted/DockerComposeSetup">Install DevLake</InlineLink> via Docker Compose, Kubernetes, Helm or Temporal.
        </Card>
        <Arrow />
        <Card
          icon={<UF2 width={40} height={40} />}
          text="Collect Data"
        >
          Select, transform and set up a schedule for the data you wish to sync from your prefered data sources in the <InlineLink link="https://devlake.apache.org/docs/UserManuals/ConfigUI/Tutorial">Config UI</InlineLink>.
        </Card>
        <Arrow />
        <Card
          icon={<UF3 width={40} height={40} />}
          text="View Dashboards"
        >
          <InlineLink link="https://devlake.apache.org/docs/LiveDemo">View pre-built dashboards</InlineLink> of a variety of use cases and learn engineering insights from the <InlineLink link="https://devlake.apache.org/docs/Metrics">metrics</InlineLink>.
        </Card>
        <Arrow />
        <Card
          icon={<UF4 width={40} height={40} />}
          text="Customize Metrics"
        >
          <InlineLink link="https://devlake.apache.org/docs/UserManuals/Dashboards/GrafanaUserGuide#customizing-a-dashboard">Customize</InlineLink> your own metrics or dashboards with SQL to extend your usage of DevLake.
        </Card>
      </div>
    </div>
  )
}