"use client";

import { FC, ReactElement, useEffect, useState } from "react";
import { IVec2d } from "@/types/IVec2d";
import { motion, useMotionValue } from "framer-motion";
import Image from 'next/image';

type SweepingCircleProps = {
	percent : number
}

const SweepingCircle: FC<SweepingCircleProps> = ({percent}): ReactElement => {
	const [startPos, setStartPos] = useState<IVec2d>(getCoordinatesForPercent(0));
	const [endPos, setEndPos] = useState<IVec2d>(getCoordinatesForPercent(percent));
	const largeArcFlag = percent > 0.5 ? 1 : 0;
	const currentPercent = useMotionValue(percent);

	useEffect(() => {
		setStartPos(getCoordinatesForPercent(0));
		setEndPos(getCoordinatesForPercent(percent));
	}, [percent])
	

	function getCoordinatesForPercent(percent: number): IVec2d {
		const x = Math.cos(2 * Math.PI * percent);
		const y = Math.sin(2 * Math.PI * percent);
		return { x, y } as IVec2d;
	}

	const pathData = [`M ${startPos.x} ${startPos.y}`, `A 1 1 0 ${largeArcFlag} 1 ${getCoordinatesForPercent(currentPercent.get()).x} ${getCoordinatesForPercent(currentPercent.get()).y}`, `L 0 0`].join(" ");



	return (
		// <div className="w-100 h-100">


		// 	<svg
		// 		width="100%"
		// 		height="100%"
		// 		viewBox="-1 -1 2 2"
		// 		style={{ transform: "rotate(-0.25turn)" }}>
		// 		<defs>
		// 			<mask id="bb">
		// 				<circle 
		// 				id = "aa"
		// 				cx="0"
		// 				cy=""
		// 				r="0.5"
		// 				stroke="white"
		// 				strokeWidth="1"
		// 				strokeDasharray="2.2"
		// 				/>
		// 		</mask>

		// 			</defs>
					
					
		// 		{/* <g mask="url(#bb)" href="#aa"> */}
					
		// 			{/* <img src="./img/test.png" alt="test" /> */}
		// 			{/* <rect x="-1" y="-1" width="2" height="2" fill="blue" /> */}
				
		// 		{/* </g> */}

		// 	</svg>
		// 	<img src="./img/test.png" alt="test" id="test" className="fixed top-2 z-10"></img>
				
		// </div>
		<div className="fixed w-screen h-screen">
			{/* <div className="bg-blue-500 w-full h-full"
			>	
				<img src="/img/test.png" alt="test" id="haha" className=" h-100 w-100 mask-[url(#mask)]" style={{objectFit: "cover", WebkitMaskImage: "url(#mask)"}}></img>
			</div> */}
			<svg
				width="100%"
				height="100%"
				viewBox="-1 -1 2 2"
				style={{ transform: "rotate(-0.25turn)" }}
				className="absolute">
				<defs>
					<mask id="mask">
						<rect
							x="-1"
							y="-1"
							width="2"
							height="2"
							fill="white" />
						<circle 
							id = "aa"
							cx="0"
							cy="0"
							r="0.5"
							stroke="black"
							fill="black"
							strokeWidth="1"
							strokeDasharray="2"
						/>
					</mask>
				</defs>
					
				{/* <circle 
						id = "aa"
						cx="0"
						cy=""
						r="0.5"
						stroke="white"
						strokeWidth="1"
						strokeDasharray="3"
				/> */}
				{/* <img src="/img/test.png" alt="test"
					id="haha"
					className=""
					style={{ maskImage: "url(#mask)" }}
				width={400} height={400}/> */}
				{/* <rect x="-200" y="-200" width="400" height="400" fill="red" mask="url(#mask)"></rect> */}
				
			</svg>

			{/* this image defnitely works */}
			{/* <img src="/img/test.png" alt="test" id="haha" className="fixed top-2 z-10"></img> */}
		</div>

		
			
	);
};

export default SweepingCircle;
