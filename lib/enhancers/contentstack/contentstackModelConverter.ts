import { ComponentInstance } from "@uniformdev/canvas";
import { COMPONENT_HERO_CONTENTSTACK } from "constants/components";

interface HeroData {
	title: string;
	description: string;
	buttonText: string;
	buttonLink: string;
	image: {
		src: string;
		alt: string;
	};
}

export const contentstackModelConverter = ({
	component,
	parameter,
}: {
	component: ComponentInstance;
	parameter: any;
}): HeroData => {
	if (component.type !== COMPONENT_HERO_CONTENTSTACK) {
		return parameter;
	}

	const { title = "", description = "", button_text: buttonText = "", button_link_slug: buttonLink = "", image } = parameter?.value || {};
	const { url: src = "", title: alt = "" } = image || {};

	return {
		title,
		description,
		buttonText,
		buttonLink,
		image: {
			src,
			alt,
		},
	};
};