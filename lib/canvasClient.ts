import { CanvasClient } from "@uniformdev/canvas";
import getConfig from "next/config";

const {
	serverRuntimeConfig: { apiKey, apiHost, projectId, edgeApiHost },
} = getConfig();

export const canvasClient = new CanvasClient({
	apiKey,
	apiHost,
	projectId,
	edgeApiHost
});
