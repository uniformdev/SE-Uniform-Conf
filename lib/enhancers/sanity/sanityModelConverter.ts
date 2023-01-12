import { ComponentInstance } from '@uniformdev/canvas';
import createSanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { sanityProjectId, sanityCdnProjectId, sanityDataset, sanityUseCdn, sanityApiVersion } = serverRuntimeConfig;

const client = new createSanityClient({
  projectId: sanityCdnProjectId,
  dataset: sanityDataset,
  useCdn: sanityUseCdn,
  apiVersion: sanityApiVersion
});

export const sanityModelConverter = ({ component, parameter }: { component: ComponentInstance; parameter: any }) => {

    if (component.type === 'HeroSanity') {
        
        const builder = imageUrlBuilder(client);
        
        const returnValue = {
            title: parameter?.value?.title || '', 
            description: parameter?.value?.description || '', 
            buttonText: parameter?.value?.buttonText || '', 
            buttonLink: parameter?.value?.buttonLinkSug || '', 
            image: {
                src: builder.image(parameter?.value?.image).url().replace(sanityCdnProjectId, sanityProjectId) || '',
                alt: '',
            }
        };

        console.log(JSON.stringify(returnValue, null, 2))

        return returnValue;    
    }
}
