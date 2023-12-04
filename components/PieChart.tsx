"use client";

import { FC, ReactElement, useEffect, useState } from "react";
import { IVec2d } from "@/types/IVec2d";
import { motion } from "framer-motion";

type PieChartProps = {
	percent : number
}

const PieChart: FC<PieChartProps> = ({percent}): ReactElement => {
	const [startPos, setStartPos] = useState<IVec2d>(getCoordinatesForPercent(0));
	const [endPos, setEndPos] = useState<IVec2d>(getCoordinatesForPercent(percent));
	const largeArcFlag = percent > 0.5 ? 1 : 0;


	useEffect(() => {
		setStartPos(getCoordinatesForPercent(0));
		setEndPos(getCoordinatesForPercent(percent));
	}, [percent])
	

	function getCoordinatesForPercent(percent: number): IVec2d {
		const x = Math.cos(2 * Math.PI * percent);
		const y = Math.sin(2 * Math.PI * percent);
		return { x, y } as IVec2d;
	}

	const pathData = [`M ${startPos.x} ${startPos.y}`, `A 1 1 0 ${largeArcFlag} 1 ${endPos.x} ${endPos.y}`, `L 0 0`].join(" ");



	return (
		<svg viewBox="-1 -1 2 2" style={{ transform: "rotate(-0.25turn)" }}>
			<motion.path d={pathData}
				fill="red"
				strokeWidth="2" />
			
		</svg>
	);
};

export default PieChart;
