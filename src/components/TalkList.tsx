// Canvas-related imports
import { UniformSlot, UniformText } from "@uniformdev/canvas-react";

/**
 Props for the TalkList component

 @interface TalkListProps
 @prop {string} title - The title to display on the TalkList component.
*/
export type TalkListProps = {
	title?: string;
};

/**
 The TalkList component displays a list of talks.

 @function
 @param {TalkListProps} props - Props for the TalkList component
 @returns {JSX.Element} - Rendered TalkList component
*/
export function TalkList(props: TalkListProps): JSX.Element {
	return (
		<fieldset>
			<section className="bg-white border-b py-8 mt-20">
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
