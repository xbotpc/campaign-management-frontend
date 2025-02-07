import { createContext } from "react";

export const MasterDataCtx = createContext<{
    countries: { id: string; name: string }[];
    currencies: { id: string; name: string }[];
}>({
    countries: [],
    currencies: [],
});
