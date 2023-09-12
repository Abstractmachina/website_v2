import React from "react";
import CloseProjectButton from "./Button_CloseProject";
import { motion } from "framer-motion";

function ProjectContent() {
	return (
		<motion.div id="container_projectcontent" className="fixed h-full w-1/2 top-0 right-0 p-20 overflow-auto flex flex-col items-end">
			<CloseProjectButton />
			<motion.div className=""
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
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet massa vitae tortor condimentum lacinia quis. Malesuada fames ac turpis egestas. Sed felis eget velit aliquet sagittis id. Molestie a iaculis at erat pellentesque. Platea dictumst quisque sagittis purus sit amet volutpat. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Augue neque gravida in fermentum et sollicitudin.
					Diam phasellus vestibulum lorem sed risus ultricies. At quis risus sed vulputate odio. Nibh cras pulvinar mattis nunc sed blandit libero. Lorem ipsum dolor sit amet consectetur. Mi proin sed libero enim. Convallis posuere morbi leo urna molestie at elementum eu facilisis. Arcu dui vivamus arcu felis.
				</p>
				<p>
					Proin nibh nisl condimentum id venenatis. Bibendum at varius vel pharetra vel turpis nunc eget lorem. Pulvinar pellentesque habitant morbi tristique senectus et. Sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Sed cras ornare arcu dui vivamus arcu felis bibendum. Senectus et netus et malesuada fames ac. Nisl nisi scelerisque eu ultrices vitae auctor. Ullamcorper a lacus vestibulum sed arcu non odio. At urna condimentum mattis pellentesque
					id nibh tortor id. Semper feugiat nibh sed pulvinar. Quisque egestas diam in arcu cursus euismod quis viverra. Imperdiet sed euismod nisi porta lorem mollis aliquam. Nulla aliquet enim tortor at auctor. Etiam erat velit scelerisque in dictum.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet massa vitae tortor condimentum lacinia quis. Malesuada fames ac turpis egestas. Sed felis eget velit aliquet sagittis id. Molestie a iaculis at erat pellentesque. Platea dictumst quisque sagittis purus sit amet volutpat. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Augue neque gravida in fermentum et sollicitudin.
					Diam phasellus vestibulum lorem sed risus ultricies. At quis risus sed vulputate odio. Nibh cras pulvinar mattis nunc sed blandit libero. Lorem ipsum dolor sit amet consectetur. Mi proin sed libero enim. Convallis posuere morbi leo urna molestie at elementum eu facilisis. Arcu dui vivamus arcu felis.
				</p>
				<p>
					Proin nibh nisl condimentum id venenatis. Bibendum at varius vel pharetra vel turpis nunc eget lorem. Pulvinar pellentesque habitant morbi tristique senectus et. Sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Sed cras ornare arcu dui vivamus arcu felis bibendum. Senectus et netus et malesuada fames ac. Nisl nisi scelerisque eu ultrices vitae auctor. Ullamcorper a lacus vestibulum sed arcu non odio. At urna condimentum mattis pellentesque
					id nibh tortor id. Semper feugiat nibh sed pulvinar. Quisque egestas diam in arcu cursus euismod quis viverra. Imperdiet sed euismod nisi porta lorem mollis aliquam. Nulla aliquet enim tortor at auctor. Etiam erat velit scelerisque in dictum.
				</p>
			</motion.div>
		</motion.div>
	);
}

export default ProjectContent;
