import CloseProjectButton from "@/components/Button_CloseProject";
import ProjectContent from "@/components/ProjectContent";
import React from "react";
import { Project } from "@/types/Project";

export async function generateStaticParams() {
    return [
        { shortcode: "printfast1" },
        { shortcode: "printfast2" },
        { shortcode: "drones-ml" },
        { shortcode: "matnet" },
        { shortcode: "shells" },
    ];
}

async function getProject(params: any): Promise<Project | null> {
	const res = await fetch(process.env.SERVER + `/api/projects/${params.shortcode}`);
    const data = await res.json();
	if (data && data.project) {
        const p = new Project().deserialize(data.project);

        return p;
    }
    return null;
}

async function Projectpage({ params }: { params: { shortcode: string } }) {

    const project = await getProject(params);
    return (
        <ProjectContent dangerouslyInnerHtml={ project ? project!.html : '' } />
	);
}

export default Projectpage;
