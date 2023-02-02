import { UniformContext } from "@uniformdev/context-react";
import { UniformAppProps } from "@uniformdev/context-next";
import { createContext } from "../lib/context/uniformContext";

import "../styles/style.css";

const clientContext = createContext();

export default function UniformConfApp({
  Component,
  pageProps,
  serverUniformContext,
}: UniformAppProps) {
  return (
    <UniformContext context={serverUniformContext ?? clientContext}>
      <Component {...pageProps} />
    </UniformContext>
  );
}
