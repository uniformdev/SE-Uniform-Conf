// Component imports
import Splitter from "./Splitter";

// Canvas-related imports
import { UniformText } from "@uniformdev/canvas-react";

// External imports
import Link from "next/link";

/**
 * HeroProps type definition.
 * Describes the properties for the Hero component.
 *
 * @interface HeroProps
 * @prop {string} title - The title to display on the hero section.
 * @prop {string} description - The description to display on the hero section.
 * @prop {string} image - The image to display on the hero section.
 * @prop {string} buttonText - The text to display on the hero button.
 * @prop {string} buttonLink - The link to redirect the user when the hero button is clicked.
 * @prop {boolean} showButton - Flag indicating if the hero button should be displayed.
 */
export type HeroProps = {
	title?: string;
	description?: string;
	image?: string;
	buttonText?: string;
	buttonLink?: string;
	showButton?: boolean;
};

/**
 * Hero functional component that displays the hero section of the web application.
 *
 * @function
 * @param {HeroProps} props - The props object.
 * @returns {JSX.Element} - Rendered Hero component
 */
export function Hero(props: HeroProps): JSX.Element {
	return (
		<>
			<div className="pt-24">
				<div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
					<div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left min-h-500">
						<UniformText
							as="h1"
							className="my-4 text-5xl font-bold leading-tight"
							parameterId="title"
							placeholder="This is the title of the hero"
						/>
						<UniformText
							as="p"
							className="leading-normal text-2xl mb-8"
							parameterId="description"
							placeholder="This is the description of the hero"
						/>
						{props.showButton && props?.buttonText && props?.buttonLink ? (
							<Link prefetch={false} href={props.buttonLink || "#"}>
								<UniformText
									as="button"
									className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
									parameterId="buttonText"
									placeholder="The button text"
								/>
							</Link>
						) : null}
					</div>
					<div className="w-full md:w-3/5 py-6 text-center">
						{props?.image && (
							<img
								className="w-full md:w-4/5 z-50 min-h-500 max-h-500"
								height={500}
								src={`https://${props.image}`}
								alt={props?.title}
							/>
						)}
					</div>
				</div>
			</div>
			<Splitter />
		</>
	);
}
