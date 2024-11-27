import os from "os";

function getLocalIP() {
  const networkInterfaces = os.networkInterfaces();

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];

    for (const net of interfaces) {
      // Verifica se o endereço não é interno (não é localhost) e é IPv4
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }

  return null; // Caso nenhum IP válido seja encontrado
}

const localIP = getLocalIP();
console.log(`Endereço IP local: ${localIP}`);

export default getLocalIP