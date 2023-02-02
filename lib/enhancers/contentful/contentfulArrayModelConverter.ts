import { ComponentInstance } from "@uniformdev/canvas";
import { COMPONENT_DYNAMIC_TALK_LIST, COMPONENT_SELECT_TALK_LIST } from "constants/components";

type Talk = {
	title: string;
	audience: string[];
	intro: string;
	slug: string;
};

export const contentfulArrayModelConverter = ({
	component,
	parameter,
}: {
	component: ComponentInstance;
	parameter: any;
}): Talk[] => {
	if (component.type === COMPONENT_DYNAMIC_TALK_LIST || 
		component.type === COMPONENT_SELECT_TALK_LIST) {
		return parameter.value.map(
			({ fields }: { fields: Talk }): Talk => ({
				title: fields.title,
				audience: fields.audience,
				intro: fields.intro,
				slug: fields.slug,
			})
		);
	}

	return [];
};
