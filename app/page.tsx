"use client";

import globalConfigs from "@/GLOBAL.config";
import Footer from "@/components/Footer";
import HomeCenterLine from "@/components/HomeCenterLine";
import ShiftTranslateTextBox from "@/components/XShiftBanner";
import { distance, getWindowCenterCoordinate } from "@/libs/geometry";
import { isBrowser, map } from "@/libs/util";
import { useGlobalActions, useGlobalCenterCoordinate, useGlobalCurrentPage } from "@/stores/globalStore";
import { useHomeActions, useHomeCenterCoordinate } from "@/stores/homeStore";
import { IVec2d } from "@/types/IVec2d";
import { Alignment } from "@/types/enum_AlignmentX";
import { Direction } from "@/types/enum_direction";
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
	const { setCurrentPage, setCenterCoord } = useGlobalActions();
	const [mouseAnimateable, setMouseAnimateable] = useState(false);
	const centerCoord = useGlobalCenterCoordinate();

	useEffect(() => {
		if (!centerCoord.x || !centerCoord.y) getWindowCenterCoordinate(setCenterCoord);
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

	const exitAnimationDuration = 0.2;

	const [mousePos, setMousePos] = useState<IVec2d>({ x: 0, y: 0 });

	// styles

	const style_centerLineEnd = {
		rotateZ: -90,
		width: centerCoord.x! * 4,
	};
	const style_centerLineStart = {
		rotateZ: 0,
		width: 2,
	};

	// attach event listener to window when component is mounted
	useEffect(() => {
		// set up when coming from arch projects
		if (currentPage == Page.ARCH) {
			const entryFromArch = async () => {
				const centerline = document.getElementById("centerline");
				await animate("#centerline", { rotateZ: -90, width: centerCoord.x! * 4 }, { duration: 0, ease: "linear" });
				await animate("#centerline", { rotateZ: 0, width: 2 }, { duration: 0.2, ease: "easeOut" });

				console.log(centerline);
			};

			entryFromArch();
			setCurrentPage(Page.HOME);
		}
		if (isBrowser()) {
			window.addEventListener("mousemove", handleMouse);
		}
	}, []);

	// _______________  EVENTS  __________________________

	const handleMouse = (e: MouseEvent): void => {
		setMousePos({ x: e.pageX, y: e.pageY });
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
		await Promise.all([animate("#centerline", { rotateZ: -90, width: centerCoord.x! * 4 }, { duration: exitAnimationDuration, ease: "linear" }), animate("#myName", { x: -2000 }, { duration: exitAnimationDuration, ease: "linear" }), animate("#tagline", { x: 2000 }, { duration: exitAnimationDuration, ease: "linear" }), animate("#banner_arch", { x: -2000 }, { duration: exitAnimationDuration, ease: "linear" })]);
		router.push("/architecture");
	};

	
	function getMouseParam() : IVec2d {
		return {
			x: map(mousePos.x!, 0, isBrowser() ? window.innerWidth : 0, -1, 1 ),
			y: map(mousePos.y!, isBrowser() ? window.innerHeight : 0, 0, -1, 1)
		}
	}


	return (
		<main className="fixed min-h-full min-w-full top-0 left-0" ref={scope}>
			
			{/* <div className="bg-blue-500 h-[2px] w-[2px] fixed z-50"
				style={{
					top: centerCoord.y!,
					left: centerCoord.x!
			}}></div> */}
			
			
			<HomeCenterLine />

			{/* _____________	Hi Im Tao	_____________________ */}
			<ShiftTranslateTextBox
				id = "myName"
				text="Hi, I'm Tao"
				fontsize={3}
				anchor={centerCoord}
				offset={{ y: -200, x: -100 }}
				range={{ min: 0, max: -200 }}
				current={getMouseParam().x!}
				direction={Direction.LEFT}
			/>
			{/* _______________	tag line 	________________________*/}
			<ShiftTranslateTextBox
				id="tagline"
				text="a computational architect and fullstack developer"
				fontsize={1.2}
				anchor={centerCoord}
				offset={{ y: 150, x: -200 }}
				range={{ min: 0, max: -200 }}
				current={getMouseParam().x!}
				direction={Direction.RIGHT}
			/>

			{/* __________	Banners	____________________________________ */}
			{/* Banner architecture */}
			<motion.div id="banner_arch" className="font-monolisk text-9xl fixed"
				style={{
					top: centerCoord.y! - 350,
					left: centerCoord.x!,
					opacity: 0,
					color: globalConfigs.color_accent
				}}
				animate={{
					x: map(getMouseParam().x!, 0, -1, 0, -800),
					opacity: map(getMouseParam().x!, 0, -1, 0, 1),
				}}
				transition={{
					type: "linear",
					duration: 0.001
				}}
			>
				Architecture
			</motion.div>

			{/* banner programming */}
			<motion.div id="banner_arch" className="font-monolisk text-9xl fixed"
				style={{
					top: centerCoord.y! - 350,
					left: centerCoord.x! - 500,
					opacity: 0,
					color: globalConfigs.color_accent
				}}
				animate={{
					x: map(getMouseParam().x!, 0, 1, 0, 800),
					opacity: map(getMouseParam().x!, 0, 1, 0, 1),
				}}
				transition={{
					type: "linear",
					duration: 0.001
				}}
			>
				Programming
			</motion.div>

			{/* ________	link element to architecture projects page	________ */}
			<motion.div id="link_arch" className="fixed top-0 left-0 h-1/2 z-10 hover:cursor-pointer"
				style={{
					backgroundColor: globalConfigs.color_accent,
					width: 0
				}}
				animate={{
					width: map(getMouseParam().x!, 0, -1, 0, 100)
				}}
				transition={{
					type: "tween",
					duration: 0.01
				}}
				onClick={exitPageToArchprojects} >
			</motion.div>
		</main>
	);
}
