"use client";

import { useGlobalClientSize, useGlobalCurrentPage } from "@/stores/globalStore";
import { Page } from "@/types/enum_page";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

function Footer() {
	const currentPage = useGlobalCurrentPage();
	const clientSize = useGlobalClientSize();

	const variants = {
		home: {  },
		arch: { },
		prog: {
			transition: {
				type: "tween",
				duration: 0.01,
			},
		},
	};

	const styleHome = "fixed bottom-0 left-0 py-4 px-8 flex justify-between min-w-full"
	const styleArch = "text-white"
	const footerStyleArch = "min-1/2"

	return (
		
		<motion.footer className={`fixed bottom-0 py-4 px-8 flex justify-between 
			${(currentPage == Page.HOME) ? "w-full left-0" : ""}
			${(currentPage == Page.ARCH) ? " right-1/2 bg-white" : ""}
			${(currentPage == Page.PROGRAMMING) ? "w-1/2 right-0" : ""}
			`}
			initial={{
				width: 0,
				opacity: 0
			}}
			animate={{
				width: clientSize.x! / 2,
				opacity: 1
			}}
			transition= {
				{delay: 1,}
			}
		>
			{(currentPage == Page.ARCH) &&
				<Link href='/' className={`${currentPage == Page.ARCH ? "" : ""}`}>Home</Link>
			}
			<motion.div>
				<Link href="/about"

				>
					About
				</Link>
			</motion.div>
			<div>
				<Link href="/blog"

				>
					Blog
				</Link>

			</div>
		</motion.footer>
	);
}

export default Footer;
