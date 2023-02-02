import {
	Context,
	ManifestV2,
	enableContextDevTools,
	ContextPlugin,
	enableDebugConsoleLogDrain
} from "@uniformdev/context";
import { enableGoogleGtagAnalytics } from "@uniformdev/context-gtag";
import { NextCookieTransitionDataStore } from "@uniformdev/context-next";
import { NextPageContext } from "next";
import manifest from "./manifest.json";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig() || {};
const { gaTrackingId } = publicRuntimeConfig || {};

export function createContext(serverContext?: NextPageContext): Context {
	const plugins: ContextPlugin[] = [
		enableContextDevTools(),
		enableDebugConsoleLogDrain("debug"),
	];
	
	if (gaTrackingId) {
		plugins.push(enableGoogleGtagAnalytics({ emitAll: true }));
	}

	return new Context({
		defaultConsent: true,
		manifest: manifest as ManifestV2,
		transitionStore: new NextCookieTransitionDataStore({ serverContext }),
		plugins,
	});
}