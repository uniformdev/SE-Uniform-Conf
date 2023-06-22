// Context-related imports
import { UniformContext } from "@uniformdev/context-react";
import { UniformAppProps } from "@uniformdev/context-next";

// Local imports
import { createContext } from "@/lib/context/uniformContext";
import "@/styles/globals.css";

// Main UniformConfApp component
/**
 * UniformConfApp component that wraps the entire application with the Uniform context.
 *
 * @function
 * @param {UniformAppProps} { Component, pageProps, serverUniformContext } - UniformAppProps object containing Component, pageProps, and serverUniformContext.
 * @returns {React.ReactElement} - Returns the wrapped application component.
 */ export default function UniformConfApp({
	Component,
	pageProps,
	serverUniformContext,
}: UniformAppProps) {
	// Create client context
	const clientContext = createContext();

	return (
		// Provide the Uniform context to the application
		<UniformContext
			context={serverUniformContext ?? clientContext}
			outputType={process.env.NODE_ENV === "development" ? "standard" : "edge"}
		>
			<Component {...pageProps} />
		</UniformContext>
	);
}
