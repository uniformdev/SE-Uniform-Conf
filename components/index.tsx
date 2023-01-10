import { ComponentType } from 'react';
import { ComponentInstance } from '@uniformdev/canvas';
import { DefaultNotImplementedComponent, ComponentProps } from '@uniformdev/canvas-react';

import { Hero } from './Hero';
import { TalkList } from './TalkList';
import { WhyAttend } from './WhyAttend';
import { Talk } from './Talk';
import { RegisterForm } from './RegisterForm';

import Navbar from './Navbar';
import Footer from './Footer';

const mappings: ComponentMapping = {
  HeroContentful: Hero,
  HeroContentstack: Hero,
  HeroKontent: Hero,
  TalkList: TalkList,
  Talk: Talk,
  WhyAttend: WhyAttend,
  RegistrationForm: RegisterForm,
  Header: Navbar,
  Footer: Footer,
};

type ComponentMapping = Record<string, ComponentType<any>>;

export function resolveRenderer(component: ComponentInstance): ComponentType<ComponentProps<any>> | null {
  const componentImpl = mappings[component.type];
  return componentImpl ? componentImpl : DefaultNotImplementedComponent;
}

export default mappings;
