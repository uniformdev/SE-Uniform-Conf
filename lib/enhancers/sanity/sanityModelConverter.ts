import { ComponentInstance } from "@uniformdev/canvas";
import createSanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import getConfig from "next/config";
import { COMPONENT_HERO_SANITY } from "constants/components";

const {
	serverRuntimeConfig: {
		sanityConfig: { projectId, dataset, useCdn, apiVersion, cdnProjectId },
	},
} = getConfig();

const sanityConfigured: boolean =
	projectId !== undefined &&
	cdnProjectId !== undefined &&
	dataset !== undefined &&
	useCdn !== undefined &&
	apiVersion !== undefined;

export const sanityModelConverter = ({
	component,
	parameter,
}: {
	component: ComponentInstance;
	parameter: any;
}) => {
	switch (component.type) {
		case COMPONENT_HERO_SANITY: {
			const returnValue = {
				title: parameter?.value?.title || "",
				description: parameter?.value?.description || "",
				buttonText: parameter?.value?.buttonText || "",
				buttonLink: parameter?.value?.buttonLinkSug || "",
				image: {
					src: "",
					alt: "",
				},
			};

			if (sanityConfigured) {
				const client = new createSanityClient({
					projectId: cdnProjectId,
					dataset: dataset,
					useCdn: useCdn,
					apiVersion: apiVersion,
				});

				const builder = imageUrlBuilder(client);
				returnValue.image.src = builder
					.image(parameter?.value?.image)
					.url()
					.replace(cdnProjectId, projectId);
			}

			return returnValue;
		}
	}
};