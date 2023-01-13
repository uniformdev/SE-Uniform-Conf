import { ComponentInstance } from "@uniformdev/canvas";
import getConfig from "next/config";

const {
	serverRuntimeConfig: {
		strapiConfig: { apiHost },
	},
} = getConfig();

export const strapiModelConverter = ({
	component,
	parameter,
}: {
	component: ComponentInstance;
	parameter: any;
}) => {
	if (component.type === "HeroStrapi") {
		const returnValue = {
			title: parameter?.value[0]?.attributes?.Title || "",
			description: parameter?.value[0]?.attributes?.Description || "",
			buttonText: parameter?.value[0]?.attributes?.ButtonText || "",
			buttonLink: parameter?.value[0]?.attributes?.ButtonLinkSlug || "",
			image: {
				src:
					apiHost +
						parameter?.value[0]?.attributes?.Image?.data?.attributes?.url || "",
				alt: "",
			},
		};

		return returnValue;
	}
};
