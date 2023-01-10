import { ComponentInstance } from '@uniformdev/canvas';

export const contentStackModelConverter = ({ component, parameter }: { component: ComponentInstance; parameter: any }) => {
  
    if (component.type === 'HeroContentstack') {
    
        const returnValue = {
            title: parameter?.value?.title || '', 
            description: parameter?.value?.description || '', 
            buttonText: parameter?.value?.button_text || '', 
            buttonLink: parameter?.value?.button_link_slug || '', 
            image: {
                src: parameter?.value?.image?.url || '',
                alt: parameter?.value?.image?.title || ''
            }
        };

        return returnValue;    
    }
}
