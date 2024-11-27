function parseData(Data) {

    return {
        CABECALHO: Data.slice(0, 4),
        DEVICEIP: Data.slice(4, 10),
        TYPE: Data.slice(10, 12),
        EPOCH: Data.slice(12, 20),
        ANGLE: Data.slice(20, 24),
        HODOMETRO: Data.slice(24, 32),
        HORIMETRO: Data.slice(32, 40),
        COMPOSITION: Data.slice(40, 44),
        // COMPOSITION: {
        //     GPS_FIXED: parseInt(Data.slice(34, 35), 16),
        //     GPS_HYSTORY: parseInt(Data.slice(35, 36), 16),
        //     IGNICAO: parseInt(Data.slice(36, 37), 16),
        //     LAT_COD: parseInt(Data.slice(37, 38), 16),
        //     LONG_COD: parseInt(Data.slice(38, 39), 16),
        //     RESERVADOS: Data.slice(39, 50)
        // },
        SPEED: Data.slice(44, 46),
        LAT: Data.slice(46, 54),
        LONG: Data.slice(54, 62),
        RODAPE: Data.slice(62, 66)
    };
}

export default parseData;