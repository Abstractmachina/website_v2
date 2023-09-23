import ProjectIndex from "@/components/ProjectIndex";
import Trackpoint from "@/components/Trackpoint";
import IndexEntry from "@/types/IndexEntry";

async function getProjectIndex() {
	const res = await fetch(process.env.SERVER + "/api/projects");
	const data = await res.json();

	const index: IndexEntry[] = [];
	for (let i = 0; i < data.projects.length; i++) {
		index.push(new IndexEntry().deserialize(data.projects[i]));
	}
	return index;
}

export default async function ArchLayout({ children }: { children: React.ReactNode }) {
	const index = await getProjectIndex();

	// =================		DOM			=======================

	return (
		// <main ref={scope} className="fixed flex min-h-full min-w-full top-0 left-0">
		<main className="fixed flex min-h-full min-w-full top-0 left-0">
			{/* project index */}
			<ProjectIndex entries={index} />
            <Trackpoint indexEntries={ index }/>
			{/* project content */}
			{children}
		</main>
	);
}
