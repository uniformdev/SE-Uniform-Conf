import { ComponentInstance } from "@uniformdev/canvas";

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
	if (component.type !== "HeroContentstack") {
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