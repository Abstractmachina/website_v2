import { useArchStore } from "@/libs/stateManagement";
import { motion } from "framer-motion";
import React from "react";

function ProjectIndexRow() {
	const archStore = useArchStore();

	const handleOnHoverStart = (e: React.MouseEvent) => {
		archStore.showPreview(true);
	};

	const handleOnHoverEnd = (e: React.MouseEvent) => {
		archStore.showPreview(false);

	};
	return (
		<div className="flex flex-row justify-between text-white hover:bg-yellow-400" onMouseEnter={handleOnHoverStart} onMouseLeave={handleOnHoverEnd}>
			<span>2000</span>
			<span>Project Title</span>
			<span>Type</span>
			<span>Affiliation</span>
		</div>
	);
}

export default ProjectIndexRow;
