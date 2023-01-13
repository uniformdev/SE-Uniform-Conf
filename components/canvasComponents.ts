import { Hero } from './Hero';
import { TalkList } from './TalkList';
import { WhyAttend } from './WhyAttend';
import { Talk } from './Talk';
import { RegisterForm } from './RegisterForm';

import Navbar from './Navbar';
import Footer from './Footer';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';

const components: UniformComponent[] = [
  {
    type: ["HeroContentful", "HeroContentstack", "HeroKontent", "HeroSanity", "HeroHygraph"],
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
  }
]

components.forEach(component => {
  registerUniformComponent(component);
});

type UniformComponent = {
  type: string | string[];
  component: React.ComponentType<ComponentProps<any>>; 
}