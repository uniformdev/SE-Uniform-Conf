import React, { useState, useEffect } from "react";
import Link from "next/link";
import useScrollPosition from "@react-hook/window-scroll";

import NavMenu from "./NavMenu";
import Logo from "./Logo";
import { useUniformContext } from "@uniformdev/context-react";
import { useRouter } from "next/router";

const locales = {
  locales: [
    {code: 'en-US', flag: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="40" viewBox="0 0 7410 3900">\
    <rect width="7410" height="3900" fill="#b22234"/>\
    <path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" stroke-width="300"/>\
    <rect xmlns="http://www.w3.org/2000/svg" width="2964" height="2100" fill="#3c3b6e"/>\
    <g fill="#fff">\
    <g id="s18">\
    <g id="s9">\
    <g id="s5">\
    <g id="s4">\
    <path id="s" d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"/>\
    <use xlink:href="#s" y="420"/>\
    <use xlink:href="#s" y="840"/>\
    <use xlink:href="#s" y="1260"/>\
    </g>\
    <use xlink:href="#s" y="1680"/>\
    </g>\
    <use xlink:href="#s4" x="247" y="210"/>\
    </g>\
    <use xlink:href="#s9" x="494"/>\
    </g>\
    <use xlink:href="#s18" x="988"/>\
    <use xlink:href="#s9" x="1976"/>\
    <use xlink:href="#s5" x="2470"/>\
    </g>\
    </svg>'},
    {code: 'nl-NL', flag:'<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 9 6">\
    <rect fill="#21468B" width="9" height="6"/>\
    <rect fill="#FFF" width="9" height="4"/>\
    <rect fill="#AE1C28" width="9" height="2"/>\
    </svg>'}]
}

const HamburgerIcon = () => (
  <svg
    className="fill-current h-6 w-6"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="fill-current h-6 w-6"
  >
    <path d="M11.85 17.56a1.5 1.5 0 0 1-1.06.44H10v.5c0 .83-.67 1.5-1.5 1.5H8v.5c0 .83-.67 1.5-1.5 1.5H4a2 2 0 0 1-2-2v-2.59A2 2 0 0 1 2.59 16l5.56-5.56A7.03 7.03 0 0 1 15 2a7 7 0 1 1-1.44 13.85l-1.7 1.71zm1.12-3.95l.58.18a5 5 0 1 0-3.34-3.34l.18.58L4 17.4V20h2v-.5c0-.83.67-1.5 1.5-1.5H8v-.5c0-.83.67-1.5 1.5-1.5h1.09l2.38-2.39zM18 9a1 1 0 0 1-2 0 1 1 0 0 0-1-1 1 1 0 0 1 0-2 3 3 0 0 1 3 3z" />
  </svg>
);

const Nav = () => {
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const { context } = useUniformContext();
  const scrollPositionY = useScrollPosition();
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setSubmenuVisible(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setScrolled(scrollPositionY > 0);
  }, [scrollPositionY]);

  return (
    <nav
      id="header"
      className={
        isScrolled
          ? "fixed w-full z-30 top-0 text-white  bg-white shadow"
          : "fixed w-full z-30 top-0 text-white"
      }
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <Link legacyBehavior prefetch={false} href="/">
            <a
              aria-label="home"
              className={
                isScrolled
                  ? "no-underline hover:no-underline font-bold text-2xl lg:text-4xl  text-gray-800"
                  : "no-underline hover:no-underline font-bold text-2xl lg:text-4xl  text-white"
              }
            >
              <Logo />
            </a>
          </Link>
        </div>
        <div className="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            onClick={() => setSubmenuVisible(!submenuVisible)}
            className="flex items-center p-1 text-orange-800 hover:text-gray-900"
          >
            <HamburgerIcon />
          </button>
        </div>
        <div
          id="nav-content"
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 lg:bg-transparent text-black p-4 lg:p-0 z-20 ${
            submenuVisible ? "bg-gray-100" : "hidden bg-white"
          }  ${isScrolled ? "bg-white" : "bg-gray-100"}`}
        >
          <NavMenu />
          <ActionLink
            isScrolled={isScrolled}
            onClick={async () => {
              setSubmenuVisible(false);
              await context.forget(true);
              document.cookie =
                "unfrmconf_registered=; Path=/; samesite=lax; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            }}
            label="Forget me"
            icon={<LockIcon />}
          />

        <ul className="list-reset lg:flex justify-end flex-1 items-center space-x-2 lg:mr-4">
          {locales.locales.map((locale, index) => {
            const url = "/" + locale.code;
            return (
            <li key={index}>
              <a href={url}><div dangerouslySetInnerHTML={{ __html: locale.flag? locale.flag : '' }} /></a>
            </li>
          )})}
        </ul>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
};

type ActionLinkProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  isScrolled: boolean;
  icon: React.ReactElement;
};

const ActionLink = ({ onClick, label, isScrolled, icon }: ActionLinkProps) => (
  <button
    onClick={onClick}
    id="navAction"
    className={`mx-auto lg:mx-0 hover:underline font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 ${
      isScrolled ? "gradient text-white" : "bg-white text-gray-800"
    }`}
  >
    <div className="flex items-center">
      <div>
        <>{icon}</>
      </div>
      <div className="ml-1" dangerouslySetInnerHTML={{ __html: label }}></div>
    </div>
  </button>
);

export default Nav;
