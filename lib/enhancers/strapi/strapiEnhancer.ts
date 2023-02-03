import getConfig from "next/config";
import {
	createEnhancer,
	StrapiClient,
} from "@uniformdev/canvas-strapi";

const {
	serverRuntimeConfig: {
		strapiConfig: { apiHost, apiToken },
	},
} = getConfig();

export const strapiEnhancer = () => {
	const client = new StrapiClient({
		apiToken,
		apiHost,
		populate: ["Image", "localizations"],
	});

	return createEnhancer({ clients: client });
};
