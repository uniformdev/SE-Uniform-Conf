// Component Imports
import Splitter from "./Splitter";

// External Imports
import { useState } from "react";
import { parse } from "cookie";
import Link from "next/link";

// Context-related imports
import { useUniformContext } from "@uniformdev/context-react";

// Canvas-related imports
import { UniformText } from "@uniformdev/canvas-react";

/**
 RegistrationFormProps type definition.
 Describes the properties for the RegistrationForm component.

 @interface RegistrationFormProps 
 @prop {string} heading - The title to display on the registration form.
 @prop {string} buttonText - The text to display on the register button.
 @prop {string} registeredText - The text to display when the user is registered.
 @prop {string} homeLinkText - The text to display on the back-to-home button.
 @prop {string} success - The text to display when the user is registered.
*/
export type RegistrationFormProps = {
	heading: string;
	buttonText: string;
	registeredText: string;
	homeLinkText: string;
	success: string;
};

/**
 RegistrationForm component.
 Displays a registration form and handles user registration.

 @function 
 @param {RegistrationFormProps} props - The properties for the RegistrationForm component. 
 @returns {JSX.Element} The rendered RegistrationForm component.
*/
export function RegistrationForm(props: RegistrationFormProps): JSX.Element {
	const [registered, setRegistered] = useState<boolean>(
		typeof document !== "undefined"
			? !!document.cookie.match(/unfrmconf_registered/)
			: false
	);
	const { context } = useUniformContext();

	/**
 onRegister function.
 Handles user registration and updates the application state.

 @function
 @returns {void}
*/
	function onRegister(): void {
		document.cookie = "unfrmconf_registered=true; path=/; samesite=lax";
		context.update({
			cookies: parse(document.cookie),
		});
		setRegistered(true);
	}

	return (
		<>
			<div className="py-24">
				<div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
					<div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
						<p className="uppercase tracking-loose w-full">Uniform conf</p>
						{registered ? (
							<h1 className="my-4 text-5xl font-bold leading-tight">
								<UniformText parameterId="success" />
							</h1>
						) : (
							<h1 className="my-4 text-5xl font-bold leading-tight">
								<UniformText parameterId="heading" />
							</h1>
						)}
						<form>
							{registered ? (
								<>
									<p className="pb-16">
										<UniformText parameterId="registeredText" />
									</p>
									<Link legacyBehavior href="/">
										<a className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
											<UniformText parameterId="homeLinkText" />
										</a>
									</Link>
								</>
							) : (
								<button
									type="button"
									onClick={onRegister}
									className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
								>
									<UniformText parameterId="buttonText" />
								</button>
							)}
						</form>
					</div>
				</div>
			</div>
			<Splitter />
		</>
	);
}
