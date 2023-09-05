"use client";

import { map } from "@/libs/util";
import { motion } from "framer-motion";
import React, { useState } from "react";

function MouseDial() {

    const centerX = Math.round(window.innerWidth / 2);
  const [x, setX] = useState(centerX);
  const [y, setY] = useState(Math.round(window.innerHeight / 2));

  const handleMouse = (e: React.MouseEvent<HTMLImageElement>): void => {
    setX(e.pageX);
    setY(e.pageY);
  };

    const translateRotation = () : number => {
        const distanceToCenter = centerX - x;
        console.log(distanceToCenter);

        return map(-distanceToCenter, 0, centerX, 0, 90);
  };

  return (
    <div
      id="circle"
      onMouseMove={handleMouse}
      className="flex fixed min-w-full min-h-full top-0 left-0 justify-center items-center"
    >
      <motion.div
        className="bg-green-400"
        style={{
          rotateZ: translateRotation(),
        }}
      >
        <span>{x}</span> <span>{y}</span>
      </motion.div>
    </div>
  );
}

export default MouseDial;
