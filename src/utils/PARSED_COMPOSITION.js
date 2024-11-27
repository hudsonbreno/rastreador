function parseComposition(binary) {
    // Garante que o binário tem pelo menos o comprimento necessário

    return {
        GPS_FIXED: binary[0],
        GPS_HISTORY: binary[1],
        IGNICAO: binary[2],
        LAT_COD: binary[3],
        LONG_COD: binary[4],
        RESERVADOS: binary.slice(5),
    };
}

export default parseComposition;