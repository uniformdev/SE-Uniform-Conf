import { enhance } from "@uniformdev/canvas";
import { createPreviewHandler } from "@uniformdev/canvas-next";
import getConfig from "next/config";
import { enhancerBuilder } from "lib/enhancers";

const handler = createPreviewHandler({
	secret: () => getConfig().serverRuntimeConfig.previewSecret,
	enhance: async (composition, { req }) => {
		const locale = req.query.locale;
		return await enhance({
			composition,
			enhancers: enhancerBuilder,
			context: { preview: true, locale },
		});
	},
	resolveFullPath: (options) => {
		const path = options.path ? options.path : "";
		if (path.startsWith("/")) {
			return `/${options.locale}${path}`;
		}

		return `/${options.locale}/${path}`;
	},
});

export default handler;
