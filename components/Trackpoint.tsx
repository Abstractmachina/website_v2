"use client";

import { useArchIndexScrollY, useArchPreviewPosition, useArchPreviewVisibility, useArchTrackpointAnimateable } from "@/stores/archStore";
import { getRootFontSize, isBrowser } from "@/libs/util";
import { IVec2d } from "@/types/IVec2d";
import { motion } from "framer-motion";
import React, { FC, ReactElement, useState, useEffect } from "react";
import useMousePosition from "@/hooks/useMousePosition";
import { useGlobalCenterCoordinate } from "@/stores/globalStore";
import globalConfigs from "@/GLOBAL.config";

// type TrackpointProps = {
// 	pos: IPosition;
// };

const Trackpoint = () => {
	// state
	// arch store
	const previewIsVisible = useArchPreviewVisibility();
	const previewPostion = useArchPreviewPosition();
	const isAnimateable = useArchTrackpointAnimateable();
	const scrollY = useArchIndexScrollY();
	// global store
	const centerCoord = useGlobalCenterCoordinate();

	// sizes in rem
	const expandedSize: number = 6;
	const collapsedSize: number = parseInt(globalConfigs.trackpoint_defaultSize, 10);

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

	function calcUnderlineWidth(): number {
		const centerX = isBrowser() ? window.innerWidth / 2 : 0;
		const left = previewPostion.x?previewPostion.x : 0;

		return centerX + yShift - left;
	};

 /**
  * Get the final Y offset of the track point considering computed diameter of it. if not animatable, returns center point of window.
  * @returns {number} computed y offset in pixels
  */
	function getFinalYPos() : number {
		if (!isAnimateable) return computeCenterPoint().y;
		else {
			console.log("trackpoint: "+ scrollY);
			return previewIsVisible ? previewPostion.y! - baseFontSize * 3 : mousePos.y ? mousePos.y : 0 - yShift;
		}
		
	}

	function computeCenterPoint() {
		const rootFontSize = getRootFontSize();
		if (previewIsVisible) {
			return {
				x: centerCoord.x! - (expandedSize* rootFontSize) / 2,
				y: centerCoord.y! - (expandedSize * rootFontSize) / 2,
			};
		} else {
			return {
				x: centerCoord.x! - (parseInt(globalConfigs.trackpoint_defaultSize, 10) * rootFontSize) / 2,
				y: centerCoord.y! - (parseInt(globalConfigs.trackpoint_defaultSize, 10) * rootFontSize) / 2,
			};
		}
	}

	return (
		<motion.div
			id="trackpoint"
			className="fixed rounded-full inset-x-0 inset-y-0 mx-auto z-10 flex items-center overflow-visible justify-end"
			style={{
				backgroundColor: "#171717",
				width: globalConfigs.trackpoint_defaultSize,
				height: globalConfigs.trackpoint_defaultSize,
				top: computeCenterPoint().y!,
				// left: computeCenterPoint().x!
			}}
			animate={{
				top: getFinalYPos(),
				// top: computeCenterPoint().y!,
				height: isAnimateable ? (previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`) : `${collapsedSize}rem`,
				width: isAnimateable ? (previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`) : `${collapsedSize}rem`,
			}}
			transition={{ type: "tween", duration: 0.1 }}
		>
			{/* underline */}
			{isAnimateable && (
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
						paddingRight: previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`,
					}}
					transition={{ type: "tween", duration: 0.3 }}
				></motion.div>
			)}
		</motion.div>
	);
};

export default Trackpoint;
