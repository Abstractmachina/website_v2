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
import { useGlobalActions, useGlobalCenterCoordinate, useGlobalCurrentPage, useGlobalNextPage, useGlobalStore } from "@/stores/globalStore";
import { Page } from "@/types/enum_page";
import { getWindowCenterCoordinate } from "@/libs/geometry";

function Architecture() {
	// state management
	// global store
	const nextPage = useGlobalNextPage();
	const currentPage = useGlobalCurrentPage();
	const centerCoord = useGlobalCenterCoordinate();
	const { setCurrentPage, setNextPage, setCenterCoord } = useGlobalActions();
	// arch store
	const selectedProject = useArchSelectedProject();
	const { setTrackpointAnimateable, setProjecIndexScrollY } = useArchActions();

	useEffect(() => {
		if (!centerCoord.x || !centerCoord.y) getWindowCenterCoordinate(setCenterCoord);

		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);
	
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
		
		initAnim();
	}, []);

	// setup for exiting page
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

	function handleWindowSizeChange() {
		getWindowCenterCoordinate(setCenterCoord);
	}


	/**
	 * fetch project from database with provided id string
	 */
	const fetchProject = async () => { 
		try {
			const res = await fetch(`api/projects/printfast1`);
			const data = await res.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

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
		]);
		setNextPage(Page.NONE);
		router.push('/');
	} 

	// =================		DOM			=======================

	return (
		<main ref={scope} className="fixed flex min-h-full min-w-full top-0 left-0">
			<button className="absolute top-1/3 left-1/3
			bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-50"
			onClick={fetchProject}>Tfetch prohect</button>
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
		</main>
	);
}

export default Architecture;
