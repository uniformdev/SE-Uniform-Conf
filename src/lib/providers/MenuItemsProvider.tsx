import { MenuItem } from "@/components/NavMenu";
import { createContext, PropsWithChildren } from "react";

export const MenuItemsContext = createContext<MenuItem[]>([]);

export const MenuItemsProvider = ({
	menuItems,
	children,
}: PropsWithChildren<{ menuItems: MenuItem[] }>) => (
	<MenuItemsContext.Provider value={menuItems}>
		{children}
	</MenuItemsContext.Provider>
);
