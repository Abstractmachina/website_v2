import { useArchActions, useArchSelectedProject } from "@/stores/archStore";
import IndexEntry from "@/types/IndexEntry";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";


enum ProjectIndexRowState {
  INACTIVE,
  HOVERED,
  SELECTED
}

type ProjectIndexRowProps = {
  entry: IndexEntry;
}


const ProjectIndexRow: FC<ProjectIndexRowProps> = ({entry}) : ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // styles
  const projectIsSelectedStyle = {
    color: 'yellow',
    fontWeight: "700"
  }
  const defaultStyle = {
    color: 'white',
    fontWeight: "100"
  }
  const hoverStyle = {
    color: 'white',
    fontWeight: "700"
  }
  
  // state management
  const selectedProject = useArchSelectedProject();
  const { showPreview, setPosition, setSelectedProject } = useArchActions();

  const [currentState, setCurrentState] = useState(ProjectIndexRowState.INACTIVE);

  // if a project is deselected, reset all rows to default styling
  useEffect(() => {
    if (selectedProject == 'none') setCurrentState(ProjectIndexRowState.INACTIVE);
  }, [selectedProject])


  // event handling
  const handleOnHoverStart = (e: React.MouseEvent) => {
    if (selectedProject == 'none') {
      showPreview(true);
      setCurrentState(ProjectIndexRowState.HOVERED);
      // update preview position for aligning trackpoint with hovered project index
      setPosition(containerRef.current ? containerRef.current.offsetLeft : 0, containerRef.current ? containerRef.current.offsetTop + containerRef.current.offsetHeight : 0);
    }
	};

	const handleOnHoverEnd = (e: React.MouseEvent) => {
    showPreview(false);
    if (selectedProject == 'none')
    setCurrentState(ProjectIndexRowState.INACTIVE);
	};

  const handleClick = () => {
    setSelectedProject("test");
    showPreview(false);
    setCurrentState(ProjectIndexRowState.SELECTED);
    router.push(`/architecture/${entry.shortCode}`);
  }


  function determineStyle() {
    switch (currentState) {
      case ProjectIndexRowState.SELECTED: return projectIsSelectedStyle;
        break;
      case ProjectIndexRowState.HOVERED: return hoverStyle;
        break;
      default: return defaultStyle;
    }

  }

  const listCategories = entry.categories.map(c => <span key={entry.shortCode + c}>{c}</span>)
  const listAffiliations = entry.affiliations.map(aff => <span key={entry.shortCode + aff}>{ aff}</span>)

	return (
    <div key={ entry.title} ref={containerRef} className="flex flex-row justify-between text-white hover:cursor-pointer hover:font-bold"
      onMouseEnter={handleOnHoverStart}
      onMouseLeave={handleOnHoverEnd}
      onClick={handleClick}
      style={ determineStyle() }
    >
      <span>{ entry.year}</span>
      <span>{entry.title}</span>
      <div>{ listCategories }</div>
      <span>{ listAffiliations }</span>
		</div>
	);
}

export default ProjectIndexRow;
