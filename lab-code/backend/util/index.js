
export let validate = (county, state) => {
    if (county === undefined || state === undefined) {
        return false;
    }
    return true;
}