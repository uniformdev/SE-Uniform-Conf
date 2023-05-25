// Canvas-related imports
import { UniformText } from "@uniformdev/canvas-react";

/**
 * Interface for the audienceColorMap object.
 *
 * @interface AudienceColorMap
 */
interface AudienceColorMap {
	[key: string]: string;
}

/**
 * Object that maps audience names to their respective classes.
 *
 *  @constant
 * @type {AudienceColorMap}
 */
const audienceColorMap: AudienceColorMap = {
	Developers: "bg-green-100 text-green-800",
	Marketers: "bg-indigo-100 text-indigo-800",
	Everyone: "bg-red-100 text-red-800",
};

/**
 * Props for the TalkBlock component
 *
 * @interface TalkBlockProps
 * @prop {string} title - The title to display on the TalkBlock component.
 * @prop {string} intro - The intro to display on the TalkBlock component.
 * @prop {string} audience - The audience label to display on the TalkBlock component.
 * @prop {string} body - The body to display on the TalkBlock component.
 */
export type TalkBlockProps = {
	title?: string;
	intro?: string;
	audience?: string;
	body?: string;
};

/**
 * AudienceLabel functional component that displays the label for a specific audience.
 *
 * @function
 * @param {object} props - The properties for the AudienceLabel component.
 * @param {string} props.audienceName - The name of the audience to display the label for.
 * @returns {JSX.Element} - Rendered AudienceLabel component
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
 * TalkBlock functional component that displays a talk item.
 *
 * @function
 * @param {TalkBlockProps} props - The properties for the TalkBlock component.
 * @returns {JSX.Element} - Rendered TalkBlock component
 */
export function TalkBlock(props: TalkBlockProps): JSX.Element {
	return (
		<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20 bg-white">
			<div className="text-right">
				<h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
					<AudienceLabel audienceName={props?.audience || "None"} />
				</h2>
			</div>
			<div className="text-center">
				<UniformText
					as="p"
					parameterId="title"
					placeholder="The title of the talk"
					className="mt-1 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900"
				/>

				<UniformText
					as="p"
					parameterId="intro"
					placeholder="This is the introduction of the talk"
					className="max-w-2xl mt-5 mx-auto text-xl text-gray-500"
				/>

				<UniformText
					as="p"
					className="mt-4 text-gray-700 text-lg leading-relaxed"
					parameterId="body"
					placeholder="This is the body of the talk"
				/>
			</div>
		</div>
	);
}
