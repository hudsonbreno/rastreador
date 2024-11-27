function epocheHEX(offset = -3){
    const currentDate = new Date();
    const utcEpoch = Math.floor(currentDate.getTime() / 1000); 
    const adjustedEpoch = utcEpoch + offset * 3600;
    return adjustedEpoch.toString(16).toUpperCase();

}

export default epocheHEX