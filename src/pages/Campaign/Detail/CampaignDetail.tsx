import { Clear } from "@mui/icons-material";
import { Box, Button, Grid2 as Grid, TextField } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useReducer, useState } from "react";
import { getCampaignByID, saveCampaign } from "../../../service/campaign";
import { Campaign, Payout } from "../../../types/campaign";
import CampaignDetailPayouts from "./Payouts/CampaignDetailPayouts";

type Props = {
    campaignID?: string;
    onSubmit: () => void
}

const CampaignDetail = ({ campaignID = '', onSubmit }: Props) => {
    const [initialData, setInitialData] = useState<Campaign>();
    const [state, dispatch] = useReducer(campaignReducer, {}, getDefaultValue)

    const init = useCallback(async () => {
        setInitialData(await getCampaignByID(campaignID));
    }, [campaignID]);

    useEffect(() => {
        if (campaignID !== '') {
            init();
        }
    }, [campaignID, init]);

    function campaignReducer(state: Campaign, action: any) {
        switch (action.type) {
            case 'update.title':
                return {
                    ...state,
                    title: action.payload
                }
            case 'update.url':
                return {
                    ...state,
                    url: action.payload
                }
            case 'update.payouts':
                return {
                    ...state,
                    payouts: action.payload
                }
            case 'add.payout':
                return {
                    ...state,
                    payouts: [...state.payouts, {
                        currency: '',
                        country: '',
                        amount: 0
                    }]
                }

            default:
                return state;
        }
    }

    function getDefaultValue() {
        return initialData ||
        {
            id: '1',
            title: '',
            url: '',
            isActive: false,
            payouts: [{
                id: '1',
                amount: 0,
                currency: '',
                country: ''
            }] as Payout[],
        };
    }

    async function submitCampaign() {
        const { id, ...rest } = state;
        await saveCampaign(rest);
        onSubmit();
    }

    return (
        <Box width="100%">
            <Grid container justifyContent="space-between">
                <h2>{campaignID ? 'View' : 'Add new campaign'}</h2>
                <Button color="inherit" variant="text" onClick={() => onSubmit()}><Clear /></Button>
            </Grid>
            <Grid container spacing={2} flexDirection="column">
                <Grid size={12}>
                    <TextField
                        name="campaignName"
                        label="Campaign Name"
                        fullWidth
                        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({
                            type: 'update.title',
                            payload: e.target.value
                        })}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        type="url"
                        name="url"
                        label="Landing page URL"
                        fullWidth
                        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({
                            type: 'update.url',
                            payload: e.target.value
                        })}
                    />
                </Grid>
            </Grid>
            <h4>Payouts</h4>
            <Grid container spacing={2}>
                <Box width={'100%'}>
                    <CampaignDetailPayouts
                        payouts={state.payouts}
                        onChange={(updatedPayouts) => dispatch({
                            type: 'update.payouts',
                            payload: updatedPayouts
                        })}
                    />
                </Box>
                <Grid>
                    <Button variant="contained" onClick={() => dispatch({
                        type: 'add.payout',
                    })}>
                        Add new
                    </Button>
                </Grid>
            </Grid>
            <Button variant="outlined" onClick={submitCampaign}>Submit</Button>
        </Box>
    )
}

export default CampaignDetail