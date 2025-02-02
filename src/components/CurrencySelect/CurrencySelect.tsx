import { Grid2 as Grid, MenuItem, TextField } from '@mui/material';
import { useContext } from 'react';
import { MasterDataCtx } from '../../hooks/context';
import { generateSelectOptions } from '../../utils';

type Props = {
    id: string;
    label: string;
    value: string;
    onOptionSelection: (value: string) => void
}

const CurrencySelect = ({ id, label = '', value, onOptionSelection }: Props) => {
    const { currencies = [] } = useContext(MasterDataCtx);

    return (
        <Grid size="grow">
            <TextField
                id={id}
                className='country-select'
                label={label}
                select
                value={value}
                fullWidth
                onChange={(e: any) => onOptionSelection(e.target.value)}
            >
                {generateSelectOptions(currencies, 'id', 'name')
                    .map((currency) => (
                        <MenuItem
                            id={currency.id}
                            value={currency.value}
                        >
                            {currency.label}
                        </MenuItem>
                    ))}
            </TextField>
        </Grid>
    )
}

export default CurrencySelect