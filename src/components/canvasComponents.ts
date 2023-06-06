// Component imports
import { Hero } from "./Hero";
import { TalkList } from "./TalkList";
import { WhyAttendLeft, WhyAttendRight } from "./WhyAttend";
import { Talk } from "./Talk";
import { TalkBlock } from "./TalkBlock";
import { RegistrationForm } from "./RegistrationForm";
import { Header } from "./Header";
import { Footer } from "./Footer";

// Uniform imports
import {
	ComponentProps,
	registerUniformComponent,
	createComponentStoreResolver,
	DefaultNotImplementedComponent,
	componentStore,
} from "@uniformdev/canvas-react";

// Local imports
import {
	COMPONENT_FOOTER,
	COMPONENT_HEADER,
	COMPONENT_HERO,
	COMPONENT_REGISTRATION_FORM,
	COMPONENT_TALK,
	COMPONENT_TALK_BLOCK,
	COMPONENT_TALK_LIST,
	COMPONENT_WHY_ATTEND,
} from "@/constants/components";
import {
	VARIANT_WHY_ATTEND_LEFT,
	VARIANT_WHY_ATTEND_RIGHT,
} from "@/constants/variants";
import { isDevelopmentEnvironment } from "@/lib/helpers/environmentUtilities";

/**
 * Represents a Uniform Component object with its types, optional variantId,
 * and the component itself.
 */
type UniformComponent = {
	types: string[];
	variantId?: string;
	component: React.ComponentType<ComponentProps<any>>;
};

// Define a list of components with their types and variants
const components: UniformComponent[] = [
	{
		types: [COMPONENT_HERO],
		component: Hero,
	},
	{
		types: [COMPONENT_TALK_LIST],
		component: TalkList,
	},
	{
		types: [COMPONENT_TALK],
		component: Talk,
	},
	{
		types: [COMPONENT_TALK_BLOCK],
		component: TalkBlock,
	},
	{
		types: [COMPONENT_WHY_ATTEND],
		component: WhyAttendLeft,
	},
	{
		types: [COMPONENT_WHY_ATTEND],
		variantId: VARIANT_WHY_ATTEND_LEFT,
		component: WhyAttendLeft,
	},
	{
		types: [COMPONENT_WHY_ATTEND],
		variantId: VARIANT_WHY_ATTEND_RIGHT,
		component: WhyAttendRight,
	},
	{
		types: [COMPONENT_REGISTRATION_FORM],
		component: RegistrationForm,
	},
	{
		types: [COMPONENT_HEADER],
		component: Header,
	},
	{
		types: [COMPONENT_FOOTER],
		component: Footer,
	},
];

// Register components and their variants in the component store
components.forEach((component: UniformComponent) => {
	component.types.forEach((type: string) => {
		if (isDevelopmentEnvironment()) {
			if (component.variantId !== undefined) {
				console.log(
					`Registered component of type: ${type} with variant: ${component.variantId}`
				);
			} else {
				console.log(`Registered component of type: ${type}`);
			}
		}
		registerUniformComponent({
			type,
			component: component.component,
			variantId: component.variantId,
		});
	});
});

/**
 * Function to create a component store resolver.
 *
 * @returns {RenderComponentResolver} - Returns a component store resolver.
 */
export const renderComponentResolver = () => {
	return createComponentStoreResolver({
		store: componentStore,
		defaultComponent: DefaultNotImplementedComponent,
	});
};
