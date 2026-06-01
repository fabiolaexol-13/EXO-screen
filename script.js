// ... mantén tu firebaseConfig igual ...
// Solo cambia la parte de enviarColor por esta más robusta:

async function enviarColor(color) {
  if (!characteristicGlobal) return;
  
  // Agregamos un comando de "Pre-encendido" para autenticar
  const handshake = new Uint8Array([0x55, 0x01, 0x01, 0x00, 0x00]);
  await characteristicGlobal.writeValue(handshake);
  
  // Breve pausa para que el chip procese la autenticación
  await new Promise(r => setTimeout(r, 100)); 
  
  const comandos = {
    "rojo": new Uint8Array([0x55, 0x01, 0xFF, 0x00, 0x00]),
    "azul": new Uint8Array([0x55, 0x01, 0x00, 0x00, 0xFF]),
    "morado": new Uint8Array([0x55, 0x01, 0xFF, 0x00, 0xFF]),
    "blanco": new Uint8Array([0x55, 0x01, 0xFF, 0xFF, 0xFF])
  };
  
  await characteristicGlobal.writeValue(comandos[color]);
}
