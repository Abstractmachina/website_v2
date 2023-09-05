'use client'

import ProjectContent from "@/components/projectContent";
import ProjectIndexRow from "@/components/projectIndexRow";
import PropTypes from "prop-types";
import React, { Component, useState } from "react";

function Architecture() {

    const [project, setProject] = useState("none");

    /**
     * fetch project from database with provided id string
     */
    const fetchProject = async () => {
        
    }

    return <main className="flex min-h-screen h-full w-full">
        <div id="container_projectindex" className="fixed h-full w-1/2 bg-neutral-900 top-0 left-0 p-20">
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
