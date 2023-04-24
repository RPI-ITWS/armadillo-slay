class DataTransformer {
    transform(state, county, lat, lng, powerData: any, censusData: any) {
        console.log(`Normalized data for ${state} ${county} ${lat} ${lng}`);
        // TODO: transform data better
        return {
            state,
            county,
            lat,
            lng,
            powerData,
            censusData
        };
    }
}

export { DataTransformer };
