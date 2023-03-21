import React from "react";
import * as C from "./Components";
import WAD1 from "@site/static/img/Homepage/WAD-1.png";
import WAD2 from "@site/static/img/Homepage/NewWAD-2.png";
import WAD3 from "@site/static/img/Homepage/WAD-3.png";
import Sup1 from "@site/static/img/Homepage/sup-1-jira.png";
import Sup2 from "@site/static/img/Homepage/sup-2-tapd.svg";
import Sup3 from "@site/static/img/Homepage/sup-3-github.svg";
import Sup4 from "@site/static/img/Homepage/sup-4-gitlab.svg";
import Sup5 from "@site/static/img/Homepage/sup-5-bitbucket.svg";
import Sup6 from "@site/static/img/Homepage/sup-6-gitee.svg";
import Sup7 from "@site/static/img/Homepage/sup-7-jenkins.svg";
import Sup8 from "@site/static/img/Homepage/sup-8-ghaction.svg";
import Sup9 from "@site/static/img/Homepage/sup-9-glci.svg";
import SupA from "@site/static/img/Homepage/sup-A-feishu.png";

function Feature({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex w-full sm:justify-between mobile:justify-between items-center
      h-[488px] mobile:h-[auto] sm:h-[auto] relative
      space-x-5
      flex-col ${className}`}
    >
      {children}
    </div>
  );
}

function Supports() {
  return (
    <div
      className=" flex flex-col items-center
      mt-[48px] mb-[72px]
      sm:mt-[36px] sm:mb-[60px]
      mobile:mt-4 mobile:mb-6
    "
    >
      <C.H3Title>Supported Data Sources</C.H3Title>
      <div
        className="grid grid-cols-5 gap-x-[24px] gap-y-[16px]
        sm:gap-x-1"
      >
        <C.Sup title="Jira">
          <a href="https://devlake.apache.org/docs/Plugins/jira">
            <C.SupImg src={Sup1} />
          </a>
        </C.Sup>
        <C.Sup title="TAPD">
          <a href="https://devlake.apache.org/docs/Plugins/tapd">
            <Sup2 className="sm:w-[48px] sm:h-[48px]" />
          </a>
        </C.Sup>
        <C.Sup title="GitHub">
          <a href="https://devlake.apache.org/docs/Plugins/github">
            <Sup3 className="sm:w-[48px] sm:h-[48px]" />
          </a>
        </C.Sup>
        <C.Sup title="GitLab">
          <a href="https://devlake.apache.org/docs/Plugins/gitlab">
            <Sup4 className="sm:w-[48px] sm:h-[48px]" />
          </a>
        </C.Sup>
        <C.Sup title="BitBucket">
          <a href="https://devlake.apache.org/docs/Plugins/bitbucket">
            <Sup5 className="sm:w-[48px] sm:h-[48px]" />
          </a>
        </C.Sup>
        <C.Sup title="Gitee">
          <a href="https://devlake.apache.org/docs/Plugins/gitee">
            <Sup6 className="sm:w-[48px] sm:h-[48px]" />
          </a>
        </C.Sup>
        <C.Sup title="Jenkins">
          <a href="https://devlake.apache.org/docs/Plugins/jenkins">
            <Sup7 className="sm:w-[48px] sm:h-[48px]" />
          </a>
        </C.Sup>
        <C.Sup title="GitHub Action">
          <a href="https://devlake.apache.org/docs/Plugins/github">
            <Sup8 className="sm:w-[48px] sm:h-[48px]" />
          </a>
        </C.Sup>
        <C.Sup title="GitLab CI">
          <a href="https://devlake.apache.org/docs/Plugins/gitlab">
            <Sup9 className="sm:w-[48px] sm:h-[48px]" />
          </a>
        </C.Sup>
        <C.Sup title="Feishu">
          <a href="https://devlake.apache.org/docs/Plugins/feishu">
            <C.SupImg src={SupA} />
          </a>
        </C.Sup>
      </div>
      <div
        className="text-label18 font-inter text-neutral-500 mt-6
        sm:text-label16 sm:mt-4"
      >
        <C.InlineLink link="https://devlake.apache.org/docs/Overview/Roadmap">
          More data sources
        </C.InlineLink>{" "}
        coming soon...
      </div>
    </div>
  );
}

export function WhyDevlake() {
  return (
    <section
      className="
    flex flex-col flex-nowrap 
    py-5 items-stretch
    mt-[80px] mobile:mt-[0px] sm:mt-[70px]
    sm:py-[0px]"
    >
      <span className="section-title text-center">Why Apache DevLake</span>
      <div
        className="
        flex flex-row mobile:flex-col sm:flex-col
        justify-center
        mb-[72px] 
        sm:px-[0px] sm:space-y-[36px] sm:mb-[36px]
        mobile:mb-4 mobile:space-y-4
        "
      >
        <Feature>
          <C.SectionImg src={WAD1} />
          <C.TextSection>
            <C.TextTitle>Defragment Your Data Silos</C.TextTitle>
            <C.TextDescription>
              Your Dev Data lives in many silos and tools. DevLake brings them
              all together to give you a complete view of your Software
              Development Life Cycle (SDLC).
              <br />
              <C.TextLink link="https://devlake.apache.org/docs/Overview/SupportedDataSources">
                Explore supported data sources
              </C.TextLink>
            </C.TextDescription>
          </C.TextSection>
        </Feature>
        <Feature>
          <C.SectionImg src={WAD2} />
          <C.TextSection>
            <C.TextTitle>Out-of-the-Box Analysis</C.TextTitle>
            <C.TextDescription>
              From DORA to scrum retros, DevLake implements metrics effortlessly
              with prebuilt dashboards supporting common frameworks and goals.
              <br />
              <C.TextLink link="https://devlake.apache.org/livedemo/EngineeringLeads/DORA">
                See Live Demo
              </C.TextLink>
            </C.TextDescription>
          </C.TextSection>
        </Feature>
        <Feature>
          <C.SectionImg src={WAD3} />
          <C.TextSection>
            <C.TextTitle>Flexible. Extensible. Adaptable.</C.TextTitle>
            {/* FIXME: A weird margin right happend here, didn't find solution yet */}
            <C.TextDescription>
              DevLake fits teams of all shapes and sizes, and can be readily
              extended to support new data sources, metrics, and dashboards,
              with a flexible framework for data collection and transformation.
              <br className="mobile:hidden" />
              <C.TextLink link="https://devlake.apache.org/docs/DataModels/DevLakeDomainLayerSchema">
                Learn about DevLake’s data model
              </C.TextLink>
            </C.TextDescription>
          </C.TextSection>
        </Feature>
      </div>
      <C.BreakLine />
      <Supports />
    </section>
  );
}
