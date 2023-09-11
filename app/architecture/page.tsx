"use client";

import ProjectContent from "@/components/projectContent";
import ProjectIndexRow from "@/components/projectIndexRow";
import { IPosition } from "@/types/IPosition";
import { motion, useAnimate } from "framer-motion";
import PropTypes from "prop-types";
import React, { Component, useEffect, useState } from "react";

function Architecture() {
    const isBrowser = typeof window !== "undefined";
    
	const [scope, animate] = useAnimate();
    const [project, setProject] = useState("none");
    const [animateDot, setAnimateDot] = useState(false);
88
    const [pos, setPos] = useState({x: window.innerWidth/2, y: window.innerHeight/2} as IPosition)
    
    useEffect(() => {
        
		const initAnim = async () => {
            await Promise.all([
                animate("#container_projectindex", { width: "50%", padding: "4rem" }, { duration: 1, ease: "easeOut" }),
                animate("#projects", { x: 0 }, { duration: 1, ease: "easeOut", delay: 1 }),
                animate("#title_arch", { x: 0 }, { duration: 1, ease: "easeOut", delay: 1 }),
                animate("#center_circle", { backgroundColor: "#ffffff" }, { duration: 1, ease: "easeOut", delay: 1 })]);
                
            setAnimateDot(true);
		};

        initAnim();
	}, []);

    const handleMouse =  (e: React.MouseEvent) => {
        if (animateDot) setPos({x: e.pageX, y: e.pageY})
    }
	/**
	 * fetch project from database with provided id string
	 */
	const fetchProject = async () => {};

	return (
		<main ref={scope} className="flex min-h-screen h-full w-full" onMouseMove={handleMouse}>
			{/* center circle */}
            <motion.div
				id="center_circle"
				className="fixed w-4 h-4 rounded-full inset-x-0 inset-y-0 mx-auto z-10"
                style={{ backgroundColor: "#000000", }}
                initial={{
                    y: window.innerHeight/2
                }}
                animate={{y: pos.y}}
                transition={{ type: "spring" }}
			></motion.div>

			{/* project index */}
			<div id="container_projectindex" className="fixed h-full w-[1px] bg-neutral-900 top-0 right-1/2 font-roboto font-thin">
				<motion.h1 id="title_arch" className="text-white"
					style={{
						x: -2000,
					}}
				>
					Architecture / Design
				</motion.h1>
				<motion.div id="projects" className=" bg-red-500 flex flex-col"
					style={{
						x: -2000,
                    }}
                >
					<ProjectIndexRow />
					<ProjectIndexRow />
					<ProjectIndexRow />
					<ProjectIndexRow />
					<ProjectIndexRow />
				</motion.div>
			</div>

			{/* project content */}
			<ProjectContent />
		</main>
	);
}

export default Architecture;
