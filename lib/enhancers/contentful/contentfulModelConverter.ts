import { Asset } from "contentful";
import { ComponentInstance } from '@uniformdev/canvas';

export const contentfulModelConverter = ({ component, parameter }: { component: ComponentInstance; parameter: any }) => {

  if (component.type === 'HeroContentful') {   

    const returnValue = {
      title: parameter?.value?.fields?.title || '', 
      description: parameter?.value?.fields?.description || '', 
      buttonText: parameter?.value?.fields?.buttonText || '', 
      buttonLink: parameter?.value?.fields?.buttonLinkSlug || '', 
      image: transformContentfulImage(parameter?.value?.fields?.image) || '',
    };

    return returnValue;
  }

  if (component.type === 'WhyAttend') {

    const returnValue = {
      title: parameter?.value?.fields?.title || '', 
      description: parameter?.value?.fields?.description || '', 
      image: transformContentfulImage(parameter?.value?.fields?.image) || ''
    };

    return returnValue;
  }

  if (component.type === 'TalkList') {

    const returnValue = {
      title: parameter?.value?.fields?.title || ''
    };

    return returnValue;
  }

  if (component.type === 'Talk') {

    const returnValue = {
      title: parameter?.value?.fields?.title || '', 
      description: parameter?.value?.fields?.intro || '', 
      audience: parameter?.value?.fields?.audience || '', 
    };

    return returnValue;
  }

  if (component.type === 'RegistrationForm') {
    const returnValue = {
      heading: parameter?.value?.fields?.heading || '', 
      buttonText: parameter?.value?.fields?.buttonText || '', 
      registeredText: parameter?.value?.fields?.registeredText || '', 
      homeLinkText: parameter?.value?.fields?.homeLinkText || '',
      success: parameter?.value?.fields?.success || ''
    };

    return returnValue;
  }
}

function transformContentfulImage(imageField: Asset) {
  let imageUrl = imageField?.fields?.file?.url;
  // Contentful image urls typically start with a double whack
  if (imageUrl.startsWith("//")) {
    imageUrl = imageUrl.replace("//", "https://");
  }

  const { image } = imageField?.fields?.file?.details || {};
  if (image?.width && image?.height) {
    return {
      src: imageUrl,
      alt: imageField?.fields?.title,
      width: image.width,
      height: image.height,
    };
  }

  return {
    src: imageUrl,
    alt: imageField?.fields?.title,
  };
}
