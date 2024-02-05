"use client";

import globalConfigs from "@/GLOBAL.config";
import Button_Dot from "@/components/Button_Dot";
import SweepingCircle from "@/components/SweepingCircle";
import ShiftTranslateTextBox from "@/components/XShiftBanner";
import { distance, getWindowCenterCoordinate } from "@/libs/geometry";
import { isBrowser, map } from "@/libs/util";
import { useGlobalActions, useGlobalCenterCoordinate, useGlobalClientSize, useGlobalCurrentPage } from "@/stores/globalStore";
import { useHomeActions, useHomeCenterCoordinate } from "@/stores/homeStore";
import { IVec2d } from "@/types/IVec2d";
import { Alignment } from "@/types/enum_AlignmentX";
import { Direction } from "@/types/enum_direction";
import { Page } from "@/types/enum_page";
import { motion, useAnimate, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";

export default function Home() {
	// state
	// GLOBAL STORE
	const currentPage = useGlobalCurrentPage();
	const { setCurrentPage, setCenterCoord, setClientSize } = useGlobalActions();
	const [mouseAnimateable, setMouseAnimateable] = useState(false);
	const centerCoord = useGlobalCenterCoordinate();
	const clientSize = useGlobalClientSize();

	// routing
	const router = useRouter();

	//animation
	const [scope, animate] = useAnimate();
	const exitAnimationDuration = 0.2;
	const [mousePos, setMousePos] = useState<IVec2d>({ x: 0, y: 0 });

	const textboxStart = 0.3;
	const bannerStart = 0.5;
	const linkStart = 0.8;


	// styles
	const style_centerLineEnd = {
		rotateZ: -90,
		width: centerCoord.x! * 4,
	};
	const style_centerLineStart = {
		rotateZ: 0,
		width: 2,
	};

	// on component mount
	useEffect(() => {
		// set up when coming from arch projects
		// if (currentPage == Page.ARCH) {
		// 	const entryFromArch = async () => {
		// 		const centerline = document.getElementById("centerline");
		// 		await animate("#centerline", { rotateZ: -90, width: centerCoord.x! * 4 }, { duration: 0, ease: "linear" });
		// 		await animate("#centerline", { rotateZ: 0, width: 2 }, { duration: 1, ease: "easeOut" });

		// 	};

		// 	entryFromArch();
		// 	setCurrentPage(Page.HOME);
		// 	router.prefetch("/architecture");
		// }
		// router.prefetch("/architecture");

		const introAnimation = async () => {
			const greeting = document.getElementById("greeting");
			await animate("#greeting", { top: 100 }, {duration: 2, ease: "easeIn"});
		}
		introAnimation();

		// initiate client size and center coord
		setClientSize(isBrowser() ? { x: window.innerWidth, y: window.innerHeight } : { x: 0, y: 0 });
		setCenterCoord(isBrowser() ? window.innerWidth/2 : 0, isBrowser() ? window.innerHeight/2 : 0)

		setMouseAnimateable(true);

		if (isBrowser()) {
			window.addEventListener("mousemove", handleMouse);
			window.addEventListener('resize', handleResize);
		}
		return () => {
			window.removeEventListener("mousemove", handleMouse);
			window.removeEventListener('resize', handleResize);

		  }
	}, []);

	useEffect(() => {
		let rootFontSize = "unset";
		if (isBrowser()) rootFontSize = window.getComputedStyle(document.body).getPropertyValue("font-size");
		if (rootFontSize == "unset") rootFontSize = "16px";
		// setBaseFontSize(parseInt(rootFontSize, 10));


	}, []);

	// _______________  EVENTS  __________________________

	const handleMouse = (e: MouseEvent): void => {
		setMousePos({ x: e.pageX, y: e.pageY });
	};

	//update client window size when it it resized by user
	function handleResize() {
		let width = 0;
		let height = 0;
		if (isBrowser()) {
			width = window.innerWidth;
			height = window.innerHeight;
		}
		const centerX = Math.round(width / 2);
		const centerY = Math.round(height / 2);
		setCenterCoord(centerX, centerY);
		setClientSize({ x: width, y: height });
	}

	const exitToArchprojects = async () => {
		console.log("clicked");
		setMouseAnimateable(false);
		router.push("/architecture");
		// await Promise.all([
		// 	animate("#centerline", { rotateZ: -90, width: centerCoord.x! * 4 }, { duration: exitAnimationDuration, ease: "linear" }), animate("#myName", { x: -2000 }, { duration: exitAnimationDuration, ease: "linear" }),
		// 	animate("#tagline", { x: 2000 }, { duration: exitAnimationDuration, ease: "linear" }),
		// 	animate("#banner_arch", { x: -2000 }, { duration: exitAnimationDuration, ease: "linear" })]);
		// router.push("/architecture");
	};

	async function exitToProgrammingProject() {
		setMouseAnimateable(false);
		await Promise.all([
			animate("#centerline", { rotateZ: 90, width: centerCoord.x! * 4 }, { duration: exitAnimationDuration, ease: "linear" }), animate("#myName", { x: -2000 }, { duration: exitAnimationDuration, ease: "linear" }),
			animate("#tagline", { x: -2000 }, { duration: exitAnimationDuration, ease: "linear" }),
			animate("#banner_arch", { x: 2000 }, { duration: exitAnimationDuration, ease: "linear" })]);
		router.push("/programming");
	}

	
	function getMouseParam(): IVec2d {

		return {
			x: map(mousePos.x!, 0, clientSize.x!, -1, 1 ),
			y: map(mousePos.y!, clientSize.y!, 0, -1, 1)
		}
	}



 /**
  * modulate mouse param (0:1 => start:end)
  * @param {any} start number
  * @param {any} end number
  * @returns {any} number
  */
	function modMouseParam(start: number, end: number): number{
		const x = getMouseParam().x!
		const x_u = Math.abs(x); // unsigned val
		if (x_u < start) return 0;
		let val = map(x_u, start, end, 0, 1); // unsigned param

		if (val > 1) val = 1;

		if (x >= 0) return val;
		else return val * -1;
	}

	const pathVariants = {
		start: { pathLength: 0 },
		end: { pathLength: 1 },
	};

	const pe = useMotionValue<number>(0);
	pe.set(0.3);


	
	return (
		<main className="fixed min-h-full min-w-full top-0 left-0 bg-img-rock-00 bg-right-bottom bg-cover flex justify-center items-center" ref={scope}>
			
			
			 {/* center point alignment */}
			
			<div className="bg-blue-500 h-[2px] w-[2px] fixed z-50"
				style={{
					top: centerCoord.y!,
					left: centerCoord.x!
			}}></div>

			<SweepingCircle percent={0.4} />
			
			<div>
				<img src="\img\portrait_00.png" alt="test"
					id="haha"
					className="w-100 h-100 bg-slate-50 rounded-full"
				/>
	
			</div>
			

			<h2 id="greeting" className="fixed top-[calc(50vh-10rem)] z-10 text-white">hi, i&apos;m tao</h2>

			<p id="tagline" className="fixed bottom-[calc(50vh-10rem)] z-10 text-white">a computational architect and full stack developer</p>


			<Button_Dot direction={Direction.LEFT} onClickHandler={exitToArchprojects}/>
			{/* <Button_Dot direction={Direction.UP}/>
			<Button_Dot direction={Direction.RIGHT}/>
			<Button_Dot direction={Direction.DOWN}/> */}


			{/* _____________	Hi Im Tao	_____________________ */}
			{/* <ShiftTranslateTextBox
				id = "myName"
				text="Hi, I'm Tao"
				fontsize={3}
				anchor={centerCoord}
				offset={{ y: -150, x: -100 }}
				range={{ min: 0, max: -200 }}
				current={modMouseParam(textboxStart, 1)}
				direction={Direction.LEFT}
			/> */}
			{/* _______________	tag line 	________________________*/}
			{/* <ShiftTranslateTextBox
				id="tagline"
				text="a computational architect and fullstack developer"
				fontsize={1}
				anchor={centerCoord}
				offset={{ y: 100, x: -150 }}
				range={{ min: 0, max: -200 }}
				current={modMouseParam(textboxStart, 1)}
				direction={Direction.RIGHT}
			/> */}

			{/* __________	Banners	____________________________________ */}
			{/* Banner architecture */}
			{/* <motion.div id="banner_arch" className="font-monument text-9xl fixed"
				style={{
					top: centerCoord.y! - 350,
					left: centerCoord.x!,
					opacity: 0,
					color: globalConfigs.color_accent
				}}
				animate={{
					x: map(modMouseParam(bannerStart, 1), 0, -1, 0, -800),
					opacity: map(modMouseParam(bannerStart, 1), 0, -1, 0, 1),
				}}
				transition={{
					type: "linear",
					duration: 0.01
				}}
			>
				ARCHITECTURE
			</motion.div> */}

			{/* banner programming */}
			{/* <motion.div id="banner_programming" className="font-monument text-9xl fixed"
				style={{
					top: centerCoord.y! - 350,
					left: centerCoord.x! - 700,
					opacity: 0,
					color: globalConfigs.color_accent
				}}
				animate={{
					x: map(modMouseParam(bannerStart, 1), 0, 1, 0, 800),
					opacity: map(modMouseParam(bannerStart, 1), 0, 1, 0, 1),
				}}
				transition={{
					type: "linear",
					duration: 0.001
				}}
			>
				PROGRAMMING
			</motion.div> */}

			{/* ________	link element to architecture projects page	________ */}
			{/* <motion.div id="link_arch" className="fixed top-0 left-0 h-1/2 z-10 hover:cursor-pointer"
				style={{
					backgroundColor: globalConfigs.color_accent,
					width: 0
				}}
				animate={{
					width: map(modMouseParam(linkStart, 1), 0, -1, 0, 100)
				}}
				transition={{
					type: "tween",
					duration: 0.01
				}}
				onClick={exitToArchprojects} >
			</motion.div> */}

			{/* ________	link element to programming projects page	________ */}
			{/* <motion.div id="link_program" className="fixed bottom-0 right-0 h-1/2 z-10 hover:cursor-pointer"
				style={{
					backgroundColor: globalConfigs.color_accent,
					width: 0
				}}
				animate={{
					width: map(modMouseParam(linkStart, 1), 0, 1, 0, 100)
				}}
				transition={{
					type: "tween",
					duration: 0.01
				}}
				onClick={exitToProgrammingProject} >
			</motion.div> */}
		</main>
	);
}
