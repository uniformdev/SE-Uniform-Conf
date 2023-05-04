// External imports
import Document, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Html,
	Main,
	NextScript,
} from "next/document";

// Context-related imports
import { enableNextSsr } from "@uniformdev/context-next";

// Local imports
import { createContext } from "@/lib/context/uniformContext";

// Custom Document class to add Uniform support and additional metadata to the HTML head
class UniformConfDocument extends Document {
	/**
	 Overriding the getInitialProps method for additional Uniform support.
	 
	 @param {DocumentContext} ctx - The document context object.
	 @returns {Promise<DocumentInitialProps>} - Returns the initial props for the document.
	*/
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		// Create a Uniform context for the server and enable Next.js SSR tracking
		const serverTracker = createContext(ctx);
		enableNextSsr(ctx, serverTracker);
		return await Document.getInitialProps(ctx);
	}

	/**
     Render the custom document, including the HTML head and body.
   
     @returns {React.ReactElement} - Returns the rendered document.
    */
	render(): React.ReactElement {
		return (
			<Html lang="en">
				<Head>
					<link href="/favicon/favicon.ico" rel="icon" />
					<link href="/favicon/apple-touch-icon.png" rel="apple-touch-icon" />
					<meta
						name="description"
						content="UniformConf, a Uniform content demo site"
					/>
				</Head>
				<body className="leading-normal tracking-normal text-white gradient">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

// Export the custom UniformConfDocument class as default
export default UniformConfDocument;
