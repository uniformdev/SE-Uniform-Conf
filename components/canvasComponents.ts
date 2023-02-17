import { Hero } from "./Hero";
import { TalkList } from "./TalkList";
import { WhyAttendLeft, WhyAttendRight } from "./WhyAttend";
import { Talk } from "./Talk";
import { RegisterForm } from "./RegisterForm";
import {
	ComponentProps,
	registerUniformComponent,
	createComponentStoreResolver,
	DefaultNotImplementedComponent,
	componentStore,
} from "@uniformdev/canvas-react";
import { ArrayTalkList } from "./ArrayTalkList";
import { DynamicTalk } from "./DynamicTalk";
import { Header } from "./Header";
import { Footer } from "./Footer";
import {
	COMPONENT_DYNAMIC_TALK,
	COMPONENT_DYNAMIC_TALK_LIST,
	COMPONENT_FOOTER,
	COMPONENT_HEADER,
	COMPONENT_HERO_CONTENTFUL,
	COMPONENT_HERO_CONTENTSTACK,
	COMPONENT_HERO_HYGRAPH,
	COMPONENT_HERO_KONTENT,
	COMPONENT_HERO_SANITY,
	COMPONENT_HERO_STRAPI,
	COMPONENT_REGISTRATION_FORM,
	COMPONENT_SELECT_TALK_LIST,
	COMPONENT_TALK,
	COMPONENT_TALK_LIST,
	COMPONENT_WHY_ATTEND,
} from "constants/components";
import { HeroStrapi } from "./HeroStrapi";
import {
	VARIANT_WHY_ATTEND_LEFT,
	VARIANT_WHY_ATTEND_RIGHT,
} from "constants/variants";
import { isDevelopmentEnvironment } from "lib/helpers/environmentUtilities";

const components: UniformComponent[] = [
	{
		types: [
			COMPONENT_HERO_CONTENTFUL,
			COMPONENT_HERO_CONTENTSTACK,
			COMPONENT_HERO_KONTENT,
			COMPONENT_HERO_SANITY,
			COMPONENT_HERO_HYGRAPH,
		],
		component: Hero,
	},
	{
		types: [COMPONENT_HERO_STRAPI],
		component: HeroStrapi,
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
		component: RegisterForm,
	},
	{
		types: [COMPONENT_HEADER],
		component: Header,
	},
	{
		types: [COMPONENT_FOOTER],
		component: Footer,
	},
	{
		types: [COMPONENT_DYNAMIC_TALK_LIST, COMPONENT_SELECT_TALK_LIST],
		component: ArrayTalkList,
	},
	{
		types: [COMPONENT_DYNAMIC_TALK],
		component: DynamicTalk,
	},
];

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

type UniformComponent = {
	types: string[];
	variantId?: string;
	component: React.ComponentType<ComponentProps<any>>;
};

export const RenderComponentResolver = () => {
	return createComponentStoreResolver({
		store: componentStore,
		defaultComponent: DefaultNotImplementedComponent,
	});
};
