// Canvas-related imports
import { UniformText } from "@uniformdev/canvas-react";
import Link from "next/link";

/**
 Interface for the audienceColorMap object.
 
 @interface AudienceColorMap
*/
interface AudienceColorMap {
	[key: string]: string;
}

/**
 Object that maps audience names to their respective classes.
 
 @constant
 @type {AudienceColorMap}
*/
const audienceColorMap: AudienceColorMap = {
	Developers: "bg-green-100 text-green-800",
	Marketers: "bg-indigo-100 text-indigo-800",
	Everyone: "bg-red-100 text-red-800",
};

/**
 Props for the Talk component

 @interface TalkProps 
 @prop {string} title - The title to display on the Talk component.
 @prop {string} intro - The intro to display on the Talk component.
 @prop {string} audience - The audience label to display on the Talk component.
 @prop {string} slug - The slug to the remote entry.
*/
export type TalkProps = {
	title?: string;
	intro?: string;
	audience?: string;
	slug?: string;
};

/**
 AudienceLabel functional component that displays the label for a specific audience.
 
 @function
 @param {object} props - The properties for the AudienceLabel component.
 @param {string} props.audienceName - The name of the audience to display the label for.
 @returns {JSX.Element} - Rendered AudienceLabel component
*/
function AudienceLabel({
	audienceName,
}: {
	audienceName: string;
}): JSX.Element {
	const classes = audienceColorMap[audienceName] || "bg-gray-100 text-gray-800";

	return (
		<span
			className={`ml-6 px-6 inline-flex text-xs leading-5 font-semibold rounded-full ${classes}`}
		>
			{audienceName}
		</span>
	);
}

/**
 Talk functional component that displays a talk item.
 
 @function
 @param {TalkProps} props - The properties for the Talk component.
 @returns {JSX.Element} - Rendered Talk component
*/
export function Talk(props: TalkProps): JSX.Element {
	return (
		<div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow space-y-2 pt-2">
			<div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden">
				<div className="mt-3 mb-3 flex items-center justify-start">
					<AudienceLabel audienceName={props?.audience || "None"} />
				</div>
			</div>
			<Link
				legacyBehavior
				href={"/talks/" + props?.slug}
				className="flex flex-wrap"
			>
				<UniformText
					as="div"
					className="w-full font-bold text-xl text-gray-800 px-6"
					parameterId="title"
					placeholder="The title of the talk"
				/>
			</Link>

			<UniformText
				as="div"
				className="text-gray-800 px-6 pb-6 text-sm"
				parameterId="intro"
				placeholder="This is the description of the talk"
			/>
		</div>
	);
}
