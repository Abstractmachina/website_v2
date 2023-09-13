"use client";

import {
	useArchIndexScrollY,
	useArchPreviewPosition, useArchPreviewVisibility, useArchTrackpointAnimateable } from "@/stores/archStore";
import { isBrowser } from "@/libs/util";
import { IPosition } from "@/types/IPosition";
import { motion } from "framer-motion";
import React, { FC, ReactElement, useState, useEffect } from "react";
import useMousePosition from "@/hooks/useMousePosition";

// type TrackpointProps = {
// 	pos: IPosition;
// };

const Trackpoint = () => {
	// state
	const previewIsVisible = useArchPreviewVisibility();
	const previewPostion = useArchPreviewPosition();
	const isAnimateable = useArchTrackpointAnimateable();
	const scrollY = useArchIndexScrollY();

	
	// sizes in rem
	const expandedSize: number = 6;
	const collapsedSize: number = 1;

	const [baseFontSize, setBaseFontSize] = useState<number>(16);
	const [yShift, setYShift] = useState(0);

	const mousePos = useMousePosition();

	useEffect(() => {
		let rootFontSize = "unset";
		if (isBrowser()) rootFontSize = window.getComputedStyle(document.body).getPropertyValue("font-size");
		if (rootFontSize == "unset") rootFontSize = "16px";
		setBaseFontSize(parseInt(rootFontSize, 10));
	}, []);

	useEffect(() => {
		setYShift(calcYShift());
	}, [previewIsVisible]);

	const calcYShift = (): number => {
		const remMultiplier = previewIsVisible ? expandedSize : collapsedSize;
		return (baseFontSize * remMultiplier) / 2;
    };
    
    const calcUnderlineWidth = (): number => {
        const centerX = isBrowser() ? window.innerWidth / 2 : 0;
        const left = previewPostion.x;

        return centerX + yShift - left;
	}
	
	function getFinalYPos() {


		return previewIsVisible ?
			(previewPostion.y - baseFontSize * 3 - scrollY) :
			(mousePos.y? mousePos.y : 0 - yShift);
	}

	return (
		<motion.div
			id="trackpoint"
			className="fixed w-4 h-4 rounded-full inset-x-0 inset-y-0 mx-auto z-10 flex items-center overflow-visible justify-end"
			style={{
				backgroundColor: "#171717",
			}}
			initial={{
				y: isBrowser() ? window.innerHeight / 2 : 0,
			}}
			animate={{
				y: isAnimateable ? getFinalYPos() : window.innerHeight / 2,
				height: previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`,
				width: previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`,
			}}
            transition={{ type: "tween", duration: 0.1 }}
        >
			{/* underline */}
			{isAnimateable &&
			<motion.div
				className=" h-[1px] bg-white absolute mt-1 opacity-0"
                style={{
					width: 10,
				}}
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,

                    width: previewIsVisible ? calcUnderlineWidth() : 10,
                    paddingRight: previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`
                }}
                transition={{ type: "tween", duration: 0.3 }}

                
				></motion.div>
			}
			
		</motion.div>
	);
};

export default Trackpoint;
