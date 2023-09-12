import { useArchStore } from "@/stores/archStore";
import { motion } from "framer-motion";
import React, { useRef } from "react";

function ProjectIndexRow() {
  const containerRef = useRef<HTMLDivElement>(null);
	const archStore = useArchStore();

	const handleOnHoverStart = (e: React.MouseEvent) => {
    archStore.showPreview(true);
    if (containerRef.current)
      console.log(containerRef.current?.offsetTop);
    archStore.setPosition(
      containerRef.current ? containerRef.current.offsetLeft : 0,
      containerRef.current ? containerRef.current.offsetTop : 0)
    
    console.log(archStore.previewPostion);
	};

	const handleOnHoverEnd = (e: React.MouseEvent) => {
		archStore.showPreview(false);

	};
	return (
    <div ref={ containerRef} className="flex flex-row justify-between text-white hover:bg-yellow-400" onMouseEnter={handleOnHoverStart} onMouseLeave={handleOnHoverEnd}>
			<span>2000</span>
			<span>Project Title</span>
			<span>Type</span>
			<span>Affiliation</span>
		</div>
	);
}

export default ProjectIndexRow;
