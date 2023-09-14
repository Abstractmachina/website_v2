"use client";

import { map } from "@/libs/util";
import { useGlobalActions, useGlobalCurrentPage } from "@/stores/globalStore";
import { Page } from "@/types/enum_page";
import { motion, useAnimate } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import globalConfigs from "@/GLOBAL.config";
import useMousePosition from "@/hooks/useMousePosition";
import { useHomeCenterCoordinate } from "@/stores/homeStore";
import { distance } from "@/libs/geometry";

enum AnimationState {
	START,
	END,
	ONMOUSEMOVE
}

function MouseDial() {
	// state
	const centerCoord = useHomeCenterCoordinate();

	const mousePos = useMousePosition();
	const [scope, animate] = useAnimate();
	const [animationState, setAnimationState] = useState(AnimationState.START);



	// settings
	const lineWidthThreshold = 150;
	const rotationThreshold = 200;

	function translateRotation(): number {
		const dist = distance(mousePos, centerCoord).x!;
		const u_dist = Math.abs(dist);
		if (u_dist < rotationThreshold) return 0;

		const val = map(u_dist, rotationThreshold, centerCoord.x!, 0, 100);
		const sign = dist / u_dist;
		// angle caps at 90
		return val > 90 || val < -90 ? 90 * sign : val * sign;
	};

	function translateWidth(): number {
		const u_dist = distance(mousePos, centerCoord, false).x!;
		if (u_dist < lineWidthThreshold) return 0;
		return map(u_dist, lineWidthThreshold, rotationThreshold, 0, window.innerWidth + 100);
	};

	const variants = {
		start: { rotateZ: 0, width: 0 },
		end: { rotateZ: -90, width: 4000 },
		mouseTrackable: {
			rotateZ: translateRotation(),
			width: translateWidth()
		}
	  }

	return (
		<div className="">

			{/* center circle */}
			<div className="fixed w-4 h-4 bg-black rounded-full"
				style={{
					width: globalConfigs.trackpoint_defaultSize,
					height: globalConfigs.trackpoint_defaultSize,
				}}
				
			></div>
			{/* _______________	center line ________________________ */}
			<motion.div id="centerline" className="h-[1px] fixed bg-black"
				animate={
					variants.mouseTrackable
				}
				></motion.div>
		</div>
	);
}

export default MouseDial;
