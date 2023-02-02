import { ComponentInstance } from "@uniformdev/canvas";

type Talk = {
	title: string;
	audience: string[];
	intro: string;
	slug: string;
};

export const contentfulQueryModelConverter = ({
	component,
	parameter,
}: {
	component: ComponentInstance;
	parameter: any;
}): Talk[] => {
	switch (component.type) {
		case "DynamicTalkList":
			return parameter.value.map(
				({ fields }: { fields: Talk }): Talk => ({
					title: fields.title,
					audience: fields.audience,
					intro: fields.intro,
					slug: fields.slug,
				})
			);
		default:
			return [];
	}
};
