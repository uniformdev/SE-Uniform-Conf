import { Asset } from "contentful";
import { ComponentInstance } from "@uniformdev/canvas";
import { COMPONENT_HERO_CONTENTFUL, COMPONENT_REGISTRATION_FORM, COMPONENT_TALK, COMPONENT_TALK_LIST, COMPONENT_WHY_ATTEND } from "constants/components";

type ContentfulData = {
	fields: {
		title?: string;
		description?: string;
		buttonText?: string;
		buttonLinkSlug?: string;
		image?: Asset;
		intro?: string;
		audience?: string;
		slug?: string;
		heading?: string;
		registeredText?: string;
		homeLinkText?: string;
		success?: string;
	};
};

const transformImage = (image: Asset | undefined) => {
	if (!image) return {};

	let { url } = image.fields?.file || {};
	if (url && url.startsWith("//")) {
		url = url.replace("//", "https://");
	}

	const { width, height } = image.fields?.file?.details?.image || {};
	return {
		src: url,
		alt: image.fields?.title,
		...(width && height ? { width, height } : {}),
	};
};

export const contentfulModelConverter = ({
	component,
	parameter,
}: {
	component: ComponentInstance;
	parameter: any;
}) => {
	const data = parameter?.value as ContentfulData | undefined;
	if (!data) return {};

	switch (component.type) {
		case COMPONENT_HERO_CONTENTFUL:
			return {
				title: data.fields.title || "",
				description: data.fields.description || "",
				buttonText: data.fields.buttonText || "",
				buttonLink: data.fields.buttonLinkSlug || "",
				image: transformImage(data.fields.image),
			};
		case COMPONENT_WHY_ATTEND:
			return {
				title: data.fields.title || "",
				description: data.fields.description || "",
				image: transformImage(data.fields.image),
			};
		case COMPONENT_TALK_LIST:
			return {
				title: data.fields.title || "",
			};
		case COMPONENT_TALK:
			return {
				title: data.fields.title || "",
				description: data.fields.intro || "",
				audience: data.fields.audience || "",
				slug: data.fields.slug || "",
			};
		case COMPONENT_REGISTRATION_FORM:
			return {
				heading: data.fields.heading || "",
				buttonText: data.fields.buttonText || "",
				registeredText: data.fields.registeredText || "",
				homeLinkText: data.fields.homeLinkText || "",
				success: data.fields.success || "",
			};
		default:
			return {};
	}
};
