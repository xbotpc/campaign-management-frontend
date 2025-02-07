export async function getAllMasterData() {
    try {
        // return await (await fetch('http://localhost:3001/' + "master")).json();
        return {
            currencies: [{
                id: "1",
                name: "INR",
            }, {
                id: "2",
                name: "EUR",
            }, {
                id: "3",
                name: "GBP",
            }],
            countries: [{
                id: "1",
                name: "IND",
            }, {
                id: "2",
                name: "EST",
            }, {
                id: "3",
                name: "GB",
            }],
        };
        // eslint-disable-next-line no-unreachable
    } catch (error) {
        console.error("FAILED TO GET MASTER DATA", error);
        return [];
    }
}
