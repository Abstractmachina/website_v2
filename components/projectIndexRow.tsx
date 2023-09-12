import { useArchStore } from "@/stores/archStore";
import { motion } from "framer-motion";
import React, { useRef } from "react";

function ProjectIndexRow() {
  const containerRef = useRef<HTMLDivElement>(null);
	const archStore = useArchStore();

	const handleOnHoverStart = (e: React.MouseEvent) => {
    archStore.showPreview(true);
    // update preview position for aligning trackpoint with hovered project index
    archStore.setPosition(
      containerRef.current ? containerRef.current.offsetLeft : 0,
      containerRef.current ? containerRef.current.offsetTop + containerRef.current.offsetHeight : 0)    
	};

	const handleOnHoverEnd = (e: React.MouseEvent) => {
		archStore.showPreview(false);

	};
	return (
    <div ref={ containerRef} className="flex flex-row justify-between text-white hover:font-bold" onMouseEnter={handleOnHoverStart} onMouseLeave={handleOnHoverEnd}>
			<span>2000</span>
			<span>Project Title</span>
			<span>Type</span>
			<span>Affiliation</span>
		</div>
	);
}

export default ProjectIndexRow;
