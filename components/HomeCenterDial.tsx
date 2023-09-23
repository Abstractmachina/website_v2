"use client";

import { getRootFontSize, isBrowser, map } from "@/libs/util";
import { useGlobalCenterCoordinate, useGlobalClientSize } from "@/stores/globalStore";
import {  motion, useAnimate } from "framer-motion";
import React, { useState, useEffect, useRef, FC, ReactElement } from "react";
import globalConfigs from "@/GLOBAL.config";
import { IVec2d } from "@/types/IVec2d";

enum AnimationState {
	START,
	END,
	ONMOUSEMOVE,
}


type HomeCenterDialProps = {
	rotateParam: number,
	widthParam: number,
}

const HomeCenterDial : FC<HomeCenterDialProps> = ({rotateParam, widthParam }) : ReactElement => {
	// state
	//globalstore
	const centerCoord = useGlobalCenterCoordinate();
	const clientSize : IVec2d = useGlobalClientSize();

	// animation
	const [scope, animate] = useAnimate();
	const [animationState, setAnimationState] = useState(AnimationState.START);




	// motion modifiers
	const translateRotation = (): number => {
		return map(rotateParam, -1, 1, -90, 90);
	};

	const translateWidth = (): number => {
		return map(Math.abs(widthParam), 0, 1, 0, clientSize.x! + clientSize.x! * 0.1);
	};
 
	const variants = {
		start: { rotateZ: 0, width: 0 },
		end: { rotateZ: -90, width: isBrowser() ? window.innerWidth * 3 : 2000 },
		mouseTrackable: {
			rotateZ: translateRotation(),
			width: translateWidth(),
			transition: {
				type: "tween",
				duration: 0.01
			}
		},
	};

	function computeCenterPoint() : IVec2d {
		const rootFontSize = getRootFontSize();
		return {
			x: centerCoord.x! - parseInt(globalConfigs.trackpoint_defaultSize, 10) * rootFontSize / 2,
			y: centerCoord.y! - parseInt(globalConfigs.trackpoint_defaultSize, 10) * rootFontSize / 2
		}
	}

	return (
		<div id="centerpoint"
			className="fixed rounded-full mx-auto z-10 overflow-visible flex items-center justify-center"
			style={{
				backgroundColor: globalConfigs.color_dark,
				width: globalConfigs.trackpoint_defaultSize,
				height: globalConfigs.trackpoint_defaultSize,
				top: computeCenterPoint().y!,
				left: computeCenterPoint().x!
			}}
		>
			{/* _______________	center line ________________________ */}
			<motion.div
				id="centerline"
				className="h-[0.5px] absolute bg-neutral-900 z-20 border-none"
				animate= {{
					rotateZ: translateRotation(),
					width: translateWidth(),
					transition: {
						type: "tween",
						duration: 0.001
					}
				}}
				variants={variants}
			></motion.div>
		</div>
	);
}

export default HomeCenterDial;
