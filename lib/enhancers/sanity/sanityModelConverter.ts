import { ComponentInstance } from "@uniformdev/canvas";
import getConfig from "next/config";
import { COMPONENT_HERO_SANITY } from "constants/components";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";

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
				const client = createClient({
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