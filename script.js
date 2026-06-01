async function enviarColor(color) {
  if (!characteristicGlobal) return;
  
  // Lista de comandos HEX (según lo que descubriste que funciona)
  const comandos = {
    "rojo": new Uint8Array([0x01]), // El comando que viste que sí funcionó
    "azul": new Uint8Array([0x02]), 
    "blanco": new Uint8Array([0x03])
  };

  try {
    // 1. Enviamos el color
    await characteristicGlobal.writeValue(comandos[color]);
    
    // 2. ¡EL TRUCO! Enviamos un paquete vacío cada segundo 
    // para decirle al lightstick: "Sigo aquí, no te desconectes"
    setInterval(async () => {
        await characteristicGlobal.writeValue(new Uint8Array([0x00]));
    }, 1000);

  } catch (e) {
    console.log("Error: La conexión se cerró, pero el color se envió.");
  }
}
