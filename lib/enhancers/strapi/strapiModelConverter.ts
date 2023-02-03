import { ComponentInstance } from "@uniformdev/canvas";
import { COMPONENT_HERO_STRAPI } from "constants/components";
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
	if (component.type === COMPONENT_HERO_STRAPI) {
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
			locale: parameter?.value[0]?.attributes.locale,
			localizations: parameter?.value[0]?.attributes?.localizations?.data?.map(
				(localization: any) => {
					return {
						Entry: {
							title: localization.attributes?.Title || "",
							description: localization.attributes?.Description || "",
							buttonText: localization.attributes?.ButtonText || "",
							buttonLink: localization.attributes?.ButtonLinkSlug || "",
							image: {
								src:
									apiHost +
										localization.attributes?.Image?.data?.attributes?.url || "",
								alt: "",
							},
							locale: localization.attributes?.locale,
						},
					};
				}
			),
		};

		return returnValue;
	}
};
