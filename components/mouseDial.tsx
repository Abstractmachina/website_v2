"use client";

import { map } from "@/libs/util";
import { motion, useAnimate } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function MouseDial() {
	const router = useRouter();
	const [scope, animate] = useAnimate();
	const isBrowser = typeof window !== "undefined";
	const centerX = Math.round(isBrowser ? window.innerWidth / 2 : 0);
	const centerY = Math.round(isBrowser ? window.innerHeight / 2 : 0);
	const lineWidthThreshold = 150;
	const rotationThreshold = 200;

	const exitAnimationDuration = 0.2;

	const [x, setX] = useState(centerX);
	const [y, setY] = useState(Math.round(centerY));

	// attach event listener to window when component is mounted
	useEffect(() => {
		if (isBrowser) {
			window.addEventListener("mousemove", handleMouse);
		}
	}, []);

	const handleMouse = (e: MouseEvent): void => {
		setX(e.pageX);
		setY(e.pageY);
	};

	const distanceToCenter = (unsigned: boolean): number => {
		let dist = x - centerX;
		return unsigned ? Math.abs(dist) : dist;
	};

	const translateRotation = (): number => {
		const dist = distanceToCenter(false);
		const u_dist = Math.abs(dist);
		if (u_dist < rotationThreshold) return 0;

		const val = map(u_dist, rotationThreshold, centerX, 0, 100);
		const sign = dist / u_dist;
		// angle caps at 90
		return val > 90 || val < -90 ? 90 * sign : val * sign;
	};

	const translateWidth = (): number => {
		const u_dist = distanceToCenter(true);
		if (u_dist < lineWidthThreshold) return 0;
		return map(u_dist, lineWidthThreshold, rotationThreshold, 0, window.innerWidth + 100);
	};

	const centerLineMotion = () => {
		return {
			rotateZ: translateRotation(),
			width: translateWidth(),
		};
	};

	const translateX = (): number => {
		return (x - centerX) * 0.3;
	};

	const bannerTopMotion = () => {
		const dist = distanceToCenter(false);
		const u_dist = distanceToCenter(true);
		const opacity = dist > 0 ? 0 : map(u_dist, 0, centerX, 0, 1.0);
		const xPos = dist * 0.9 + 200;
		return {
			opacity,
			x: xPos,
		};
	};
	const bannerBottomMotion = () => {
		const dist = distanceToCenter(false);
		const u_dist = distanceToCenter(true);
		const opacity = dist < 0 ? 0 : map(u_dist, 0, centerX, 0, 1.0);
		const xPos = dist * 0.9 - 600;
		return {
			opacity,
			x: xPos,
		};
	};

	const archLinkMotion = () => {
		const dist = distanceToCenter(false);
		const opacity = map(dist, 0, -centerX, 0, 1.0);
		return {
			opacity,
		};
	};

	const exitPageToArchprojects = async () => {
		await Promise.all([
			animate("#centerline", { rotateZ: -90, width: centerX * 4 }, { duration: exitAnimationDuration, ease: "linear" }),
			animate("#myName", { x: -2000 }, { duration: exitAnimationDuration, ease: "linear" }),
			animate("#tagline", { x: 2000 }, { duration: exitAnimationDuration, ease: "linear" }),
			animate("#banner_arch", { x: -2000 }, { duration: exitAnimationDuration, ease: "linear" }),
		]);
		router.push('/architecture');
	};

	return (
		<div ref={scope} className="flex fixed min-w-full min-h-full top-0 left-0 justify-center items-center">
			<motion.div key={"dial_link_arch"} style={archLinkMotion()}>
				<div id="link_arch" onClick={exitPageToArchprojects} className="fixed top-0 left-0 h-full w-1/3 bg-gradient-to-r from-yellow-200 z-10"></div>
			</motion.div>

			{/* Arch Banner */}
			<motion.div id="banner_arch" style={bannerTopMotion()}>
				<h1 className="font-monolisk text-yellow-300 text-9xl fixed bottom-48 ">Architecture</h1>
			</motion.div>
			<motion.div style={bannerBottomMotion()}>
				<h1 className="font-monolisk text-yellow-300 text-9xl fixed bottom-48 ">Software Development</h1>
			</motion.div>

			{/* center circle */}
			<div className="fixed w-4 h-4 bg-black rounded-full"></div>
			{/* Hi Im Tao */}
			<motion.div
				id="myName"
				className="fixed top-1/3"
				style={{
					x: translateX(),
				}}
			>
				<h1 className=" font-inter">Hi, I&rsquo;m Tao</h1>
			</motion.div>
			{/* center line */}
			<motion.div id="centerline" className="h-px fixed bg-black" style={centerLineMotion()}></motion.div>
			{/* tag line */}
			<motion.div
				id="tagline"
				className="fixed bottom-1/3"
				style={{
					x: translateX() * -1,
					rotateZ: 0,
				}}
			>
				<p>a computational architect and fullstack developer</p>
			</motion.div>
		</div>
	);
}

export default MouseDial;
