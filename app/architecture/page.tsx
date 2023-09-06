'use client'

import ProjectContent from "@/components/projectContent";
import ProjectIndexRow from "@/components/projectIndexRow";
import { useAnimate } from "framer-motion";
import PropTypes from "prop-types";
import React, { Component, useEffect, useState } from "react";

function Architecture() {

    const [scope, animate] = useAnimate();
    const [project, setProject] = useState("none");

    useEffect(() => {
        const initAnim = async () => {
            await animate('#container_projectindex', { width: "50%" }, { duration: 1, ease: 'easeOut' })
        };

        initAnim();
    }, []);

    /**
     * fetch project from database with provided id string
     */
    const fetchProject = async () => {
        
    }

    return <main ref={scope} className="flex min-h-screen h-full w-full">
        {/* center circle */}
			<div  className="fixed w-4 h-4 bg-red-500 rounded-full top-1/2 left-1/2"></div>
        <div id="container_projectindex" className="fixed h-full w-0 bg-neutral-900 top-0 right-1/2">
            <h1 className="text-white">Architecture / Design</h1>
            <div className=" bg-red-500 flex flex-col">
                <ProjectIndexRow/>
                <ProjectIndexRow/>
                <ProjectIndexRow/>
                <ProjectIndexRow/>
                <ProjectIndexRow/>
            </div>
        </div>
        <ProjectContent/>
  </main>;
}

export default Architecture;
