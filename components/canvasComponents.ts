import { Hero } from "./Hero";
import { TalkList } from "./TalkList";
import { WhyAttend } from "./WhyAttend";
import { Talk } from "./Talk";
import { RegisterForm } from "./RegisterForm";

import Navbar from "./Navbar";
import Footer from "./Footer";
import {
	ComponentProps,
	registerUniformComponent,
	createComponentStoreResolver,
	DefaultNotImplementedComponent,
	componentStore,
} from "@uniformdev/canvas-react";
import { DynamicTalkList } from "./DynamicTalkList";

const components: UniformComponent[] = [
	{
		type: [
			"HeroContentful",
			"HeroContentstack",
			"HeroKontent",
			"HeroSanity",
			"HeroHygraph",
			"HeroStrapi",
		],
		component: Hero,
	},
	{
		type: "TalkList",
		component: TalkList,
	},
	{
		type: "Talk",
		component: Talk,
	},
	{
		type: "WhyAttend",
		component: WhyAttend,
	},
	{
		type: "RegistrationForm",
		component: RegisterForm,
	},
	{
		type: "Header",
		component: Navbar,
	},
	{
		type: "Footer",
		component: Footer,
	},
	{
		type: "DynamicTalkList",
		component: DynamicTalkList
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
