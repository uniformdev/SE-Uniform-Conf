/**
 Function to check if the current environment is development.

 @returns {boolean} - Returns true if the current environment is development, otherwise returns false.
*/
export function isDevelopmentEnvironment(): boolean {
	return process.env.NODE_ENV === "development";
}
