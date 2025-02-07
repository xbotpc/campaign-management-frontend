import CloseIcon from '@mui/icons-material/Close';
import { Grid2 as Grid, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import CountrySelect from "../../../../components/CountrySelect/CountrySelect";
import CurrencySelect from "../../../../components/CurrencySelect/CurrencySelect";

type Payout = { id?: string, currency: string, amount: number, country: string }

type Props = {
    payouts: Payout[]
    onChange: (payouts: Payout[]) => void;
}

const CampaignDetailPayouts = ({ payouts, onChange }: Props) => {
    function onPayoutUpdate(id: string | number, key: string, value: string) {
        const index = payouts.findIndex((payout) => payout.id === id);
        onChange(payouts.toSpliced(index, 1, {
            ...payouts[index],
            [key]: value
        }));
    }

    function onDeleteClick(id: string | number) {
        const index = payouts.findIndex((payout) => payout.id === id);
        onChange(payouts.toSpliced(index, 1));
    }

    return (
        <Grid container spacing={2}>
            {payouts.map((payout, i) => (
                <Grid
                    key={payout.id || i.toString()}
                    container
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                    width={'100%'}
                >
                    <Grid size={3}>
                        <TextField
                            type="number"
                            name="amount"
                            label="Amount"
                            value={payout.amount}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onPayoutUpdate(payout.id || i.toString(), 'amount', e.target.value)}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CurrencySelect
                            id="currencySelect"
                            label="Currency"
                            value={payout.currency}
                            onOptionSelection={(value: string) => onPayoutUpdate(payout.id || i.toString(), 'currency', value)}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CountrySelect
                            id="countrySelect"
                            label="Country"
                            value={payout.country}
                            onOptionSelection={(value: string) => onPayoutUpdate(payout.id || i.toString(), 'country', value)}
                        />
                    </Grid>
                    {payouts.length > 1 && <Grid size={1}>
                        <CloseIcon onClick={() => onDeleteClick(payout.id || i.toString())} />
                    </Grid>}
                </Grid>
            ))}
        </Grid>
    )
}

export default CampaignDetailPayouts