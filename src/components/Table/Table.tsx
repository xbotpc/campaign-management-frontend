import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

type Props = {
    columns: any[];
    rows: any[];
}

export const Table = ({ rows, columns }: Props) => {
    return (
        <Paper>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel: { page: 0, pageSize: 25 } } }}
                pageSizeOptions={[25, 50]}
                disableColumnMenu
                disableColumnSorting
                hideFooterSelectedRowCount
                getRowHeight={() => "auto"}
                showColumnVerticalBorder
            />
        </Paper>
    )
}