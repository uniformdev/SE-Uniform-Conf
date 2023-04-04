import { DynamicTalkContext } from "@/lib/providers/DynamicTalkProvider";
import {
	useUniformCurrentComponent,
	useUniformCurrentComposition,
} from "@uniformdev/canvas-react";
import Link from "next/link";
import { useContext } from "react";

export type Talk = {
	fields: {
		title: string;
		audience: string[];
		intro: string;
		slug: string;
	};
};

const AudienceLabel: React.FC<{ audienceName?: string }> = ({
	audienceName,
}) => (
	<span
		className={`ml-6 px-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-${
			audienceName === "Developers" ? "green" : "indigo"
		}-100 text-${audienceName === "Developers" ? "green" : "indigo"}-800`}
	>
		{audienceName}
	</span>
);

export function DynamicTalk() {
	let talk = useContext(DynamicTalkContext);

	const component = useUniformCurrentComponent();

	// If a preview overwrite is set, we show that version instead.
	// Components only have an ID when loaded in preview mode.
	if (component.data?._id) {
		const composition = useUniformCurrentComposition();
		const previewEntry = composition?.data?.parameters?.TalkPreviewEntry
			?.value as Talk;

		if (previewEntry?.fields) {
			talk = previewEntry;
		}
	}

	return (
		<div className="pt-24">
			<div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
				<fieldset>
					<section className="bg-white border-b py-8">
						<div className="container mx-auto flex flex-wrap pt-4 pb-12">
							<div
								key={talk?.fields?.title}
								className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink"
							>
								<div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow space-y-2 pt-2">
									<div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden">
										<div className="mt-3 mb-3 flex items-center justify-start">
											<AudienceLabel
												audienceName={
													talk?.fields?.audience?.length > 0
														? talk?.fields?.audience[0]
														: ""
												}
											/>
										</div>
									</div>
									<Link
										legacyBehavior
										href={"/talks/" + talk.fields?.slug}
										className="flex flex-wrap no-underline hover:no-underline"
									>
										<div className="w-full font-bold text-xl text-gray-800 px-6">
											{talk?.fields?.title}
										</div>
									</Link>
									<div className="text-gray-800 px-6 pb-6 text-sm">
										{talk?.fields?.intro}
									</div>
								</div>
							</div>
						</div>
					</section>
				</fieldset>
			</div>
		</div>
	);
}
