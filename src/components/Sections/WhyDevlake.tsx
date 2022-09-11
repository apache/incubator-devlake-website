import React from "react";
import * as C from "./Components";
import WAD1 from "@site/static/img/Homepage/WAD-1.svg";
import WAD2 from "@site/static/img/Homepage/WAD-2.svg";
import WAD3 from "@site/static/img/Homepage/WAD-3.svg";

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full justify-between items-center space-y-7">
      {children}
    </div>
  );
}

export function WhyDevlake() {
  return (<section className="bg-white flex flex-col flex-nowrap py-5 items-stretch">
    <span
      className="section-title text-center"
    >
      Why Apache DevLake (Incubating)
    </span>
    <div
      className="
        flex flex-col
        px-[140px]
        space-y-5
        ">
      <Feature>
        <C.SvgImg svg={WAD1} />
        <C.TextSection>
          <C.TextTitle>Data Silos Connected</C.TextTitle>
          <C.TextDescription>
            Collect DevOps data from tools across the entire Software Development Life Cycle (SDLC) and connect siloed data with a standard data model.
            <br />
            <C.TextLink link="https://devlake.apache.org/docs/DataSupport">Explore supported data sources</C.TextLink>
          </C.TextDescription>
        </C.TextSection>
      </Feature>
      <Feature>
        <C.TextSection>
          <C.TextTitle>Out-of-the-box Analysis</C.TextTitle>
          <C.TextDescription>
            Visualize out-of-the-box engineering metrics in a series of use-case driven dashboards.
            <br />
            <C.TextLink link="https://devlake.apache.org/docs/LiveDemo">Interact with pre-built dashboards</C.TextLink>
          </C.TextDescription>
        </C.TextSection>
        <C.SvgImg svg={WAD2} />
      </Feature>
      <Feature>
        <C.SvgImg svg={WAD3} />
        <C.TextSection>
          <C.TextTitle>A Highly Flexible Framework</C.TextTitle>
          <C.TextDescription>
            Easily extend DevLake to support your data sources, metrics, and dashboards with a flexible framework for data collection and transformation.
            <br />
            <C.TextLink link="https://devlake.apache.org/docs/DataModels/DevLakeDomainLayerSchema">Learn about DevLake’s data model</C.TextLink>
          </C.TextDescription>
        </C.TextSection>
      </Feature>
    </div>
  </section>)
}

