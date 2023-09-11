"use client";

import ProjectContent from "@/components/projectContent";
import ProjectIndexRow from "@/components/projectIndexRow";
import { motion, useAnimate } from "framer-motion";
import PropTypes from "prop-types";
import React, { Component, useEffect, useState } from "react";

function Architecture() {
    const isBrowser = typeof window !== "undefined";
    
	const [scope, animate] = useAnimate();
    const [project, setProject] = useState("none");

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const centerX = Math.round(isBrowser ? window.innerWidth / 2 : 0);
	const centerY = Math.round(isBrowser ? window.innerHeight / 2 : 0);
    
 

	useEffect(() => {
		const initAnim = async () => {
            await Promise.all([
                animate("#container_projectindex", { width: "50%", padding: "4rem" }, { duration: 1, ease: "easeOut" }),
                animate("#projects", { x: 0 }, { duration: 1, ease: "easeOut", delay: 1 }),
                animate("#title_arch", { x: 0 }, { duration: 1, ease: "easeOut", delay: 1 }),
                animate("#center_circle", { backgroundColor: "#ffffff" }, { duration: 1, ease: "easeOut", delay: 1 })]);
		};

        initAnim();
        if (isBrowser) {
			window.addEventListener("mousemove", handleMouse);
		}
	}, []);

    const handleMouse = async (e: MouseEvent) => {
        setX(e.pageX);
        setY(e.pageY);
        // await animate('#center_circle', {y: moveCenterCircle()}, {});
    }

    const moveCenterCircle = () => {
        // return y - centerY;
    }
	/**
	 * fetch project from database with provided id string
	 */
	const fetchProject = async () => {};

    function getRelativeCoordinates(event: MouseEvent, referenceElement:any) {
        const position = {
          x: event.pageX,
          y: event.pageY
        };
      
        const offset = {
          left: referenceElement.offsetLeft,
          top: referenceElement.offsetTop,
          width: referenceElement.clientWidth,
          height: referenceElement.clientHeight
        };
      
        let reference = referenceElement.offsetParent;
      
        while (reference) {
          offset.left += reference.offsetLeft;
          offset.top += reference.offsetTop;
          reference = reference.offsetParent;
        }
      
        return {
          x: position.x - offset.left,
          y: position.y - offset.top,
          width: offset.width,
          height: offset.height,
          centerX: (position.x - offset.left - offset.width / 2) / (offset.width / 2),
          centerY: (position.y - offset.top - offset.height / 2) / (offset.height / 2)
        };
      }

	return (
		<main ref={scope} className="flex min-h-screen h-full w-full">
			{/* center circle */}
			<motion.div
				id="center_circle"
				className="fixed w-4 h-4 rounded-full inset-x-0 inset-y-0 mx-auto top-1/2 z-10"
				style={{
                    backgroundColor: "#000000",
                    y:y
				}}
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
