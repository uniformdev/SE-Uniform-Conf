import { ComponentInstance } from "@uniformdev/canvas";

export const contentstackModelConverter = ({
	component,
	parameter,
}: {
	component: ComponentInstance;
	parameter: any;
}) => {
	switch (component.type) {
		case "HeroContentstack": {
			const returnValue = {
				title: parameter?.value?.title || "",
				description: parameter?.value?.description || "",
				buttonText: parameter?.value?.button_text || "",
				buttonLink: parameter?.value?.button_link_slug || "",
				image: {
					src: parameter?.value?.image?.url || "",
					alt: parameter?.value?.image?.title || "",
				},
			};

			return returnValue;
		}
	}
};