import { Campaign, Payout } from "../types/campaign";

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

export async function getCampaignByID(
    id: string,
): Promise<Campaign> {
    try {
        return await (await fetch(
            `${process.env.REACT_APP_EC2_IP}/campaign/${id}`,
        )).json();
    } catch (error: any) {
        console.error("Error while fetching campaigns", error?.message);
        return {} as Campaign;
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

export async function saveCampaign(data: any) {
    try {
        await fetch(process.env.REACT_APP_EC2_IP + "/campaign", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.error("Error submitting campaign", error);
        throw error;
    }
}

export async function editCampaign(
    data: Partial<Campaign & { payouts: Payout[] }>,
) {
    try {
        await fetch(process.env.REACT_APP_EC2_IP + "/campaign", {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.error("Error editing campaign", error);
        throw error;
    }
}
