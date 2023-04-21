
export function normalizeSData(eiaAPI) {
    let collection = {
        EIA_data: []
    };
    fetch(eiaAPI)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.response.data.length; i++) {
                let stateStats = {
                    YEAR: data.response.data[i].period,
                    AVERAGE_RETAIL_PRICE: data.response.data[i]["average-retail-price"],
                    CAPACITY_IPP: data.response.data[i]["capacity-ipp"],
                    CARBON_DIOXIDE_LBS: data.response.data[i]["carbon-dioxide-lbs"],
                    DIRECT_USE: data.response.data[i]["direct-use"],
                    GENERATION_ELECT_UTILS: data.response.data[i]["generation-elect-utils"]
                };
                collection.EIA_data.push(stateStats);
            }

        }
        )

    return collection;
}


