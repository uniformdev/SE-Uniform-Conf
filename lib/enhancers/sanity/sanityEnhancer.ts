import getConfig from "next/config";
import { createSanityEnhancer } from "@uniformdev/canvas-sanity";
import createSanityClient from "@sanity/client";

export const sanityEnhancer = () => {
	const { serverRuntimeConfig } = getConfig();
	const { sanityProjectId, sanityDataset, sanityUseCdn, sanityApiVersion } =
		serverRuntimeConfig;

	const client = new createSanityClient({
		projectId: sanityProjectId,
		dataset: sanityDataset,
		useCdn: sanityUseCdn,
		apiVersion: sanityApiVersion,
	});

	return createSanityEnhancer({ client });
};
