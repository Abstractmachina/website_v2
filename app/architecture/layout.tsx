import ProjectIndex from "@/components/ProjectIndexTab";
import Trackpoint from "@/components/Trackpoint";
import IndexEntry from "@/types/IndexEntry";



export default async function ArchLayout({ children }: { children: React.ReactNode }) {
	// const index = await getProjectIndex();

	// =================		DOM			=======================

	return (
		// <main ref={scope} className="fixed flex min-h-full min-w-full top-0 left-0">
		<main className="fixed flex min-h-full min-w-full top-0 left-0 justify-between">
			
			<ProjectIndex />
			<div className="w-[33%] bg-img-rock-00 bg-blend-soft-light bg-gray-300 border-r-2 border-black">preview</div>
			<div className=" bg-blue-500  grow">content</div>
            {/* <Trackpoint indexEntries={ index }/> */}
			{/* project content */}
			{/* {children} */}
		</main>
	);
}
