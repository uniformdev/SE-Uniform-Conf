// Canvas-related imports
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";

// Local imports
import { isDevelopmentEnvironment } from "./environmentUtilities";

/**
 Function to get the Canvas state based on the environment and preview flag.

 @param {boolean} preview - Preview flag to indicate whether the site is in preview mode.
 @returns {number} - Returns the Canvas state.
*/
export function getCanvasState(preview = false): number {
	return preview || isDevelopmentEnvironment()
		? CANVAS_DRAFT_STATE
		: CANVAS_PUBLISHED_STATE;
}
