'use client'

import React, { FC, ReactElement } from "react";
import CloseProjectButton from "./Button_CloseProject";
import { motion } from "framer-motion";
import styles from './ProjectContent.module.css';


type ProjectContentProps = {
	dangerouslyInnerHtml: string,
}

const ProjectContent : FC<ProjectContentProps> = ({dangerouslyInnerHtml}) : ReactElement => {

	return (
		<motion.div id="container_projectcontent" className={`fixed h-full w-1/2 top-0 right-0 py-20 px-10 overflow-auto flex flex-col items-end ${styles.projectContent}`}>
			<CloseProjectButton />
			<motion.div
				dangerouslySetInnerHTML={{ __html: dangerouslyInnerHtml }}
				className=""
				initial={{
					right: "1000px",
					opacity: 0,
				}}
				animate={{
					right: 0,
					opacity: 1,
				}}
				exit={{
					top: 2000,
				}}
			>
			</motion.div>
		</motion.div>
	);
}

export default ProjectContent;
