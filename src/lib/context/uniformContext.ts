// External imports
import { NextPageContext } from "next";

// Context-related imports
import {
	Context,
	ManifestV2,
	enableContextDevTools,
	ContextPlugin,
	enableDebugConsoleLogDrain,
} from "@uniformdev/context";
import { NextCookieTransitionDataStore } from "@uniformdev/context-next";

// Local imports
import manifest from "./manifest.json";

/**
 * Creates a Uniform Context instance with the specified server context.
 *
 * @function
 * @param {NextPageContext} [serverContext] - The optional server context for the application.
 * @returns {Context} - The created Uniform Context instance.
 */
export function createContext(serverContext?: NextPageContext): Context {
	const plugins: ContextPlugin[] = [
		enableContextDevTools(),
		enableDebugConsoleLogDrain("debug"),
	];

	return new Context({
		defaultConsent: true,
		manifest: manifest as ManifestV2,
		transitionStore: new NextCookieTransitionDataStore({ serverContext }),
		plugins,
	});
}
