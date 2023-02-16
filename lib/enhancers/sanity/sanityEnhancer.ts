import getConfig from "next/config";
import { createSanityEnhancer } from "@uniformdev/canvas-sanity";
import createClient from "@sanity/client";

const {
	serverRuntimeConfig: {
		sanityConfig: { projectId, dataset, useCdn, apiVersion },
	},
} = getConfig();

export const sanityEnhancer = () => {
	const client = createClient({
		projectId,
		dataset,
		useCdn,
		apiVersion,
	});

	return createSanityEnhancer({ client });
};
