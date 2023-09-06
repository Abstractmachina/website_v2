"use client";

import { map } from "@/libs/util";
import { motion } from "framer-motion";
import React, { useState } from "react";

function MouseDial() {
	const isBrowser = typeof window !== "undefined";
	const centerX = Math.round(isBrowser ? window.innerWidth / 2 : 0);
	const centerY = Math.round(isBrowser ? window.innerHeight / 2 : 0);
	const lineWidthThreshold = 150;
	const rotationThreshold = 200;
	const [x, setX] = useState(centerX);
	const [y, setY] = useState(Math.round(centerY));

	const handleMouse = (e: React.MouseEvent<HTMLImageElement>): void => {
		setX(e.pageX);
		setY(e.pageY);
		console.log(distanceToCenter_signed());
	};

	const distanceToCenter_signed = (): number => {
		return x - centerX;
	};

	const translateRotation = (): number => {
		if (Math.abs(distanceToCenter_signed()) < rotationThreshold) return 0;

		const val = map(Math.abs(distanceToCenter_signed()), rotationThreshold, centerX, 0, 100);
		const sign = distanceToCenter_signed() / Math.abs(distanceToCenter_signed());
		// angle caps at 90
		return val > 90 || val < -90 ? 90 * sign : val * sign;
	};

	const translateWidth = (): number => {
		const dist_unsigned = Math.abs(distanceToCenter_signed());
		if (dist_unsigned < lineWidthThreshold) return 0;
		return map(Math.abs(distanceToCenter_signed()), lineWidthThreshold, rotationThreshold, 0, window.innerWidth + 100);
	};

	const translateX = (): number => {
		return (x - centerX) * 0.3;
	};

	const bannerTopMotion = () => {
		const u_dist = distanceToCenter_signed();
		const opacity = map(Math.abs(u_dist), 0, centerX, 0, 1.0);
		return {
			opacity,
		};
	};

	return (
		<div onMouseMove={handleMouse} className="flex fixed min-w-full min-h-full top-0 left-0 justify-center items-center">
			<motion.div style={bannerTopMotion()}>
				<h1 className="font-monolisk text-yellow-300 text-8xl fixed top-32">Architecture</h1>
			</motion.div>

			{/* center circle */}
			<div className="fixed w-4 h-4 bg-black rounded-full"></div>
			{/* Hi Im Tao */}
			<motion.div
				className="fixed top-1/3"
				style={{
					x: translateX(),
				}}
			>
				<h1 className=" font-inter">Hi, I&rsquo;m Tao</h1>
			</motion.div>
			{/* center line */}
			<motion.div
				className="h-px fixed bg-black"
				style={{
					rotateZ: translateRotation(),
					width: translateWidth(),
				}}
			></motion.div>
			{/* tag line */}
			<motion.div
				className="fixed bottom-1/3"
				style={{
					x: translateX() * -1,
				}}
			>
				<p>a computational architect and fullstack developer</p>
			</motion.div>
		</div>
	);
}

export default MouseDial;
