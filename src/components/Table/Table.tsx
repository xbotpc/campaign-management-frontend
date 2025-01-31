import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type Props = {
    columns: GridColDef[];
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
            />
        </Paper>
    )
}