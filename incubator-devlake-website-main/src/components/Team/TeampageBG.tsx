import React from "react";
import HeaderBGWS from "@site/static/img/Team/HeaderBG-ws.png";
import HeaderBGTablet from "@site/static/img/Team/HeaderBG-tablet.png";
import HeaderBGMobile from "@site/static/img/Team/HeaderBG-mobile.png";
import BottomBGWS from '@site/static/img/Team/BottomBG-ws.png';
import BottomBGTablet from '@site/static/img/Team/BottomBG-tablet.png';
import BottomBGMobile from '@site/static/img/Team/BottomBG-mobile.png';

export function TeampageHeaderBG() {
  return (
    <div>
      <>
        <img
          src={HeaderBGWS}
          className="
          absolute top-[0px] left-[0px] 
          h-[580px] w-screen 
          block sm:hidden
        "
        />
        <img
          src={HeaderBGTablet}
          className="
          absolute top-[0px] left-[0px] 
          h-[438px] w-screen 
          hidden sm:block mobile:hidden
       "
        />
        <img
          src={HeaderBGMobile}
          className="
          absolute top-[0px] left-[0px] 
          h-[456px] w-screen 
          hidden mobile:block
       "
        />
      </>
    </div>
  );
}

export function TeampageBottomBG() {
  return (
    <div>
      <img
          src={BottomBGWS}
          className="
          absolute top-[-125px] left-[-15vw] 
          h-[1205px] min-w-[100vw]
          block sm:hidden
        "
        />
        <img
          src={BottomBGTablet}
          className="
          absolute top-[-95px] left-[-15vw] 
          h-[1663px] min-w-[100vw]
          hidden sm:block mobile:hidden
       "
        />
        <img
          src={BottomBGMobile}
          className="
          absolute top-[-31px] left-[-5vw] 
          h-[1768px] min-w-[100vw] 
          hidden mobile:block
       "
        />
    </div>
  )
}
