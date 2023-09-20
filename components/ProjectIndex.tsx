"use client";

import { motion, useAnimate } from "framer-motion";
import React, { FC, ReactElement, useEffect } from "react";
import Button_home from "./Button_home";
import ProjectIndexRow from "./ProjectIndexRow";
import { useArchActions, useArchSelectedProject } from "@/stores/archStore";
import Trackpoint from "./Trackpoint";
import { useGlobalActions, useGlobalCenterCoordinate, useGlobalCurrentPage, useGlobalNextPage } from "@/stores/globalStore";
import IndexEntry from "@/types/IndexEntry";
import { getWindowCenterCoordinate } from "@/libs/geometry";
import { Page } from "@/types/enum_page";
import { useRouter } from "next/navigation";
import { isBrowser } from "@/libs/util";

type ProjectIndexProps = {
	entries: IndexEntry[];
};

const ProjectIndex: FC<ProjectIndexProps> = ({ entries }): ReactElement => {
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
			await Promise.all([animate(scope.current, { width: "50%", padding: "4rem" }, { duration: enterAnimationDuration, ease: "easeOut" }), animate("#projectTableContainer", { x: 0 }, { duration: enterAnimationDuration, ease: "easeOut", delay: 0.2 }), animate("#title_arch", { x: 0 }, { duration: enterAnimationDuration, ease: "easeOut", delay: 0.2 }), animate("#trackpoint", { backgroundColor: "#ffffff" }, { duration: enterAnimationDuration, ease: "easeOut", delay: 0.2 })]);

			setTrackpointAnimateable(true);
		};

		initAnim();
	}, []);

	// // setup for exiting page
	useEffect(() => {
		setTrackpointAnimateable(false);
		const exitToHomeAsync = async () => {
			await Promise.all([animate("#trackpoint", { backgroundColor: "#171717" }, { duration: exitAnimationDuration, ease: "linear" }), animate(scope.current, { width: "0%", padding: "0" }, { duration: exitAnimationDuration, ease: "easeOut", delay: 1 })]);
			setNextPage(Page.NONE);
			router.push("/");
		};

		if (nextPage == Page.HOME) {
			// exit to home animation
			exitToHomeAsync();
		} else if (nextPage == Page.ABOUT) {
			router.push("/about");
		}
	}, [nextPage]);

	// =================	event handlers	=======================

	function handleWindowSizeChange() {
		getWindowCenterCoordinate(setCenterCoord);
	}

	function handleScroll(e: any) {
        const target = e.target;
		setProjecIndexScrollY(target.scrollTop);
	}

	async function exitPageToHome() {
		await Promise.all([
			animate(
				"#trackpoint",
				{
					y: isBrowser() ? window.innerWidth / 2 : 0,
					backgroundColor: "#171717",
				},
				{ duration: exitAnimationDuration, ease: "linear" }
			),
			animate(scope.current, { width: "0%", padding: "0" }, { duration: 1, ease: "easeOut" }),
		]);
		setNextPage(Page.NONE);
		router.push("/");
	}

	return (
			<div ref={scope} id="container_projectindex" className="fixed h-full w-[1px] bg-neutral-900 top-0 right-1/2 font-roboto font-thin overflow-auto no-scrollbar pl-0" onScroll={handleScroll}>
				<Trackpoint />

				<Button_home />
				<motion.h1 id="title_arch" className="text-white font-thin" style={{ x: -2000 }}>
					Architecture / Design
				</motion.h1>

				<motion.div id="projectTableContainer" className="flex mt-9 text-xs text-white" style={{ x: -2000 }}>
					<table className="w-full border-separate border-spacing-12 border-spacing-x-0">
						<thead className="">
							<tr className=" text-left">
								<th className="px-1 pr-2">Year</th>
								<th className="px-1">Title</th>
								<th className="px-1">Categories</th>
								<th className=" pl-1 pr-0">Affiliation</th>
							</tr>
						</thead>
						<tbody>
                            {entries.map((entry) => (
                                <ProjectIndexRow entry={entry} key={entry.shortCode} />
                            ))}
                        </tbody>
					</table>
				</motion.div>
			</div>
	);
};

export default ProjectIndex;
