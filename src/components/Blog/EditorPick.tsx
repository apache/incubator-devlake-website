import React from "react";
import BlogInfo from "../../../info/Blog/EditorPickBlog.json";
import { BlogInfoType } from './types';
import dateFormatter from "./utils";
import apacheWelcomesDevLake from '../../../static/img/Blog/apache-welcomes-devLake.png';
import compatibilityOfApacheDevLakeWithPostgreSQL from '../../../static/img/Blog/compatibility-of-apache-devLake-with-postgreSQL.png';
import HowDevLakeIsUpAndRunning from '../../../static/img/Blog/How DevLake is up and running.png';

const coverImgArr = [HowDevLakeIsUpAndRunning, apacheWelcomesDevLake, compatibilityOfApacheDevLakeWithPostgreSQL];
const Card = function (props: {cardInfo: BlogInfoType, index: number}) {
  const { cardInfo, index } = props;
  return (
    <a
      href={cardInfo.detailLink}
      className="flex flex-col sm:flex-row mobile:flex-col
        w-[22.33vw] sm:max-w-[100%] sm:min-w-[100%]
        p-[16px] bg-neutral-invert
        rounded-[16px] shadow-lower  hover:shadow-high hover:no-underline "
    >
      <img
        src={coverImgArr[index]}
        className="
            w-[100%] sm:w-[43.05vw]  sm:min-w-[43.05vw] mobile:w-[100%] 
            h-[12.76vw] sm:h-[24.21vw] mobile:h-[45.88vw] 
            bg-primary-300 rounded-[16px]"
      />
      <div className="sm:ml-5 mobile:ml-[0]">
        <div className="flex h-[90px] sm:h-[60px] items-center mt-3 sm:mt-[0]  mb-3">
          <p
            className="
                text-primary-800 text-heading2 sm:text-heading4 font-semibold
                line-clamp-3 m-[0] 
                "
          >
            {cardInfo.title}
          </p>
        </div>
        <div className="
        text-neutral-300 text-label14Lake
        ">
            {`${dateFormatter(cardInfo.publishTime)} · ${cardInfo.readTime}`}
        </div>
        <div className="mt-3 h-[50px] flex items-center">
          <img src={cardInfo.authorImgUrl} className="w-[50px] h-[50px] mr-3 rounded-full bg-primary-500 shrink-0 uppercase flex justify-center items-center overflow-hidden text-white"
          />
          <span className="text-primary-800 text-heading4 font-semibold">
            {cardInfo.authorName}
          </span>
        </div>
      </div>
    </a>
  );
};

export function EditorPick() {
  return (
    <div>
      <h2
        className="
        text-primary-800 text-heading1 sm:text-heading3 font-semibold
        mt-[60px] sm:mt-[32px] mobile:mt-[20px]
        "
      >
        Editor‘s Picks
      </h2>
      <div className="
      flex sm:flex-col justify-between
      mt-[64px] sm:mt-[32px] mobile:mt-[24px]
      sm:gap-5 mobile:gap-4
      ">
        {BlogInfo.data.map((card: BlogInfoType, index:number) => (
          <Card cardInfo ={card} key={card.title} index={index}/>
        ))}
      </div>
    </div>
  );
}
