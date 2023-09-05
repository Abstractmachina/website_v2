import ProjectIndexRow from "@/components/projectIndexRow";
import PropTypes from "prop-types";
import React, { Component } from "react";

function Architecture() {
    return <main className="flex min-h-screen h-full w-full">
        <div className="fixed h-full w-1/2 bg-neutral-900 top-0 left-0 p-20">
            <h1 className="text-white">Architecture / Design</h1>
            <div className=" bg-red-500 flex flex-col">
                <ProjectIndexRow/>
                <ProjectIndexRow/>
                <ProjectIndexRow/>
                <ProjectIndexRow/>
                <ProjectIndexRow/>
            </div>

        </div>
  </main>;
}

export default Architecture;
