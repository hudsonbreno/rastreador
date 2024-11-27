function hexEpochToISO(hexEpoch) {
    const decimalEpoch = parseInt(hexEpoch, 16);
    const date = new Date(decimalEpoch * 1000);
    return date.toISOString();
}

export default hexEpochToISO