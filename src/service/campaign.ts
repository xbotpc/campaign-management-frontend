import { Campaign } from "../types/campaign";

export async function getCampaigns(
    { limit, offset }: { limit: number; offset: number },
): Promise<Campaign[]> {
    try {
        return await (await fetch(
            process.env.REACT_APP_EC2_IP +
                `/campaign/list?limit=${limit}&offset=${offset}`,
        )).json();
    } catch (error: any) {
        console.error("Error while fetching campaigns", error?.message);
        return [];
    }
}

export async function searchCampaigns(
    { queryString = "", isActive }: { queryString: string; isActive?: boolean },
): Promise<Campaign[]> {
    try {
        return await (await fetch(
            process.env.REACT_APP_EC2_IP +
                `/campaign/search?queryString=${queryString}&isActive=${
                    isActive || ""
                }`,
        )).json();
    } catch (error: any) {
        console.error("Error while searching for campaigns", error?.message);
        return [];
    }
}
