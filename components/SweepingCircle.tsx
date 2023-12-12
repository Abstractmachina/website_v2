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
		<div className="">


			<svg
				width="100%"
				height="100%"
				viewBox="-1 -1 2 2"
				style={{ transform: "rotate(-0.25turn)" }}>
				<defs>
					<mask id="bb">
						<circle 
						id = "aa"
						cx="0"
						cy=""
						r="0.5"
						stroke="white"
						strokeWidth="1"
						strokeDasharray="2.2"
						/>
				</mask>

					</defs>
					
					
				{/* <g mask="url(#bb)" href="#aa"> */}
					
					{/* <img src="./img/test.png" alt="test" /> */}
					{/* <rect x="-1" y="-1" width="2" height="2" fill="blue" /> */}
				
				{/* </g> */}

			</svg>
			<img src="/img/test.png" alt="test" id="test" className="fixed top-2"></img>
				
		</div>

		
			
	);
};

export default SweepingCircle;
