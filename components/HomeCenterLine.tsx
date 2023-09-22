"use client";

import { getRootFontSize, isBrowser, map } from "@/libs/util";
import { useGlobalActions, useGlobalCenterCoordinate, useGlobalClientSize, useGlobalCurrentPage } from "@/stores/globalStore";
import { Page } from "@/types/enum_page";
import {  motion, useAnimate } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import globalConfigs from "@/GLOBAL.config";
import useMousePosition from "@/hooks/useMousePosition";
import { useHomeCenterCoordinate } from "@/stores/homeStore";
import { distance } from "@/libs/geometry";
import { IVec2d } from "@/types/IVec2d";

enum AnimationState {
	START,
	END,
	ONMOUSEMOVE,
}

function HomeCenterLine() {
	// state
	const centerCoord = useGlobalCenterCoordinate();

	//globalstore
	const clientSize : IVec2d = useGlobalClientSize();

	const mousePos = useMousePosition();
	const [scope, animate] = useAnimate();
	const [animationState, setAnimationState] = useState(AnimationState.START);
	// settings
	const lineWidthThreshold = 100;
	const [rotationStart, setRotationStart] = useState<number>(0);
	const [rotationEnd, setRotationEnd] = useState<number>(0);


	useEffect(() => {
		// init rotation thresholds
		setRotationStart((clientSize.x! / 2) / 3);
		setRotationEnd((clientSize.x! / 2));
	}, [])

	useEffect(() => {
		setRotationStart((clientSize.x! / 2) / 3);
		setRotationEnd((clientSize.x! / 2));
	}, [clientSize])
	

	const translateRotation = (): number => {
		const dist = distance(centerCoord, mousePos).x!;
		const u_dist = Math.abs(dist);
		if (u_dist < rotationStart ) return 0;

		const val = map(u_dist, rotationStart, rotationEnd, 0, 90);
		const sign = dist / u_dist;
		// angle caps at 90
		return val > 90 || val < -90 ? 90 * sign : val * sign;
	};

	const translateWidth = (): number => {
		const u_dist = distance(mousePos, centerCoord, false).x!;
		if (u_dist < lineWidthThreshold) return 0;
		return map(u_dist, lineWidthThreshold, rotationStart, 0, window.innerWidth + 100);
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
				className="h-[0.5px] absolute bg-red-500 z-20 border-none"
				animate='mouseTrackable'
				variants={variants}
			></motion.div>
		</div>
	);
}

export default HomeCenterLine;
