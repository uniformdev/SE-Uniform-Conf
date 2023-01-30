import { MenuItem } from "@/components/NavMenu";
import { createContext, PropsWithChildren } from "react";

export const MenuItemsContext = createContext<MenuItem[]>([]);

export function MenuItemsProvider({ menuItems, children }: PropsWithChildren<{ menuItems: MenuItem[] }>) {
    return (<MenuItemsContext.Provider value={menuItems}>{children}</MenuItemsContext.Provider>)
}