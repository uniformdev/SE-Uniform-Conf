// Canvas-related imports
import { UniformText } from "@uniformdev/canvas-react";

/**
 ImagePosition enum represents the position of the image within the WhyAttend component.
 
 @enum {number}
 @property {number} Left - The image should be displayed on the left side of the text.
 @property {number} Right - The image should be displayed on the right side of the text.
*/
enum ImagePosition {
	Left,
	Right,
}

/**
 Props for the WhyAttend components

 @interface WhyAttendProps
 @prop {string} title - The title to display on the WhyAttend component.
 @prop {string} description - The description to display on the WhyAttend component.
 @prop {string} image - The image to display on the WhyAttend component.
 @prop {string} buttonText - The button text to display on the WhyAttend component.
 @prop {string} buttonLink - The button link to display on the WhyAttend component.
 @prop {boolean} showButton - Whether to show the button on the WhyAttend component.
 @prop {ImagePosition} imagePosition - The position of the image on the WhyAttend component.
*/
export type WhyAttendProps = {
	title?: string;
	description?: string;
	image?: string;
	buttonText?: string;
	buttonLink?: string;
	showButton?: boolean;
	imagePosition?: ImagePosition;
};

/**
 Component variant of WhyAttend that displays the image on the left side

 @function
 @param {WhyAttendProps} props - Props for WhyAttendLeft component
 @returns {JSX.Element} - Rendered WhyAttendRight component
*/
export function WhyAttendLeft(props: WhyAttendProps): JSX.Element {
	return <WhyAttend {...props} imagePosition={ImagePosition.Left} />;
}

/**
 Component variant of WhyAttend that displays the image on the right side

 @function
 @param {WhyAttendProps} props - Props for WhyAttendRight component
 @returns {JSX.Element} - Rendered WhyAttendRight component
*/
export function WhyAttendRight(props: WhyAttendProps): JSX.Element {
	return <WhyAttend {...props} imagePosition={ImagePosition.Right} />;
}

/**
 WhyAttend functional component that either displays the image on the left or the right side

 @function
 @param {WhyAttendProps} props - Props for WhyAttendLeft component
 @returns {JSX.Element} - Rendered WhyAttendRight component
*/
export function WhyAttend(props: WhyAttendProps): JSX.Element {
	return (
		<section className="bg-white border-b py-8">
			<div
				className="container mx-auto flex flex-wrap pt-4 pb-12"
				style={{ flexDirection: props.imagePosition === ImagePosition.Left ? "row" : "row-reverse" }}
			>
				{props.image ? (
					<div className="w-1/2">
						<img
							src={`https://${props.image}`}
							alt={props.title}
							width={400}
							height={400}
							loading="lazy"
							className="p-10"
						/>
					</div>
				) : null}
				<div className="w-1/2">
					<div className="p-10">
						<h2 className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800">
							<UniformText parameterId="title" />
						</h2>
						<hr />
						<p className="text-gray-800 p-10 whitespace-pre-line">
							<UniformText parameterId="description" />
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
