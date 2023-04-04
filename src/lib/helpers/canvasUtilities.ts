import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import { isDevelopmentEnvironment } from "./environmentUtilities";

export function getCanvasState(preview = false) {
	return preview || isDevelopmentEnvironment()
		? CANVAS_DRAFT_STATE
		: CANVAS_PUBLISHED_STATE;
}
