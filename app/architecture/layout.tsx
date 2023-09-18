
import Button_home from "@/components/Button_home"
import ProjectIndex from "@/components/ProjectIndex";
import ProjectIndexRow from "@/components/ProjectIndexRow";
import Trackpoint from "@/components/Trackpoint"
import { getWindowCenterCoordinate } from "@/libs/geometry";
import { isBrowser } from "@/libs/util";
import { useArchActions, useArchSelectedProject } from "@/stores/archStore";
import { useGlobalActions, useGlobalCenterCoordinate, useGlobalCurrentPage, useGlobalNextPage } from "@/stores/globalStore";
import ISerializable from "@/types/ISerializable";
import IndexEntry from "@/types/IndexEntry";
import { Page } from "@/types/enum_page";
import { motion, useAnimate } from "framer-motion"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";




async function getProjectIndex() {
    const res = await fetch(process.env.SERVER + "/api/projects");
    const data = await res.json();

    const index: IndexEntry[] = [];
    for(let i = 0; i < data.projects.length; i++) {
        index.push(new IndexEntry().deserialize(data.projects[i]));
    }
    return index;
}

export default async function ArchLayout({
  children,
}: {
  children: React.ReactNode
    }) {
    
    const index = await getProjectIndex();
    
    // state management
	// global store
	// const nextPage = useGlobalNextPage();
	// const currentPage = useGlobalCurrentPage();
	// const centerCoord = useGlobalCenterCoordinate();
	// const { setCurrentPage, setNextPage, setCenterCoord } = useGlobalActions();
	// // arch store
	// const selectedProject = useArchSelectedProject();
	// const { setTrackpointAnimateable, setProjecIndexScrollY } = useArchActions();

	// useEffect(() => {
	// 	if (!centerCoord.x || !centerCoord.y) getWindowCenterCoordinate(setCenterCoord);

	// 	window.addEventListener("resize", handleWindowSizeChange);
	// 	return () => {
	// 		window.removeEventListener("resize", handleWindowSizeChange);
	// 	}; {}
	// }, []);
	
	// routing
	// const router = useRouter();
	
	// animation
	// const [scope, animate] = useAnimate();
	const exitAnimationDuration = 0.2;
	const enterAnimationDuration = 0.2;

	// useEffect(() => {

	// 	setCurrentPage(Page.ARCH);


	// 	const initAnim = async () => {
	// 		await Promise.all([
	// 			animate("#container_projectindex", { width: "50%", padding: "4rem" }, { duration: enterAnimationDuration, ease: "easeOut" }),
	// 			animate("#projects", { x: 0 }, { duration: enterAnimationDuration, ease: "easeOut", delay: 0.2 }),
	// 			animate("#title_arch", { x: 0 }, { duration: enterAnimationDuration, ease: "easeOut", delay: 0.2 }),
	// 			animate("#trackpoint", { backgroundColor: "#ffffff" }, { duration: enterAnimationDuration, ease: "easeOut", delay: 0.2 })]);

	// 		setTrackpointAnimateable(true);

	// 	};
		
	// 	initAnim();
	// }, []);

	// // setup for exiting page
	// useEffect(() => {
	// 	setTrackpointAnimateable(false);
	// 	const exitToHomeAsync = async () => {
	// 		await Promise.all([
	// 			animate("#trackpoint", { backgroundColor: '#171717' }, { duration: exitAnimationDuration, ease: "linear" }),
	// 			animate("#container_projectindex", { width: "0%", padding: "0" }, { duration: exitAnimationDuration, ease: "easeOut", delay:1 })
	// 		])
	// 		setNextPage(Page.NONE);
	// 		router.push('/');
	// 	};

	// 	if (nextPage == Page.HOME) {
	// 		// exit to home animation
	// 		exitToHomeAsync();

	// 	}
	// 	else if (nextPage == Page.ABOUT) {
	// 		router.push('/about')
	// 	}
	// }, [nextPage])

	// =================	event handlers	=======================

	// function handleWindowSizeChange() {
	// 	getWindowCenterCoordinate(setCenterCoord);
	// }



	// function handleScroll(e: any) {
	// 	const target = e.target;
	// 	setProjecIndexScrollY(target.scrollTop);
	// }
	
	// async function exitPageToHome() {
	// 	await Promise.all([
	// 		animate("#trackpoint", {
	// 			y: isBrowser() ? window.innerWidth / 2 : 0,
	// 			backgroundColor: '#171717',
	// 		}, { duration: exitAnimationDuration, ease: "linear" }),
	// 		animate("#container_projectindex", { width: "0%", padding: "0" }, { duration: 1, ease: "easeOut" })
	// 	]);
	// 	setNextPage(Page.NONE);
	// 	router.push('/');
	// } 

	// =================		DOM			=======================
    
  return (
    // <main ref={scope} className="fixed flex min-h-full min-w-full top-0 left-0">
    <main className="fixed flex min-h-full min-w-full top-0 left-0">
   
          <div className="z-50 fixed right:0 text-yellow-600">
          <Link href={'/architecture/printfast1'}>go to test project</Link>
              
          </div>
    {/* center circle */}
    {/* <Trackpoint /> */}

          {/* project index */}
          <ProjectIndex entries={ index} />
    {/* <div id="container_projectindex" className="fixed h-full w-[1px] bg-neutral-900 top-0 right-1/2 font-roboto font-thin overflow-auto no-scrollbar" onScroll={handleScroll}>
        <Button_home />
        <motion.h1 id="title_arch" className="text-white" style={{ x: -2000 }}>
            Architecture / Design
        </motion.h1>

        <motion.div id="projects" className="flex flex-col gap-10 mt-9 mr-28" style={{ x: -2000 }}>
            <ProjectIndexRow />
            <ProjectIndexRow />
            <ProjectIndexRow />
            <ProjectIndexRow />
            <ProjectIndexRow />
        </motion.div>
    </div> */}

    {/* project content */}
          
        {children}      

</main>
          
  )
}
