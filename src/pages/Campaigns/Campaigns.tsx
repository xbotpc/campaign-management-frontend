import { Box, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import SearchBox from "../../components/Search/SearchBox";
import { Table } from "../../components/Table/Table";
import { getCampaigns, searchCampaigns } from "../../service/campaign";
import { Campaign } from "../../types/campaign";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    init()
  }, []);

  async function init() {
    const response = await getCampaigns({ limit: 50, offset: 0 });
    setCampaigns(response);
  }

  async function onSearchClick(text: string) {
    if (text === '') {
      init();
    } else {
      setCampaigns(await searchCampaigns({ queryString: text }));
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1
    },
    {
      headerName: 'Title',
      field: 'title',
      display: 'flex',
      filterable: false,
      flex: 1
    },
    {
      field: 'url',
      headerName: 'Landing Page URL',
      flex: 1,
      renderCell: (params) => <Link href={params.value} security="noopener noreferrer" target="_blank">{params.value}</Link>
    },
    {
      field: 'isActive',
      headerName: 'Is Running',
      flex: 1
    },
  ];

  return (
    <>
      <Grid container padding={5} spacing={2}>
        <Grid width={'100%'} container justifyContent="space-between" alignItems={"baseline"}>
          <Grid>
            Campaign Management
          </Grid>
          <SearchBox
            placeholder="Search by title and url"
            onClick={onSearchClick}
          />
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
