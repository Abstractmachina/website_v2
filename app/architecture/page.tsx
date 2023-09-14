"use client";

import ProjectContent from "@/components/ProjectContent";
import ProjectIndexRow from "@/components/ProjectIndexRow";
import Trackpoint from "@/components/Trackpoint";
import { useArchActions, useArchSelectedProject } from "@/stores/archStore";
import { isBrowser } from "@/libs/util";
import { IVec2d } from "@/types/IVec2d";
import { motion, useAnimate } from "framer-motion";
import React, { useEffect, useState } from "react";
import Button_home from "@/components/Button_home";
import { useRouter } from "next/navigation";
import { useGlobalActions, useGlobalCurrentPage, useGlobalNextPage, useGlobalStore } from "@/stores/globalStore";
import { Page } from "@/types/enum_page";

function Architecture() {
	// state management
	// global store
	const nextPage = useGlobalNextPage();
	const currentPage = useGlobalCurrentPage();
	const { setCurrentPage, setNextPage } = useGlobalActions();
	// arch store
	const selectedProject = useArchSelectedProject();
	const { setTrackpointAnimateable, setProjecIndexScrollY } = useArchActions();

	
	// routing
	const router = useRouter();
	
	// animation
	const [scope, animate] = useAnimate();
	const exitAnimationDuration = 0.2;
	const enterAnimationDuration = 0.2;

	useEffect(() => {

		setCurrentPage(Page.ARCH);


		const initAnim = async () => {
			await Promise.all([
				animate("#container_projectindex", { width: "50%", padding: "4rem" }, { duration: enterAnimationDuration, ease: "easeOut" }),
				animate("#projects", { x: 0 }, { duration: enterAnimationDuration, ease: "easeOut", delay: 0.2 }),
				animate("#title_arch", { x: 0 }, { duration: enterAnimationDuration, ease: "easeOut", delay: 0.2 }),
				animate("#trackpoint", { backgroundColor: "#ffffff" }, { duration: enterAnimationDuration, ease: "easeOut", delay: 0.2 })]);

			setTrackpointAnimateable(true);

		};

		// setCurrentPage(Page.ARCH);
		// console.log('current page: ' + currentPage);
		// setCurrentPage(Page.ABOUT);
		// console.log('current page: ' + currentPage);
		
		initAnim();

	}, []);

	useEffect(() =>{
		console.log('current page: ' + Page[currentPage]);
	}, [currentPage])

	useEffect(() => {
		setTrackpointAnimateable(false);
		const exitToHomeAsync = async () => {
			await Promise.all([
				animate("#trackpoint", { backgroundColor: '#171717' }, { duration: exitAnimationDuration, ease: "linear" }),
				animate("#container_projectindex", { width: "0%", padding: "0" }, { duration: exitAnimationDuration, ease: "easeOut", delay:1 })
			])
			setNextPage(Page.NONE);
			router.push('/');
		};

		if (nextPage == Page.HOME) {
			// exit to home animation
			exitToHomeAsync();

		}
		else if (nextPage == Page.ABOUT) {
			router.push('/about')
		}
	}, [nextPage])

	// =================	event handlers	=======================
	// const handleMouse = (e: React.MouseEvent) => {
	// 	if (animateDot) setPos({ x: e.pageX, y: e.pageY });
	// };

	/**
	 * fetch project from database with provided id string
	 */
	const fetchProject = async () => { };

	function handleScroll(e: any) {
		const target = e.target;
		setProjecIndexScrollY(target.scrollTop);
	}
	
	async function exitPageToHome() {
		await Promise.all([
			animate("#trackpoint", {
				y: isBrowser() ? window.innerWidth / 2 : 0,
				backgroundColor: '#171717',
			}, { duration: exitAnimationDuration, ease: "linear" }),
			animate("#container_projectindex", { width: "0%", padding: "0" }, { duration: 1, ease: "easeOut" })
			// animate("#centerline", { rotateZ: -90, width: centerX * 4 }, { duration: exitAnimationDuration, ease: "linear" }),
			// animate("#myName", { x: -2000 }, { duration: exitAnimationDuration, ease: "linear" }),
			// animate("#tagline", { x: 2000 }, { duration: exitAnimationDuration, ease: "linear" }),
			// animate("#banner_arch", { x: -2000 }, { duration: exitAnimationDuration, ease: "linear" }),
		]);
		setNextPage(Page.NONE);
		router.push('/');
	} 

	// =================		DOM			=======================

	return (
		<div ref={scope} className="flex min-h-screen h-full w-full">
			{/* center circle */}
			<Trackpoint />

			{/* project index */}
			<div id="container_projectindex" className="fixed h-full w-[1px] bg-neutral-900 top-0 right-1/2 font-roboto font-thin overflow-auto no-scrollbar" onScroll={handleScroll}>
				<Button_home />
				<motion.h1 id="title_arch" className="text-white" style={{ x: -2000 }}>
					Architecture / Design
				</motion.h1>

				<motion.div id="projects" className="flex flex-col gap-10 mt-9 mr-28" style={{ x: -2000 }}>
					<ProjectIndexRow />
					<ProjectIndexRow />
					<ProjectIndexRow />
					<ProjectIndexRow />
					<ProjectIndexRow />
				</motion.div>
			</div>

			{/* project content */}
			{selectedProject != "none" && <ProjectContent />}
		</div>
	);
}

export default Architecture;
