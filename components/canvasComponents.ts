import { Hero } from './Hero';
import { TalkList } from './TalkList';
import { WhyAttend } from './WhyAttend';
import { Talk } from './Talk';
import { RegisterForm } from './RegisterForm';

import Navbar from './Navbar';
import Footer from './Footer';
import { registerUniformComponent } from '@uniformdev/canvas-react';

registerUniformComponent({
    type: ["HeroContentful", "HeroContentstack", "HeroKontent"],
    component: Hero,
  });

registerUniformComponent({
    type: "TalkList",
    component: TalkList,
  });

  registerUniformComponent({
    type: "Talk",
    component: Talk,
  });

  registerUniformComponent({
    type: "WhyAttend",
    component: WhyAttend,
  });

  registerUniformComponent({
    type: "RegistrationForm",
    component: RegisterForm,
  });

  registerUniformComponent({
    type: "Header",
    component: Navbar,
  });

  registerUniformComponent({
    type: "Footer",
    component: Footer,
  });