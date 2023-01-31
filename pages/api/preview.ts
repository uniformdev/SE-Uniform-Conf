import { enhance } from "@uniformdev/canvas";
import { createPreviewHandler } from "@uniformdev/canvas-next";
import getConfig from "next/config";
import { enhancerBuilder } from "lib/enhancers";

const handler = createPreviewHandler({
	secret: () => getConfig().serverRuntimeConfig.previewSecret,
	enhance: (composition) =>
		enhance({
			composition,
			enhancers: enhancerBuilder,
			context: { preview: true },
		}),
	resolveFullPath: ({ path }) => {
		return path;
	}
});

export default handler;
