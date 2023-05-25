// Canvas-related imports
import { UniformSlot, UniformText } from "@uniformdev/canvas-react";

/**
 Interface for the topMarginMap object.
 
 @interface TopMarginMap
*/
interface TopMarginMap {
	[key: string]: string;
}

/**
 Object that maps top margin value to their respective classes.
 
 @constant
 @type {TopMarginMap}
*/
const topMarginMap: TopMarginMap = {
	4: "mt-4",
	8: "mt-8",
	12: "mt-12",
	16: "mt-16",
	20: "mt-20",
	24: "mt-24",
	28: "mt-28",
	32: "mt-32"
};

/**
 Props for the TalkList component

 @interface TalkListProps
 @prop {string} title - The title to display on the TalkList component.
*/
export type TalkListProps = {
	title?: string;
	marginTop?: number;
};

/**
 The TalkList component displays a list of talks.

 @function
 @param {TalkListProps} props - Props for the TalkList component
 @returns {JSX.Element} - Rendered TalkList component
*/
export function TalkList(props: TalkListProps): JSX.Element {
	const marginTopClass = topMarginMap[props.marginTop ?? 0] || "mt-0";
	return (
		<fieldset>
			<section className={`bg-white border-b py-8 ${marginTopClass}`}>
				<div className="container mx-auto flex flex-wrap pt-4 pb-12">
					<UniformText
						as="h1"
						className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
						parameterId="title"
						placeholder="This is the title text"
					/>
					<UniformSlot name="talks">
						{({ child, key }) => (
							<div
								key={key}
								className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink"
							>
								{child}
							</div>
						)}
					</UniformSlot>
				</div>
			</section>
		</fieldset>
	);
}
