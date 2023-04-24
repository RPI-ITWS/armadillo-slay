
export async function normalizeSData(Abbrv, eiaAPI) {
    if (!Abbrv) {
        console.log(`No state abbreviation found for ${Abbrv}`);
        return;
    }

    try {
        const res = await fetch(eiaAPI);
        const eiaData = await res.json();
        const dataArr = eiaData.response.data;
        const EIA_data = dataArr.map(dataItem => ({
            YEAR: dataItem.period,
            AVERAGE_RETAIL_PRICE: dataItem["average-retail-price"],
            CAPACITY_IPP: dataItem["capacity-ipp"],
            CARBON_DIOXIDE_LBS: dataItem["carbon-dioxide-lbs"],
            DIRECT_USE: dataItem["direct-use"],
            GENERATION_ELECT_UTILS: dataItem["generation-elect-utils"],
        }));

        return {
            state: Abbrv,
            EIA_data,
        };
    } catch (error) {
        console.error(`Error fetching data for state ${Abbrv}:`, error);
        return;
    }
}


