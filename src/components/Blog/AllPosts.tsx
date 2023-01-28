import React from "react";
import BlogInfo from "/info/Blog/AllPosts.json";
import { BlogpageBottomBG } from './BlogpageBG';
import { BlogInfoType } from "./types";
import dateFormatter from "./utils";


const ListItem = (props: { cardInfo: BlogInfoType }) => {
  const { cardInfo } = props;
  return (
    <div
      className="
        flex flex-row-reverse mobile:flex-col-reverse
        pb-[32px] mobile:pb-[24px]
        border-neutral-100 border-[0] border-b-[2px] border-solid
    "
    >
      <a href={cardInfo.detailLink}>
        <img
          src={require(`/static/img/Blog/${cardInfo.coverTitle}.png`).default}
          className="
        m-[auto] ml-[88px] sm:ml-[24px] mobile:ml-[0] mobile:mt-4
        w-[400px] sm:w-[310px] mobile:w-[100%] 
        h-[225px] sm:h-[174px] mobile:h-[45.88vw] 
        bg-primary-300 rounded-[16px]"
        />
      </a>
      <div
        className="
        flex flex-1 flex-col
        "
      >
        <a href={cardInfo.detailLink} className="hover:no-underline">
          <p
            className="
          text-primary-800 text-heading2 sm:text-heading4 font-semibold
          line-clamp-2 m-[0] max-h-[60px] sm:max-h-[40px]"
          >
            {cardInfo.title}
          </p>
        </a>
        <div
          className="
        text-neutral-300 text-label14Lake my-3
        "
        >
          {`${dateFormatter(cardInfo.publishTime)} · ${cardInfo.readTime}`}
        </div>
        <p
          className="
          text-neutral-500 text-label18 sm:text-label16Lake
          line-clamp-4 m-[0]
          "
        >
          {cardInfo.summary}
        </p>
        <div className="mt-3 h-[50px] flex items-center">
          <img
            src={cardInfo.authorImgUrl}
            className="w-[50px] h-[50px] mr-3 rounded-full bg-primary-500 shrink-0 uppercase flex justify-center items-center overflow-hidden text-white"
          />
          <span className="text-primary-800 text-heading4 font-semibold">
            {cardInfo.authorName}
          </span>
        </div>
      </div>
    </div>
  );
};

export function AllPosts() {
  return (
    <div className="relative">
      <BlogpageBottomBG />
    <div
      className="
    relative z-10
    pt-[72px] pb-[80px] sm:pt-5 sm:pb-[60px]  mobile:pt-4 
    "
    >
      <h2
        className="
        text-primary-800 text-heading1 sm:text-heading3 font-semibold
        "
      >
        All Posts
      </h2>
      <div
        className="
      flex flex-col 
      mt-[65px] sm:mt-[32px] mobile:mt-[24px]
      gap-5 mobile:gap-4
      "
      >
        {BlogInfo.data.map((card: BlogInfoType) => (
          <ListItem cardInfo={card} key={card.title} />
        ))}
      </div>
    </div>
    </div>
  );
}
