"use client";

import globalConfigs from "@/GLOBAL.config";
import Footer from "@/components/Footer";
import HomeCenterLine from "@/components/HomeCenterLine";
import { distance } from "@/libs/geometry";
import { isBrowser, map } from "@/libs/util";
import { useGlobalActions, useGlobalCurrentPage } from "@/stores/globalStore";
import { useHomeActions, useHomeCenterCoordinate } from "@/stores/homeStore";
import { IVec2d } from "@/types/IVec2d";
import { Page } from "@/types/enum_page";
import { motion, useAnimate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

export default function Home() {
	// state
	// GLOBAL STORE
	const currentPage = useGlobalCurrentPage();
	const { setCurrentPage } = useGlobalActions();
	const [mouseAnimateable, setMouseAnimateable] = useState(false);
	// HOME STORE
	const { setCenterCoord } = useHomeActions();
	const centerCoord = useHomeCenterCoordinate();

	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	function handleWindowSizeChange() {
		const centerX = Math.round(isBrowser() ? window.innerWidth / 2 : 0);
		const centerY = Math.round(isBrowser() ? window.innerHeight / 2 : 0);
		setCenterCoord(centerX, centerY);
	}

	const router = useRouter();
	const [scope, animate] = useAnimate();
	const centerX = Math.round(isBrowser() ? window.innerWidth / 2 : 0);
	const centerY = Math.round(isBrowser() ? window.innerHeight / 2 : 0);

	const exitAnimationDuration = 0.2;

	const [x, setX] = useState(centerX);
	const [y, setY] = useState(Math.round(centerY));
	const [mousePos, setMousePos] = useState<IVec2d>({ x: 0, y: 0 });

	// styles

	const style_centerLineEnd = {
		rotateZ: -90,
		width: centerX * 4,
	};
	const style_centerLineStart = {
		rotateZ: 0,
		width: 2,
	};

	// attach event listener to window when component is mounted
	useEffect(() => {
		// set up when coming from arch projects
		if (currentPage == Page.ARCH) {
			const doEntryAnimations = async () => {
				const centerline = document.getElementById("centerline");
				await animate("#centerline", { rotateZ: -90, width: centerX * 4 }, { duration: 0, ease: "linear" });
				await animate("#centerline", { rotateZ: 0, width: 2 }, { duration: 0.2, ease: "easeOut" });

				console.log(centerline);
			};

			doEntryAnimations();
			setCurrentPage(Page.HOME);
		}
		if (isBrowser()) {
			window.addEventListener("mousemove", handleMouse);
		}
	}, []);

	// _______________  EVENTS  __________________________

	const handleMouse = (e: MouseEvent): void => {
		setX(e.pageX);
		setY(e.pageY);
		setMousePos({ x: e.pageX, y: e.pageY });
	};

	const translateX = (): number => {
		return (x - centerX) * 0.3;
	};

	const bannerTopMotion = () => {
		const dist = distance(centerCoord, mousePos).x!;
		const u_dist = distance(mousePos, centerCoord, false).x!;
		let opacity: number = dist > 0 ? 0 : map(u_dist, 0, centerX, 0, 1.0);
		if (isNaN(opacity)) opacity = 0;
		const xPos = dist! * 0.9 + 200;
		return {
			opacity,
			x: xPos,
		};
	};
	const bannerBottomMotion = () => {
		const dist = distance(centerCoord, mousePos).x!;
		const u_dist = distance(mousePos, centerCoord, false).x!;
		let opacity = dist < 0 ? 0 : map(u_dist, 0, centerX, 0, 1.0);
		if (isNaN(opacity)) opacity = 0;

		const xPos = dist * 0.9 - 600;
		return {
			opacity,
			x: xPos,
		};
	};

	const archLinkMotion = () => {
		// let dist = distance(mousePos, centerCoord).x!;
		// try {
		// let dist = distance(mousePos, centerCoord).x!;
		// }
		// let opacity = map(dist, 0, -centerX, 0, 1.0);
		// if (isNaN(opacity)) opacity = 0;
		return {
			opacity: 1,
		};
	};

	const exitPageToArchprojects = async () => {
		await Promise.all([animate("#centerline", { rotateZ: -90, width: centerX * 4 }, { duration: exitAnimationDuration, ease: "linear" }), animate("#myName", { x: -2000 }, { duration: exitAnimationDuration, ease: "linear" }), animate("#tagline", { x: 2000 }, { duration: exitAnimationDuration, ease: "linear" }), animate("#banner_arch", { x: -2000 }, { duration: exitAnimationDuration, ease: "linear" })]);
		router.push("/architecture");
	};

	const enterPageFromArchProjects = async () => {};

	return (
		<main className="fixed min-h-full min-w-full top-0 left-0" ref={scope}>
			
			<div className="bg-blue-500 h-[2px] w-[2px] fixed z-50"
				style={{
					top: centerCoord.y!,
					left: centerCoord.x!
			}}></div>
			
			{/* ________	link element to architecture projects page	________ */}
			<motion.div id="link_arch" className="fixed top-0 left-0 h-full w-10 z-10 hover:cursor-pointer"
				style={{ backgroundColor: globalConfigs.color_accent }}
				onClick={exitPageToArchprojects} >
			</motion.div>

			{/* Arch Banner */}
			<motion.div id="banner_arch" style={bannerTopMotion()}>
				<h1 className="font-monolisk text-yellow-300 text-9xl fixed bottom-48 ">Architecture</h1>
			</motion.div>
			<motion.div style={bannerBottomMotion()}>
				<h1 className="font-monolisk text-yellow-300 text-9xl fixed bottom-48 ">Software Development</h1>
			</motion.div>

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

			<HomeCenterLine />

			{/* _______________	tag line 	________________________*/}
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
		</main>
	);
}
