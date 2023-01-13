import getConfig from "next/config";
import { createSanityEnhancer } from "@uniformdev/canvas-sanity";
import createSanityClient from "@sanity/client";

const {
	serverRuntimeConfig: {
		sanityConfig: { projectId, dataset, useCdn, apiVersion },
	},
} = getConfig();

export const sanityEnhancer = () => {
	const client = new createSanityClient({
		projectId: projectId,
		dataset: dataset,
		useCdn: useCdn,
		apiVersion: apiVersion,
	});

	return createSanityEnhancer({ client });
};
