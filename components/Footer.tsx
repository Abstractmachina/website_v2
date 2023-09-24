"use client";

import { useGlobalClientSize, useGlobalCurrentPage } from "@/stores/globalStore";
import { Page } from "@/types/enum_page";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

function Footer() {
	const currentPage = useGlobalCurrentPage();
	const clientSize = useGlobalClientSize();

	console.log(Page[currentPage]);
	const styleHome = "fixed bottom-0 left-0 py-4 px-8 flex justify-between min-w-full"
	const styleArch = "text-white"
	const footerStyleArch = "min-1/2"
	const variants = {
		home: {
			width: clientSize.x!,
			opacity: 1,
		},
		arch: {
			width: clientSize.x! / 2,
			opacity: 1 },
		prog: {
			transition: {
				type: "tween",
				duration: 0.01,
			},
		},
	};

	function determineVariant() {
		if (currentPage == Page.HOME) return "home";
		else if (currentPage == Page.ARCH || currentPage == Page.ABOUT) return "arch";
	}

	return (
		
		<motion.footer className={`fixed bottom-0 py-4 px-8 flex justify-between overflow-hidden
			${(currentPage == Page.HOME) ? "w-full left-0" : ""}
			${(currentPage == Page.ARCH) ? " right-1/2 bg-white" : ""}
			${(currentPage == Page.PROGRAMMING) ? "w-1/2 right-0" : ""}
			${(currentPage == Page.ABOUT) ? "right-1/2 bg-white" : ""}
			`}
			style={{
				width: 0,
				opacity: 0
			}}
			animate={determineVariant()}
			transition= {
				{delay: 1,}
			}
			variants={variants}
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
