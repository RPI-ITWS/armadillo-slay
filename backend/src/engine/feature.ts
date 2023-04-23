interface FeatureHeader {
    title: string;
    api: Record<string, unknown>;
    sources: Array<unknown>;
    fill_value: number;
    range: string;
}

interface FeatureProperties {
    parameter: Record<string, unknown>;
}

interface FeatureGeometry {
    type: 'Point';
    coordinates: Array<number>;
}

interface Feature {
    type: 'Feature';
    geometry: FeatureGeometry;
    properties: FeatureProperties;
    header: FeatureHeader;
    messages: Array<string>;
    parameters: Record<string, Record<string, unknown>>;
    times: {
        data: number;
        process: number;
    };
}

type FeaturesArray = Array<Feature>;