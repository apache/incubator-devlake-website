import React from "react";
import ArrowRight from "@site/static/img/Homepage/arrow-right.svg";

export const TextTitle = ({ children }: { children: React.ReactNode }) =>
  <span className="block font-inter
    text-heading2 text-primary-800 font-semibold mb-[16px]
    mobile:text-heading4 sm:mb-2 sm:mt-5">
    {children}
  </span>

export const H3Title = ({ children }: { children: React.ReactNode }) =>
  <span className="block font-inter
    text-heading3 text-primary-800 font-semibold mb-[24px]">
    {children}
  </span>

export const TextDescription = ({ children }: { children: React.ReactNode }) =>
  <div className="font-inter pr-[20px] mobile:pr-[0]
    text-label18 text-neutral-500 
    mobile:text-label16 mobile:text-start">
    {children}
  </div>

export const TextLink = ({ link, children }: { link: string, children: React.ReactNode }) =>
  <a className="text-label16 text-secondary-500 flex items-center mt-[16px]
    mobile:justify-center hover:text-secondary-500"
    href={link}>{children}
    <ArrowRight width={20} height={20} />
  </a>

export const TextSection = ({ children }: { children: React.ReactNode }) =>
  <div className={`text-start mobile:text-center w-[448px] mobile:w-auto`}>
    {children}
  </div>

export const SvgImg = ({ svg: Svg }: { svg: React.ComponentType<React.SVGProps<SVGSVGElement>> }) =>
  <div className="
    w-auto h-auto
    " >
    <Svg role="img" />
  </div>
export const SectionImg = ({ src }: { src: string }) => <img src={src} alt="" className="
  w-[384px] h-[288px]
  mobile:w-[200px] mobile:h-[150px]
" />

export const InlineLink = ({ link, children }: { link: string, children: React.ReactNode }) =>
  <a className="text-primary-500"
    href={link}>{children}
  </a>

export const BreakLine = () => <div className="
  h-[2px] bg-neutral-100
  " />

export const Sup = ({ children, title }: { children: React.ReactNode, title: string }) =>
  <span className="w-[100px] flex flex-col items-center
    sm:w-[60px]">
    {children}
    <span className="font-inter text-label14 text-center
      flex h-[24px] text-neutral-500 mt-[4px]
      sm:text-[12px] sm:leading-[12px] sm:mt-1
    ">{title}</span>
  </span>
export const SupImg = ({ src }: { src: string }) =>
  <img src={src} className='
    w-[80px] h-[80px]
    sm:w-[48px] sm:h-[48px]
  '/>