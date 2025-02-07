export type Payout = {
    id?: string;
    currency: string;
    amount: number;
    country: string;
    createdAt: string;
    updatedAt: string;
};

export type Campaign = {
    id: string;
    title: string;
    url: string;
    isActive: boolean;
    payouts: Payout[];
};