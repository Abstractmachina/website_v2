import { useArchActions, useArchSelectedProject } from "@/stores/archStore";
import IndexEntry from "@/types/IndexEntry";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";

enum ProjectIndexRowState {
	INACTIVE,
	HOVERED,
	SELECTED,
}

type ProjectIndexRowProps = {
	entry: IndexEntry;
};

const ProjectIndexRow: FC<ProjectIndexRowProps> = ({ entry }): ReactElement => {
	const containerRef = useRef<HTMLDivElement>(null);
	const trRef = useRef<HTMLTableRowElement>(null);
	const router = useRouter();

	// styles
	const projectIsSelectedStyle = {
		color: "yellow",
		fontWeight: "700",
	};
	const defaultStyle = {
		color: "white",
		fontWeight: "100",
	};
	const hoverStyle = {
		color: "white",
		fontWeight: "700",
	};

	// state management
	const selectedProject = useArchSelectedProject();
	const { showPreview, setPosition, setSelectedProject } = useArchActions();

	const [currentState, setCurrentState] = useState(ProjectIndexRowState.INACTIVE);

	// if a project is deselected, reset all rows to default styling
	useEffect(() => {
		if (selectedProject == "none") setCurrentState(ProjectIndexRowState.INACTIVE);
	}, [selectedProject]);

	// event handling
	const handleOnHoverStart = (e: React.MouseEvent) => {
		if (selectedProject == "none") {
			showPreview(true);
			setCurrentState(ProjectIndexRowState.HOVERED);
			
			// update preview position for aligning trackpoint with hovered project index
			const clientRect = trRef.current?.getBoundingClientRect();
			setPosition(trRef.current ? clientRect!.left : 0, trRef.current ? clientRect!.top + trRef.current.offsetHeight : 0);
		}
	};

	const handleOnHoverEnd = (e: React.MouseEvent) => {
		showPreview(false);
		if (selectedProject == "none") setCurrentState(ProjectIndexRowState.INACTIVE);
	};

	const handleClick = () => {
		setSelectedProject("test");
		showPreview(false);
		setCurrentState(ProjectIndexRowState.SELECTED);
		router.push(`/architecture/${entry.shortCode}`);
	};

	function determineStyle() {
		switch (currentState) {
			case ProjectIndexRowState.SELECTED:
				return projectIsSelectedStyle;
				break;
			case ProjectIndexRowState.HOVERED:
				return hoverStyle;
				break;
			default:
				return defaultStyle;
		}
	}

	const listCategories = entry.categories.map((c, index) => {
		if (index < entry.categories.length - 1) return <span key={entry.shortCode + c}>{c}, </span>;
		else return <span key={entry.shortCode + c}>{c}</span>;
	});

	const listAffiliations = entry.affiliations.map((aff, index) => {
		if (index < entry.affiliations.length - 1) return <span key={entry.shortCode + aff}>{aff}, </span>;
		else return <span key={entry.shortCode + aff}>{aff}</span>;
	});

	return (
		<tr key={entry.title}
			ref={trRef}
			className="text-white hover:cursor-pointer hover:font-bold text-xs"
			onMouseEnter={handleOnHoverStart}
			onMouseLeave={handleOnHoverEnd}
			onClick={handleClick}
			style={determineStyle()}
		>
			<td className=" w-.5 align-top">{entry.year}</td>
			<td className="px-1 whitespace-normal align-top">{entry.title}</td>
			<td className="px-1 align-top">{listCategories}</td>
			<td className="pl-1 pr-0 align-top">{listAffiliations}</td>
		</tr>
	);
};

export default ProjectIndexRow;
