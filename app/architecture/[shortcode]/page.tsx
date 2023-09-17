import ISerializable from "@/types/ISerializable";
import React from "react";

class Project implements ISerializable<Project> {
    
	title: string;
	subtitle: string;
	categories: [string];
	html: string;
	location: string;
	year: number;
	affiliations: [string];
    shortCode: string;
    
    deserialize(input: any) : Project{
        this.title = input.title;
        this.subtitle = input.subtitle;
        this.categories = input.categories;
        this.html = input.html;
        this.location = input.location;
        this.year = input.year;
        this.affiliations = input.affiliations;
        this.shortCode = input.shortCode;

        return this;
    }


};

export async function generateStaticParams() {
	return [{ shortcode: "printfast1" }, { shortcode: "printfast2" }];
}

async function getProject(params: any): Promise<Project | null> {
	const res = await fetch(process.env.SERVER + `/api/projects/${params.shortcode}`);
    const data = await res.json();
	if (data && data.project) {
        const p = new Project().deserialize(data.project[0]);

        return p;
    }
    return null;
}

async function Projectpage({ params }: { params: { shortcode: string } }) {
    const project = await getProject(params);
	return (
		<div className="fixed h-full w-1/2 top-0 right-0 p-20 overflow-auto flex flex-col items-end">
			<div dangerouslySetInnerHTML={{__html: project? project!.html : ''}}></div>
		</div>
	);
}

export default Projectpage;
