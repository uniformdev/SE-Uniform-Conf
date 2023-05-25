import Link from "next/link";
import Logo from "./Logo";
import { ToggleEmbeddedContextDevTools } from "@uniformdev/context-devtools";
import getConfig from "next/config";

// Get configuration from Next.js server runtime config
const {
	serverRuntimeConfig: { projectId, apiKey, apiHost },
} = getConfig();

/**
 * Header functional component that displays the footer of the web application.
 *
 * @function
 * @returns {JSX.Element} - Rendered Footer component
 */
export function Footer(): JSX.Element {
	return (
		<footer className="bg-white">
			<div className="mx-auto px-8">
				<div className="w-full flex flex-col md:flex-row py-4">
					<div className="flex-1 mb-6">
						{/* Render Uniform logo with link to uniform.dev */}
						<Link legacyBehavior prefetch={false} href="/">
							<a
								aria-label="Uniform"
								className="text-orange-600 no-underline hover:no-underline"
								href="https://uniform.dev"
							>
								<Logo />
							</a>
						</Link>
					</div>
					{/* Render the copyright notice */}
					<p className="text-gray-900 text-right flex-1 leading-8">
						Uniform starter kit for Next.js © {new Date().getFullYear()}
					</p>
				</div>
			</div>
			{/* Render the embedded context dev tools */}
			<ToggleEmbeddedContextDevTools
				initialSettings={{
					apiHost: apiHost,
					apiKey: apiKey,
					projectId: projectId,
				}}
			/>
		</footer>
	);
}
