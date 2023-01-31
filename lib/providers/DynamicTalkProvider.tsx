import { Talk } from "@/components/DynamicTalk";
import { createContext, PropsWithChildren } from "react";

export const DynamicTalkContext = createContext<Talk>({
    fields: {
        title: "This is a placeholder title",
        audience: ["Developer"],
        intro: "This is a placholder intro",
        slug: "talk"
    }
});

export function DynamicTalkProvider({ talk, children }: PropsWithChildren<{ talk: Talk }>) {
    return (<DynamicTalkContext.Provider value={talk}>{children}</DynamicTalkContext.Provider>)
}