import React, { useState } from "react";
import downLogo from '@site/static/icon/Stroke-Down.png';
import upLogo from '@site/static/icon/Stroke-Up.png';


interface DropdownProps {
    label?: string;
    meau: string[];
    width?: string;
    height?: string;
    click?: any;
}

export function Dropdown(props: DropdownProps) {
    const { width = '146px', height = '20px', label = '默认label', meau, click } = props;
    const [visible, setVisible] = useState(false);
    return (
    <div onClick={() => setVisible(!visible)} className={`w-[${width}] h-[${height}] text-heading4 font-semibold text-primary-800 flex items-center cursor-pointer relative`}>
        <span>
            {label}
        </span>
        <div className="w-[24px] h-[24px] flex items-center justify-center">
        <img src={visible ? upLogo : downLogo}/>
        </div>
        { visible && <div className="absolute w-[188px] p-[8px] rounded-[4px] shadow-high bg-[#FFFFFF] left-0 top-5 z-20">
            {meau.map(item => (
            <div className="flex justify-center items-center h-[30px] text-heading4 hover:bg-neutral-50 text-neutral-600 font-normal" onClick={() => click && click(item)}>
                {item}
            </div>))}
        </div>}
    </div>
    )
}