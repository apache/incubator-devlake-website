import React from "react";
import ArrowRight from "@site/static/img/Homepage/arrow-right.svg";

export const TextTitle = ({ children }: { children: React.ReactNode }) =>
  <span className="block font-inter
    text-heading2 text-primary-800 font-semibold mb-[16px]
    mobile:text-heading4 mobile:text-neutral-600 mobile:mb-2 mobile:mt-5">
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
    mobile:w-[260px] mobile:text-label14">
    {children}
  </div>

export const TextLink = ({ link, children }: { link: string, children: React.ReactNode }) =>
  <a className="text-label16 text-secondary-500 flex items-center mt-[16px]
    mobile:hidden"
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
  mobile:w-[160px] mobile:h-[124px]
" />

export const InlineLink = ({ link, children }: { link: string, children: React.ReactNode }) =>
  <a className="text-primary-500"
    href={link}>{children}
  </a>

export const BreakLine = () => <div className="
  h-[2px] bg-neutral-100 mobile:hidden
  " />

export const Sup = ({ children, title }: { children: React.ReactNode, title: string }) =>
  <span className="w-[100px] flex flex-col items-center">
    {children}
    <span className="font-inter text-label14 
      flex items-center h-[24px]
    ">{title}</span>
  </span>
export const SupImg = ({ src }: { src: string }) =>
  <img src={src} className='
    w-[80px] h-[80px]
  '/>