import { Hero } from "./Hero";
import { TalkList } from "./TalkList";
import { WhyAttend } from "./WhyAttend";
import { Talk } from "./Talk";
import { RegisterForm } from "./RegisterForm";
import {
	ComponentProps,
	registerUniformComponent,
	createComponentStoreResolver,
	DefaultNotImplementedComponent,
	componentStore,
} from "@uniformdev/canvas-react";
import { ArrayTalkList, DynamicTalkList } from "./ArrayTalkList";
import { DynamicTalk } from "./DynamicTalk";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { COMPONENT_DYNAMIC_TALK, COMPONENT_DYNAMIC_TALK_LIST, COMPONENT_FOOTER, COMPONENT_HEADER, COMPONENT_HERO_CONTENTFUL, COMPONENT_HERO_CONTENTSTACK, COMPONENT_HERO_HYGRAPH, COMPONENT_HERO_KONTENT, COMPONENT_HERO_SANITY, COMPONENT_HERO_STRAPI, COMPONENT_REGISTRATION_FORM, COMPONENT_SELECT_TALK_LIST, COMPONENT_TALK, COMPONENT_TALK_LIST, COMPONENT_WHY_ATTEND } from "constants/components";

const components: UniformComponent[] = [
	{
		type: [
			COMPONENT_HERO_CONTENTFUL,
			COMPONENT_HERO_CONTENTSTACK,
			COMPONENT_HERO_KONTENT,
			COMPONENT_HERO_SANITY,
			COMPONENT_HERO_HYGRAPH,
			COMPONENT_HERO_STRAPI,
		],
		component: Hero,
	},
	{
		type: COMPONENT_TALK_LIST,
		component: TalkList,
	},
	{
		type: COMPONENT_TALK,
		component: Talk,
	},
	{
		type: COMPONENT_WHY_ATTEND,
		component: WhyAttend,
	},
	{
		type: COMPONENT_REGISTRATION_FORM,
		component: RegisterForm,
	},
	{
		type: COMPONENT_HEADER,
		component: Header,
	},
	{
		type: COMPONENT_FOOTER,
		component: Footer,
	},
	{
		type: [
			COMPONENT_DYNAMIC_TALK_LIST,
			COMPONENT_SELECT_TALK_LIST
		],
		component: ArrayTalkList
	},
	{
		type: COMPONENT_DYNAMIC_TALK,
		component: DynamicTalk
	}
];

components.forEach((component) => {
	registerUniformComponent(component);
});

type UniformComponent = {
	type: string | string[];
	component: React.ComponentType<ComponentProps<any>>;
};

export const RenderComponentResolver = () => {
	return createComponentStoreResolver({
		store: componentStore,
		defaultComponent: DefaultNotImplementedComponent,
	});
};
