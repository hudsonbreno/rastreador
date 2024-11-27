import express from "express";
import epocheHEX from './src/utils/epocheHEX.js'
import parseData from './src/utils/parseData.js';
import HEXtoDEC from './src/utils/HEXtoDEC.js';
import HEXtoTIME from './src/utils/HEXtoTIME.js';
import create_composition from './src/utils/create_composition.js';
import axios from 'axios';

const app = express();
const PORT = 3002;

const SFT9001 = express();
const PORT1 = 3003;

let contHorimetro = 0; 
const URL_CORRECTION = `http://localhost:${PORT}/dados`;
let lastReceivedData = null;

SFT9001.use(express.json)
SFT9001.listen(PORT1, () =>{
   console.log(`Equipamento rodando em http://localhost:${PORT1}`);

   setInterval(async() => {
    const DEVICEIP = "0A3F73";
  const TYPEMENS = "02";
  let DATA = {
    EPOCH : epocheHEX(),
    ANGLE : "8C9F", //8C9F LIMITE do ANGULO
    HODOMETRO : "017D7840", //Distância percorrida 
    HORIMETRO : "00000000", //Tempo que o equipamento
    COMPOSITION: "F800",
    // COMPOSITION : {
    //   GPS_FIXED : 1,
    //   GPS_HYSTORY : 0,
    //   IGNICAO : 1,
    //   LAT_COD : 1,
    //   LONG_COD : 1,
    //   RESERVADOS : "00000000000"
    // },
    SPEED : "3C",
    LAT : "013026A1",
    LONG : "029E72BD"
  }
  contHorimetro++;

  DATA.HORIMETRO = contHorimetro.toString().padStart(8, '0'); //INCREMENTAR RESET

  try {
    const response = await axios.post(URL_CORRECTION, {
      data: `50F7${DEVICEIP}${TYPEMENS}${DATA.EPOCH}${DATA.ANGLE}${DATA.HODOMETRO}${DATA.HORIMETRO}` +
      `${DATA.COMPOSITION}`+`${DATA.SPEED}${DATA.LAT}${DATA.LONG}73C4`
    });

    console.log(`[${new Date().toISOString()}] Resposta recebida do servidor:`, response.data);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Erro na requisição:`, error.message);
  }
   }, 1000);
});


app.use(express.json());
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


app.post('/dados', (req, res) => {
  
  try {
      console.log('Dados recebidos do equipamento:', req.body);

      const parsedData = parseData(req.body.data);

      const atualComposition = create_composition(parsedData.COMPOSITION)

      let processedData  = {
          //CABECALHO: parsedData.CABECALHO,
          DEVICEIP: HEXtoDEC(parsedData.DEVICEIP),
          TYPE: parsedData.TYPE,
          EPOCH: HEXtoTIME(parsedData.EPOCH), // Conversão para 2020-07-01T21:00:00.000Z
          ANGLE: HEXtoDEC(parsedData.ANGLE) / 100, //Conversão maximo 359.99
          HODOMETRO: HEXtoDEC(parsedData.HODOMETRO),
          HORIMETRO: HEXtoDEC(parsedData.HORIMETRO),
          //COMPOSITION: PARSEDCOMPOSITION(COMPOSITION),
          SPEED: HEXtoDEC(parsedData.SPEED),
          LAT: HEXtoDEC(parsedData.LAT) / 1000000 * atualComposition[0], //Conversão 6 casas decimais maximo 90 e -90
          LONG: HEXtoDEC(parsedData.LONG) / 1000000 * atualComposition[1], //Conversão 6 casas decimais maximo 180 e -180
          //RODAPE: parsedData.RODAPE
      }

      if(processedData.ANGLE > 360){
          throw new Error("Direção do equipamento incorreto, é maior que 360°");
      }

      if(processedData.LAT >90 || processedData.LAT <-90 || processedData.LONG > 180 || processedData.LONG < -180){
          throw new Error("Localização não fixada:a latitude ou longitude poderá estar incorreta ou com precisão insuficiente para encontrar o dispositivo em um mapa");
      }

      console.log(processedData)

      lastReceivedData = processedData;

      //ENVIAR RESPOSTA
      const TYPECOM = "01";
      const DATA = 1;
      res.send('Dados recebidos com sucesso!');
  }
  catch (error) {
      console.error("Erro no processamento dos dados:", error.message);
  }

});

app.get('/api/v1/location/:device_id', (req,res)=>{
  res.json({
    message: "Ultima mensagem recebida com sucesso!",
    data: lastReceivedData,
  }
  )
})