import { ComponentInstance } from "@uniformdev/canvas";

export const contentfulQueryModelConverter = ({
	component,
	parameter,
}: {
	component: ComponentInstance;
	parameter: any;
}) => {
	switch (component.type) {
		case "DynamicTalkList": {
			let talks: Array<{
				title: string;
				audience: string[];
				intro: string;
				slug: string;
			}> = [];

			parameter.value.forEach(
				({
					fields,
				}: {
					fields: {
						title: string;
						audience: string[];
						intro: string;
						slug: string;
					};
				}) => {
					talks.push({
						title: fields.title,
						audience: fields.audience,
						intro: fields.intro,
						slug: fields.slug,
					});
				}
			);

			return talks;
		}
	}
};
