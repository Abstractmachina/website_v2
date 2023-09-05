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
    
    const distanceToCenter = () :number => {
        return centerX - x;
    }

    const translateRotation = () : number => {
        return map(-1*distanceToCenter(), 0, centerX, 0, 90);
    };
    
    const translateWidth = (): number => {
        return map(Math.abs(distanceToCenter()), 2, centerX, 0, window.innerHeight+100);        
    }

  return (
    <div
      id="circle"
      onMouseMove={handleMouse}
      className="flex fixed min-w-full min-h-full top-0 left-0 justify-center items-center"
      >
          <motion.div>
            <h1>Hi, I&rsquo;m Tao</h1>
              
          </motion.div>
          
      <motion.div
        className="h-1 fixed bg-black"
        style={{
            rotateZ: translateRotation(),
            width: translateWidth(),
        }}
      >
          </motion.div>
          <motion.div>
              
          </motion.div>
          <p>a computational architect and fullstack developer</p>
    </div>
  );
}

export default MouseDial;
