import { Talk } from "@/components/DynamicTalk";
import { createContext, PropsWithChildren } from "react";

export const PlaceholderTalk: Talk = {
    fields: {
        title: "This is a placeholder title",
        audience: ["Developer"],
        intro: "This is a placholder intro",
        slug: "talk"
    }
};

export const DynamicTalkContext = createContext<Talk>(PlaceholderTalk);

export const DynamicTalkProvider = ({ talk, children }: PropsWithChildren<{ talk: Talk }>) => (
    <DynamicTalkContext.Provider value={talk}>{children}</DynamicTalkContext.Provider>
);