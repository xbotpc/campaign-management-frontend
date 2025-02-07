import React, { useEffect, useState } from 'react'
import Campaigns from '../Campaign/List/CampaignList'
import { MasterDataCtx } from '../../hooks/context'
import { getAllMasterData } from '../../service/masterData';

//For bigger apps, there will be routers in this page too
const App = () => {
    const [masterData, setMasterData] = useState<any>({});

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const masterData = await getAllMasterData();
        setMasterData(masterData);
    }

    return (
        <MasterDataCtx.Provider value={masterData}>
            <Campaigns />
        </MasterDataCtx.Provider>
    )
}

export default App