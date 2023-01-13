import { ComponentInstance } from "@uniformdev/canvas";

export const hygraphModelConverter = ({
	component,
	parameter,
}: {
	component: ComponentInstance;
	parameter: any;
}) => {
	if (component.type === "HeroHygraph") {
		const returnValue = {
			title: parameter?.value[0]?.title || "",
			description: parameter?.value[0]?.description || "",
			buttonText: parameter?.value[0]?.buttonText || "",
			buttonLink: parameter?.value[0]?.buttonLinkSlug || "",
			image: {
				src: parameter?.value[0]?.image?.url || "",
				alt: "",
			},
		};

		return returnValue;
	}
};