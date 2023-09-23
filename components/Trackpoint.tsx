"use client";

import { useArchActions, useArchHoveredProject, useArchIndexScrollY, useArchPreviewPosition, useArchPreviewVisibility, useArchSelectedProject, useArchTrackpointAnimateable } from "@/stores/archStore";
import { getRootFontSize, isBrowser } from "@/libs/util";
import { motion } from "framer-motion";
import React, { FC, ReactElement, useState, useEffect } from "react";
import useMousePosition from "@/hooks/useMousePosition";
import { useGlobalCenterCoordinate } from "@/stores/globalStore";
import globalConfigs from "@/GLOBAL.config";
import Image from "next/image";
import IndexEntry from "@/types/IndexEntry";
import { useRouter } from "next/navigation";
import CloseProjectButton from "./Button_CloseProject";


type TrackPointProps = {
	indexEntries: IndexEntry[],
}


const Trackpoint : FC<TrackPointProps> = ({indexEntries}) :ReactElement => {
	// state
	// arch store
	const previewIsVisible = useArchPreviewVisibility();
	const previewPostion = useArchPreviewPosition();
	const isAnimateable = useArchTrackpointAnimateable();
	const selectedProject = useArchSelectedProject();
	const hoveredProject = useArchHoveredProject();
	
	const { setSelectedProject } = useArchActions();
	// global store
	const centerCoord = useGlobalCenterCoordinate();

	//local states
	const [baseFontSize, setBaseFontSize] = useState<number>(16);
	const [yShift, setYShift] = useState<number>(0);
	const [previewUrl, setPreviewUrl] = useState<string>('');
	const [mouseOverPoint, setMouseOverPoint] = useState<boolean>(false); // toggle if mouse hovers over trackpoint itself

	const mousePos = useMousePosition();


	//routing
	const router = useRouter();

	// sizes in rem
	const expandedSize: number = 6;
	const collapsedSize: number = parseInt(globalConfigs.trackpoint_defaultSize, 10);


	useEffect(() => {
		let rootFontSize = "unset";
		if (isBrowser()) rootFontSize = window.getComputedStyle(document.body).getPropertyValue("font-size");
		if (rootFontSize == "unset") rootFontSize = "16px";
		setBaseFontSize(parseInt(rootFontSize, 10));

		// animate("#trackpoint", { backgroundColor: "#ffffff" }, { duration: enterAnimationDuration, ease: "easeOut", delay: 0.2 })

	}, []);


	useEffect(() => {
		setYShift(calcYShift());

		// set preview image
		const url = indexEntries.find(entry => entry.shortCode == hoveredProject)?.preview;
		setPreviewUrl(url ? url : '');

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

	function computeBackgroundColor() {
		if (selectedProject == 'none') return globalConfigs.color_light;
		else return globalConfigs.color_dark;
	}


	// event handlers
	function handleClick() {
		setSelectedProject('none');
    	router.push('/architecture');
	}

	function handleMouseEnter() {
		if (selectedProject != 'none')
			setMouseOverPoint(true);
	 }
	
	function handleMouseLeave() {
		setMouseOverPoint(false);
	}


	const variants = {
		default: {
			backgroundColor: computeBackgroundColor(),
			top: getFinalYPos() -10,
			height: isAnimateable ? (previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`) : `${collapsedSize}rem`,
			width: isAnimateable ? (previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`) : `${collapsedSize}rem`,
		},
		hover: {
			backgroundColor: globalConfigs.color_accent,
			top: mousePos.y! - baseFontSize * 15/2,
			height: `15rem`,
			width: `15rem`,
			transition: {
				type: "tween",
				duration: 1
			}
		}
	}

	return (
		<motion.div
			id="trackpoint"
			className="fixed rounded-full inset-x-0 mx-auto z-20 flex items-center overflow-visible justify-end hover:cursor-pointer"
			style={{
				width: globalConfigs.trackpoint_defaultSize,
				height: globalConfigs.trackpoint_defaultSize,
				top: computeCenterPoint().y!,
			}}
			initial={{
				backgroundColor: globalConfigs.color_dark

			}}
			animate={mouseOverPoint ? "hover" : "default"}
			transition={{ type: "tween", duration: 0.2 }}
			variants={variants}
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>



			{/* underline */}
			{isAnimateable && (
				<motion.div
					className=" h-[1px] bg-white absolute mt-1 opacity-0"
					style={{
						width: 10,
						opacity: 0,
					}}
					animate={{
						opacity: (selectedProject == 'none' && !mouseOverPoint) ? 1 : 0,
						width: previewIsVisible ? calcUnderlineWidth() : 10,
						paddingRight: previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`,
					}}
					transition={{ type: "tween", duration: 0.2 }}
				></motion.div>
			)}

			{/* preview image */}
			{(previewIsVisible && previewUrl) && (
				<Image src={previewUrl} alt='preview image' width={150} height={150} className=" rounded-full z-10 " />
			)}

			{isAnimateable && (
				<motion.div
					className=" h-[1px] bg-white absolute mt-1 opacity-0"
					style={{
						width: 10,
						opacity: 0,
					}}
					animate={{
						opacity: selectedProject == 'none' ? 1 : 0,
						width: previewIsVisible ? calcUnderlineWidth() : 10,
						paddingRight: previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`,
					}}
					transition={{ type: "tween", duration: 0.2 }}
				></motion.div>
			)}
		</motion.div>
	);
};

export default Trackpoint;
