// Paso 1: Escuchar al dispositivo
await characteristicGlobal.startNotifications();
characteristicGlobal.addEventListener('characteristicvaluechanged', (event) => {
    // Cada vez que el lightstick "hable", el iPhone responde
    console.log("Lightstick dice: estoy aquí");
});

// Paso 2: La función de color que mantiene la conexión
async function enviarColor(hexColor) {
    // Enviamos el color
    await characteristicGlobal.writeValue(new Uint8Array([hexColor]));
    
    // IMPORTANTE: Mantenemos el canal abierto
    // Aquí es donde el script "engaña" al dispositivo 
    // enviando un pequeño "ping" cada 800ms
    setInterval(() => {
        if(characteristicGlobal) {
            characteristicGlobal.writeValue(new Uint8Array([0x00])); 
        }
    }, 800);
}
