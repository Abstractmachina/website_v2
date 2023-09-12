import { useArchActions, useArchPreviewVisibility, useArchSelectedProject, useArchStore } from "@/stores/archStore";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";


enum ProjectIndexRowState {
  INACTIVE,
  HOVERED,
  SELECTED
}


function ProjectIndexRow() {
  const containerRef = useRef<HTMLDivElement>(null);

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

	return (
    <div ref={containerRef} className="flex flex-row justify-between text-white hover:cursor-pointer hover:font-bold"
      onMouseEnter={handleOnHoverStart}
      onMouseLeave={handleOnHoverEnd}
      onClick={handleClick}
      style={ determineStyle() }
    >
			<span>2000</span>
			<span>Project Title</span>
			<span>Type</span>
			<span>Affiliation</span>
		</div>
	);
}

export default ProjectIndexRow;
