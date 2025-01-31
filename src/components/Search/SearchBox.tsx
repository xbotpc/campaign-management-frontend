import { Button, Grid2 as Grid, Input } from '@mui/material';
import { ChangeEvent, useState } from 'react';

type Props = {
    placeholder?: string;
    searchButtonText?: string;
    clearButtonText?: string;
    onClick: (searchValue: string) => void;
}

const SearchBox = ({
    placeholder = 'Type here...',
    searchButtonText = 'Search',
    clearButtonText = 'Clear',
    onClick }: Props) => {
    const [searchText, setSearchText] = useState('')

    return (
        <Grid container alignItems="end" spacing={2}>
            <Grid>
                <Input
                    fullWidth
                    size={"medium"}
                    value={searchText}
                    placeholder={placeholder}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value)}
                />
            </Grid>
            <Grid>
                <Button
                    variant="contained"
                    onClick={() => onClick(searchText)}
                    size="large"
                >
                    {searchButtonText}
                </Button>
            </Grid>
            <Grid>
                <Button
                    size="large"
                    variant="text"
                    onClick={() => { setSearchText(''); onClick('') }}
                >
                    {clearButtonText}
                </Button>
            </Grid>
        </Grid >
    )
}

export default SearchBox