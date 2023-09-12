"use client";

import ProjectContent from "@/components/projectContent";
import ProjectIndexRow from "@/components/ProjectIndexRow";
import Trackpoint from "@/components/Trackpoint";
import { useArchStore } from "@/stores/archStore";
import { isBrowser } from "@/libs/util";
import { IPosition } from "@/types/IPosition";
import { motion, useAnimate } from "framer-motion";
import React, { Component, useEffect, useState } from "react";

function Architecture() {

    const archStore = useArchStore();
	const [scope, animate] = useAnimate();
    const [project, setProject] = useState("none");
    const [animateDot, setAnimateDot] = useState(false);
88
    const [pos, setPos] = useState(isBrowser() ? { x: window.innerWidth / 2, y: window.innerHeight / 2 } as IPosition : { x: 0, y: 0 } as IPosition);
    
    useEffect(() => {
        
		const initAnim = async () => {
            await Promise.all([
                animate("#container_projectindex", { width: "50%", padding: "4rem" }, { duration: 1, ease: "easeOut" }),
                animate("#projects", { x: 0 }, { duration: 1, ease: "easeOut", delay: 1 }),
                animate("#title_arch", { x: 0 }, { duration: 1, ease: "easeOut", delay: 1 }),
                animate("#trackpoint", { backgroundColor: "#ffffff" }, { duration: 1, ease: "easeOut", delay: 1 })]);
                
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
		<div ref={scope} className="flex min-h-screen h-full w-full" onMouseMove={handleMouse}>
			{/* center circle */}
            <Trackpoint pos={pos} />

			{/* project index */}
			<div id="container_projectindex" className="fixed h-full w-[1px] bg-neutral-900 top-0 right-1/2 font-roboto font-thin">
				<motion.h1 id="title_arch" className="text-white" style={{x: -2000,}}>
					Architecture / Design
                </motion.h1>
                
                <motion.div id="projects" className="flex flex-col gap-10 mt-9 mr-28" style={{ x: -2000, }}
                >
					<ProjectIndexRow />
					<ProjectIndexRow />
					<ProjectIndexRow />
					<ProjectIndexRow />
					<ProjectIndexRow />
				</motion.div>
			</div>

            {/* project content */}
            {
                archStore.selectedProject != 'none' && <ProjectContent />
            }
            
		</div>
	);
}

export default Architecture;
