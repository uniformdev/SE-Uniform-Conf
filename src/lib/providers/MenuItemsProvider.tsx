// External imports
import { createContext, PropsWithChildren } from "react";

// Local imports
import { MenuItem } from "@/components/NavigationMenu";

/**
 * Create the MenuItemsContext with a default value of an empty array.
 *
 * @typedef {import("react").Context} Context
 * @typedef {import("../components/NavMenu").MenuItem[]} MenuItem
 * @type {Context<MenuItem[]>} MenuItemsContext
 */
export const MenuItemsContext = createContext<MenuItem[]>([]);

/**
 * MenuItemsProvider component to provide MenuItemsContext to child components.
 *
 * @typedef {import("react").PropsWithChildren} PropsWithChildren
 * @typedef {Object} Props
 * @property {MenuItem[]} menuItems - The array of menu items to be provided by the context.
 * @param {PropsWithChildren<Props>} props - The props containing the menu items and children components.
 * @returns {JSX.Element} A JSX Element containing the children components.
 */
export const MenuItemsProvider = ({
	menuItems,
	children,
}: PropsWithChildren<{ menuItems: MenuItem[] }>) => (
	<MenuItemsContext.Provider value={menuItems}>
		{children}
	</MenuItemsContext.Provider>
);
