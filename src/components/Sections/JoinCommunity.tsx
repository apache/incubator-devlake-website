import React from "react";

import Join from "@site/static/img/Homepage/Join.png";

import { InlineLink } from "./Components";

export function JoinCommunity() {
  return (<div className="flex justify-between mobile:flex-col-reverse
    my-[72px] rounded-[20px] bg-primary-200 px-6 py-[36px] font-inter
    mobile:mx-5 mobile:my-6 mobile:px-3 mobile:py-4">
    <div className="w-[600px] pr-3
    mobile:w-auto">
      <div className="text-heading1 mb-3 text-primary-800 font-semibold
        mobile:text-heading2 mobile:text-primary-500">Join the Community</div>
      <div className="text-label18 mb-4 text-neutral-500
        mobile:text-label14 mobile:mb-3">Join our community to stay up to date on the latest news, ask and answer questions, make contributions, and connect with fellow community members!</div>
      <div className="text-label16 space-y-[8px] flex flex-col">
        <InlineLink link="https://join.slack.com/t/devlake-io/shared_invite/zt-17b6vuvps-x98pqseoUagM7EAmKC82xQ">Join Slack</InlineLink>
        <InlineLink link="https://devlake.apache.org/community/subscribe">Subscribe to Mailing List</InlineLink>
      </div>
    </div>
    <img src={Join} alt='' className="w-[216px] h-[200px] mobile:mx-auto mobile:mb-4" />
  </div>)
}