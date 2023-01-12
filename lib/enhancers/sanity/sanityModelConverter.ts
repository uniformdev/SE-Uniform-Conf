import { ComponentInstance } from '@uniformdev/canvas';
import createSanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { sanityProjectId, sanityCdnProjectId, sanityDataset, sanityUseCdn, sanityApiVersion } = serverRuntimeConfig;

const sanityConfigured: boolean = 
  sanityProjectId !== undefined && sanityCdnProjectId !== undefined && sanityDataset !== undefined && sanityUseCdn !== undefined && sanityApiVersion !== undefined;

export const sanityModelConverter = ({ component, parameter }: { component: ComponentInstance; parameter: any }) => {

    if (component.type === 'HeroSanity') {
        
        const returnValue = {
            title: parameter?.value?.title || '', 
            description: parameter?.value?.description || '', 
            buttonText: parameter?.value?.buttonText || '', 
            buttonLink: parameter?.value?.buttonLinkSug || '', 
            image: {
                src: '',
                alt: '',
            }
        };

        if (sanityConfigured) {
            const client = new createSanityClient({
                projectId: sanityCdnProjectId,
                dataset: sanityDataset,
                useCdn: sanityUseCdn,
                apiVersion: sanityApiVersion
              });

              const builder = imageUrlBuilder(client);
              returnValue.image.src = builder.image(parameter?.value?.image).url().replace(sanityCdnProjectId, sanityProjectId);
        }

        return returnValue;    
    }
}
