import { LOCALE_ENGLISH_UNITED_STATES } from "constants/locales";
import { LocaleContext } from "lib/providers/LocaleProvider";
import Link from "next/link";
import { useContext } from "react";
import Splitter from "./Splitter";

export type ImageProps = {
  src: string;
  alt: string;
}

export type EntryProps = {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  image?: ImageProps;
  locale: string;
  localizations: HeroProps[];
};

export type HeroProps = {
  Entry: EntryProps
};

export function HeroStrapi(props: HeroProps) {
  const locale = useContext(LocaleContext);
  const localizedProps = locale === LOCALE_ENGLISH_UNITED_STATES ? props : props?.Entry?.localizations?.filter(l => l?.Entry?.locale === locale)[0];

  return (
    <>
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left min-h-500">
            <h1 className="my-4 text-5xl font-bold leading-tight">{localizedProps?.Entry?.title}</h1>
            <p className="leading-normal text-2xl mb-8">{localizedProps?.Entry?.description}</p>
            {localizedProps?.Entry?.buttonText && localizedProps?.Entry.buttonLink ? (
              <Link prefetch={false} href={localizedProps?.Entry ? localizedProps?.Entry?.buttonLink : "#"}>
                <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                  {localizedProps?.Entry?.buttonText}
                </button>
              </Link>
            ) : null}
          </div>
          <div className="w-full md:w-3/5 py-6 text-center">
            {props.Entry?.image && (
              <img
                className="w-full md:w-4/5 z-50 min-h-500 max-h-500"
                height={500}
                src={props.Entry?.image?.src}
                alt={props.Entry?.image?.alt}
              />
            )}
          </div>
        </div>
      </div>
      <Splitter />
    </>
  );
}
