import React from "react";
import ArrowRight from "@site/static/img/Homepage/arrow-right.svg";

export const TextTitle = ({ children }: { children: React.ReactNode }) =>
  <span className="block font-inter
    text-heading2 text-primary-800 font-semibold mb-[16px]">
    {children}
  </span>

export const TextDescription = ({ children }: { children: React.ReactNode }) =>
  <p className="font-inter pr-[20px]
    text-label18 text-neutral-500 ">
    {children}
  </p>

export const TextLink = ({ link, children }: { link: string, children: React.ReactNode }) =>
  <a className="text-label16 text-secondary-500 flex items-center mt-[16px]"
    href={link}>{children}
    <ArrowRight width={20} height={20} />
  </a>

export const TextSection = ({ children }: { children: React.ReactNode }) =>
  <div
    className="
      text-start w-[448px]
    ">
    {children}
  </div>

export const SvgImg = ({ svg: Svg }: { svg: React.ComponentType<React.SVGProps<SVGSVGElement>> }) =>
  <div
    className="
      w-auto h-auto
      "
  >
    <Svg role="img" />
  </div>