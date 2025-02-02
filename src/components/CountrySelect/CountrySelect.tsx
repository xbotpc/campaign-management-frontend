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

const CountrySelect = ({ id, label = '', value, onOptionSelection }: Props) => {
    const { countries = [] } = useContext(MasterDataCtx);

    return (
        <Grid size="grow">
            <TextField
                id={id}
                select
                fullWidth
                label={label}
                value={value}
                className='country-select'
                onChange={(e: any) => onOptionSelection(e.target.value)}
            >
                {generateSelectOptions(countries, 'id', 'name')
                    .map((country) => (
                        <MenuItem
                            id={country.id}
                            value={country.value}
                        >
                            {country.label}
                        </MenuItem>
                    ))}
            </TextField>
        </Grid>
    )
}

export default CountrySelect