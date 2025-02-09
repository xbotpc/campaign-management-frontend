import { Box, Button, Drawer, Link, Switch } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import SearchBox from "../../../components/Search/SearchBox";
import { Table } from "../../../components/Table/Table";
import { editCampaign, getCampaigns, searchCampaigns } from "../../../service/campaign";
import { Campaign } from "../../../types/campaign";
import CampaignDetail from "../Detail/CampaignDetail";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    init()
  }, []);

  async function init() {
    const response = await getCampaigns({ limit: 50, offset: 0 });
    setCampaigns(response);
  }

  async function onSearchClick(text: string) {
    if (text.trim() === '') {
      init();
    } else {
      setCampaigns(await searchCampaigns({ queryString: text }));
    }
  }

  function onAddNewClick() {
    setIsDrawerOpen(true);
  }

  async function onSwitchToggle(id: string, isActive: boolean) {
    await editCampaign({ id, isActive: !isActive })
    init();
  }

  const columns: GridColDef[] = [
    {
      field: 'recordNo',
      headerName: '#',
      editable: false,
      renderCell: (params: GridRenderCellParams) => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      headerName: 'Title',
      field: 'title',
      filterable: false,
      display: "flex",
      flex: 1,
    },
    {
      field: 'url',
      headerName: 'Landing Page URL',
      display: "flex",
      flex: 1,
      renderCell: (params) => (
        <Link
          href={params.value}
          security="noopener noreferrer"
          target="_blank"
        >
          {params.value}
        </Link>)
    },
    {
      field: 'isActive',
      headerName: 'Is Running',
      renderCell: (params) => <Switch checked={params.row.isActive} onChange={() => onSwitchToggle(params.row.id, params.row.isActive)} />
    },
  ];

  return (
    <>
      <Drawer open={isDrawerOpen} anchor="right" PaperProps={{
        style: {
          padding: '1em',
          width: '350px'
        }
      }}>
        <CampaignDetail onSubmit={() => { setIsDrawerOpen(false); init() }} />
      </Drawer>
      <Grid container padding={5} spacing={2}>
        <Grid width={'100%'} container justifyContent="space-between" alignItems={"baseline"}>
          <Grid>
            Campaign Management
          </Grid>
          <Grid container spacing={3}>
            <SearchBox
              placeholder="Search by title and url"
              onClick={onSearchClick}
            />
            <Button variant="contained" onClick={onAddNewClick}>Add New</Button>
          </Grid>
        </Grid>
        <Box width={'100%'} height={20}>
          <Table
            columns={columns}
            rows={campaigns}
          />
        </Box>
      </Grid>
    </>
  );
}
