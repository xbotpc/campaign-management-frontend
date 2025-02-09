import CrossIcon from '@mui/icons-material/Clear';
import { Button, Grid2 as Grid, Input } from '@mui/material';
import { ChangeEvent, useState } from 'react';

type Props = {
    placeholder?: string;
    searchButtonText?: string;
    onClick: (searchValue: string) => void;
}

const SearchBox = ({
    placeholder = 'Type here...',
    searchButtonText = 'Search',
    onClick }: Props) => {
    const [searchText, setSearchText] = useState('');

    return (
        <Grid container alignItems="end" spacing={2}>
            <Grid>
                <Input
                    fullWidth
                    size={"medium"}
                    value={searchText}
                    placeholder={placeholder}
                    endAdornment={
                        <Button
                            size='large'
                            variant='text'
                            color='inherit'
                            onClick={() => { setSearchText(''); onClick('') }}
                        >
                            <CrossIcon />
                        </Button>
                    }
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value)}
                />
            </Grid>
            <Grid>
                <Button
                    size="large"
                    variant="contained"
                    onClick={() => onClick(searchText)}
                >
                    {searchButtonText}
                </Button>
            </Grid>
        </Grid >
    )
}

export default SearchBox