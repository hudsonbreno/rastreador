Simulador SFT9001 e Servidor de Processamento de Mensagens

A utilização do nome foi escolhida como rastreador, pois ela tem como função apenas vizualizar o chamado do equipamento em questão, STF9001. 

Este projeto utiliza o framework Express para implementar um simulador do equipamento SFT9001 e um servidor responsável por receber, processar e traduzir as mensagens enviadas pelo simulador.

Express: Um framework para gerenciar as rotas e lógica do servidor.

Funcionalidades
Simulador do SFT9001:

Envia dados simulados periodicamente para o servidor.
Dados incluem informações como localização, velocidade, ângulo, hodômetro, horímetro, e outros parâmetros.
Servidor de Processamento:

Recebe as mensagens do simulador via requisições POST.
Processa e traduz os dados em um formato mais legível.
Valida os valores (latitude, longitude, ângulo) para garantir a integridade das informações.
API para Última Localização:

.
├── src
│   └── utils
│       ├── epocheHEX.js          # Gera o timestamp no formato hexadecimal.
│       ├── parseData.js          # Interpreta os dados recebidos no formato hexadecimal.
│       ├── parseData.js          # Converte o Hexadecimal em informações uteis para os dados do veiculo.
│       ├── HEXtoDEC.js           # Converte valores de hexadecimal para decimal.
│       ├── HEXtoTIME.js          # Converte timestamps em hexadecimal para o formato de data legível.
|       ├── HEXtoBIN.js           # Converte os valores de hexadecimal para binario.
|       ├── HEXtoBIN.js           # Executa um ipconfig e pega seus dados.
│       └── create_composition.js # Processa a composição da mensagem.
└── README.md                      # Documentação do projeto.
Rotas
Simulador (Porta 3003)
Simula o envio de mensagens do equipamento SFT9001 para o servidor.
Os dados são enviados para o endpoint: http://localhost:3002/dados.
Servidor (Porta 3002)
POST /dados

Recebe os dados do simulador.
Processa, traduz e valida as informações.
Exemplo de resposta:

{
  "message": "Dados recebidos com sucesso!"
}
GET /api/v1/location/:device_id


Retorna os últimos dados processados do dispositivo.
Exemplo de resposta:

{
  "message": "Ultima mensagem recebida com sucesso!",
  "data": {
    "DEVICEIP": 671315,
    "TYPE": "02",
    "EPOCH": "2024-11-26T15:45:30.000Z",
    "ANGLE": 45.67,
    "HODOMETRO": 123456,
    "HORIMETRO": 654321,
    "SPEED": 60,
    "LAT": -23.55052,
    "LONG": -46.633308
  }
}

Como Executar o Projeto
Pré-requisitos
Node.js (v14 ou superior)
npm (ou yarn)
Passos
Clone o repositório,
npm install
npm start

Enviar requisições para o endpoint de dados: http://localhost:3002/dados.
Consultar a última localização em: http://localhost:3002/api/v1/location/:device_id.
Fluxo de Funcionamento
O simulador SFT9001 envia uma mensagem com dados formatados para o endpoint /dados do servidor a cada 5 segundo.
O servidor processa os dados:
Converte valores de hexadecimal para decimal.
Calcula latitudes e longitudes.
Valida informações como ângulo e localização.
Os dados são armazenados e podem ser consultados pelo endpoint /api/v1/location/:device_id.
Exemplo de Execução
Logs do Simulador:

[2024-11-27T00:41:45.748Z] Resposta recebida do servidor: Dados recebidos com sucesso!
Dados recebidos do equipamento: {
  data: '50F70A3F73026746409A8C9F017D784000000147F8003C013026A1029E72BD73C4'
}
{
  DEVICEIP: 671603,
  TYPE: '02',
  EPOCH: '2024-11-26T21:41:46.000Z',
  ANGLE: 359.99,
  HODOMETRO: 25000000,
  HORIMETRO: 327,
  SPEED: 60,
  LAT: -19.932833,
  LONG: -43.938493
}
