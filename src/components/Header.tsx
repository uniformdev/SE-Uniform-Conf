// Component imports
import NavMenu from "./NavigationMenu";
import Logo from "./Logo";

// External imports
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useScrollPosition from "@react-hook/window-scroll";

// Context-related imports
import { useUniformContext } from "@uniformdev/context-react";

/**
 HamburgerIcon functional component that displays a SVG icon representing the hamburger menu.
 
 @function 

 @returns {JSX.Element} - Rendered HamburgerIcon SVG
*/
function HamburgerIcon(): JSX.Element {
	return (
		<svg
			className="fill-current h-6 w-6"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Menu</title>
			<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
		</svg>
	);
}

/**
 LockIcon functional component that displays a SVG icon representing the lock icon.

 @function

 @returns {JSX.Element} - Rendered LockIcon SVG
*/
function LockIcon(): JSX.Element {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			className="fill-current h-6 w-6"
		>
			<path d="M11.85 17.56a1.5 1.5 0 0 1-1.06.44H10v.5c0 .83-.67 1.5-1.5 1.5H8v.5c0 .83-.67 1.5-1.5 1.5H4a2 2 0 0 1-2-2v-2.59A2 2 0 0 1 2.59 16l5.56-5.56A7.03 7.03 0 0 1 15 2a7 7 0 1 1-1.44 13.85l-1.7 1.71zm1.12-3.95l.58.18a5 5 0 1 0-3.34-3.34l.18.58L4 17.4V20h2v-.5c0-.83.67-1.5 1.5-1.5H8v-.5c0-.83.67-1.5 1.5-1.5h1.09l2.38-2.39zM18 9a1 1 0 0 1-2 0 1 1 0 0 0-1-1 1 1 0 0 1 0-2 3 3 0 0 1 3 3z" />
		</svg>
	);
}

/**
ActionLink functional component that displays a button link with an icon and a label.

@function
@param {React.MouseEventHandler<HTMLButtonElement>} onClick - The function to execute when the button is clicked.
@param {string} label - The label to display on the button.
@param {boolean} isScrolled - Flag indicating if the user has scrolled the page.
@param {React.ReactElement} icon - The SVG icon element to display on the button.
@returns {JSX.Element} - Rendered ActionLink component
*/
type ActionLinkProps = {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	label: string;
	isScrolled: boolean;
	icon: React.ReactElement;
};

function ActionLink({
	onClick,
	label,
	isScrolled,
	icon,
}: ActionLinkProps): JSX.Element {
	return (
		<button
			onClick={onClick}
			id="navAction"
			className={`mx-auto lg:mx-0 hover:underline font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 ${
				isScrolled ? "gradient text-white" : "bg-white text-gray-800"
			}`}
		>
			<div className="flex items-center">
				<div>
					<>{icon}</>
				</div>
				<div className="ml-1">{label}</div>
			</div>
		</button>
	);
}

/**
 Header functional component that displays the header of the web application.

 @function 

 @returns {JSX.Element} - Rendered Header component
*/
export function Header(): JSX.Element {
	// State hooks for controlling the visibility of the submenu and the scroll position of the page
	const [submenuVisible, setSubmenuVisible] = useState(false);
	const [isScrolled, setScrolled] = useState(false);

	// Context and router hooks
	const { context } = useUniformContext();
	const scrollPositionY = useScrollPosition();
	const router = useRouter();

	// Add event listener to close the submenu on route change
	useEffect(() => {
		router.events.on("routeChangeStart", () => {
			setSubmenuVisible(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Update the state of the page scroll position
	useEffect(() => {
		setScrolled(scrollPositionY > 0);
	}, [scrollPositionY]);

	// Return the JSX elements for the header
	return (
		<nav
			id="header"
			className={
				isScrolled
					? "fixed w-full z-30 top-0 text-white  bg-white shadow"
					: "fixed w-full z-30 top-0 text-white"
			}
		>
			<div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
				<div className="pl-4 flex items-center">
					<Link legacyBehavior prefetch={false} href="/">
						<a
							aria-label="home"
							className={
								isScrolled
									? "no-underline hover:no-underline font-bold text-2xl lg:text-4xl  text-gray-800"
									: "no-underline hover:no-underline font-bold text-2xl lg:text-4xl  text-white"
							}
						>
							<Logo />
						</a>
					</Link>
				</div>
				<div className="block lg:hidden pr-4">
					<button
						id="nav-toggle"
						onClick={() => setSubmenuVisible(!submenuVisible)}
						className="flex items-center p-1 text-orange-800 hover:text-gray-900"
					>
						<HamburgerIcon />
					</button>
				</div>
				<div
					id="nav-content"
					className={`w-full flex-grow lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 lg:bg-transparent text-black p-4 lg:p-0 z-20 ${
						submenuVisible ? "bg-gray-100" : "hidden bg-white"
					}  ${isScrolled ? "bg-white" : "bg-gray-100"}`}
				>
					<NavMenu />
					<ActionLink
						onClick={async () => {
							setSubmenuVisible(false);
							await context.forget(true);
							document.cookie =
								"unfrmconf_registered=; Path=/; samesite=lax; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
						}}
						label="Forget me"
						isScrolled={isScrolled}
						icon={<LockIcon />}
					/>
				</div>
			</div>
			<hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
		</nav>
	);
}
