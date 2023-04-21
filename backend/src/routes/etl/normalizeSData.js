
export async function normalizeSData(Abbrv, eiaAPI) {
    let collection = {
        state: Abbrv,
        EIA_data: []
    };
    await fetch(eiaAPI)
        .then(res => res.json())
        .then(eiaData => {
            console.log(eiaData);
            for (let i = 0; i < eiaData.response.data.length; i++) {
                let stateStats = {
                    YEAR: eiaData.response.data[i].period,
                    AVERAGE_RETAIL_PRICE: eiaData.response.data[i]["average-retail-price"],
                    CAPACITY_IPP: eiaData.response.data[i]["capacity-ipp"],
                    CARBON_DIOXIDE_LBS: eiaData.response.data[i]["carbon-dioxide-lbs"],
                    DIRECT_USE: eiaData.response.data[i]["direct-use"],
                    GENERATION_ELECT_UTILS: eiaData.response.data[i]["generation-elect-utils"]
                };
                collection.EIA_data.push(stateStats);
                return collection;
            }

        }
    )

   
}


