import React from "react";
import { ContributorInfo } from './types';

const dateMapper = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sept',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
}

function dateFormatter(date) {
  const [year, month, day] = date.split('/');
  return `${dateMapper[month]} ${day}, ${year}`;
}

export function PersonCard(props: { info: ContributorInfo}) {
    const { info } = props;
    const { realName, githubId, githubLink, avatar, date } = info;
    return (
      <a
        className="py-[25px] no-underline hover:no-underline px-4 rounded-[10px] transition bg-white  shadow-lower hover:shadow-high flex items-center text-neutral-600 hover:text-primary-500"
        href={githubLink}
        target="_blank"
      >
        <img
          className="w-[100px] h-[100px] mr-4 rounded-full bg-primary-500 shrink-0 uppercase flex justify-center items-center overflow-hidden text-white"
          src={avatar}
          alt={githubId}
        />
        <div className="flex flex-col space-y-1 h-fit">
          <span className="text-heading4">{realName}</span>
          <span className="text-label12 text-neutral-500">{githubId}</span>
          { date && <span className="text-body-sm text-neutral-500">{dateFormatter(date)}</span>}
        </div>
      </a>
    );
  }
