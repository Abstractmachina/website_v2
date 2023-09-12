import { useArchStore } from "@/stores/archStore";
import { motion } from "framer-motion";
import React, { useRef } from "react";

function ProjectIndexRow() {
	const containerRef = useRef<HTMLDivElement>(null);
	const archStore = useArchStore();

  const handleOnHoverStart = (e: React.MouseEvent) => {
    if (archStore.selectedProject == 'none') {
      archStore.showPreview(true);
      // update preview position for aligning trackpoint with hovered project index
      archStore.setPosition(containerRef.current ? containerRef.current.offsetLeft : 0, containerRef.current ? containerRef.current.offsetTop + containerRef.current.offsetHeight : 0);
      if (containerRef.current) {
        containerRef.current.style.fontWeight = '700';

      }
    }
	};

	const handleOnHoverEnd = (e: React.MouseEvent) => {
    archStore.showPreview(false);
    if (containerRef.current) {
      containerRef.current.style.fontWeight = '100';

    }
	};

  const handleClick = () => {
    archStore.setSelectedProject("test");
    archStore.showPreview(false);
    if (containerRef.current) {
      containerRef.current.style.color = 'yellow'
      containerRef.current.style.fontWeight = '700'
    }
  }

	return (
    <div ref={containerRef} className="flex flex-row justify-between text-white hover:cursor-pointer"
      onMouseEnter={handleOnHoverStart}
      onMouseLeave={handleOnHoverEnd}
      onClick={handleClick}
    >
			<span>2000</span>
			<span>Project Title</span>
			<span>Type</span>
			<span>Affiliation</span>
		</div>
	);
}

export default ProjectIndexRow;
