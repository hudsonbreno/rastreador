import HEXtoBIN from './HEXtoBIN.js';
import PARSEDCOMPOSITION from './PARSED_COMPOSITION.js';

function create_composition(data) {
    const COMPOSITION = HEXtoBIN(data)
    let LAT_COD,LONG_COD;

    let PARSEDCOMPOSITION_COD = PARSEDCOMPOSITION(COMPOSITION)

    if (PARSEDCOMPOSITION_COD.LAT_COD == 0) {
        LAT_COD = 1;
    } else {
        LAT_COD = -1;
    }
    if (PARSEDCOMPOSITION_COD.LONG_COD == 0) {
        LONG_COD = 1;
    } else {
        LONG_COD = -1;
    }
    return [LAT_COD, LONG_COD]
}

export default create_composition