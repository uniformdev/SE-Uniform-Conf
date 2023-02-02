import { ComponentInstance } from "@uniformdev/canvas";
import { COMPONENT_HERO_KONTENT } from "constants/components";

export const kontentModelConverter = ({
	component,
	parameter,
}: {
	component: ComponentInstance;
	parameter: any;
}) => {
	switch (component.type) {
		case COMPONENT_HERO_KONTENT: {
			const returnValue = {
				title: parameter?.value?.elements?.title?.value || "",
				description: parameter?.value?.elements?.description?.value || "",
				buttonText: parameter?.value?.elements?.button_text?.value || "",
				buttonLink: parameter?.value?.elements?.button_link_slug?.value || "",
				image: {
					src: parameter?.value?.elements?.image?.value[0]?.url || "",
					alt: parameter?.value?.elements?.image?.value[0]?.description || "",
				},
			};

			return returnValue;
		}
	}
};