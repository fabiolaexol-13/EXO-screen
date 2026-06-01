// Configuración de tu proyecto de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyATkiugT6y_B8chGR0fhrj-sWXs",
  authDomain: "fc-kkbsng13-01.firebaseapp.com",
  databaseURL: "https://fc-kkbsng13-01-default-rtdb.firebaseio.com/",
  projectId: "fc-kkbsng13-01",
  storageBucket: "fc-kkbsng13-01.appspot.com",
  messagingSenderId: "535419100872",
  appId: "1:535419100872:web:68c50a5cfb3436bf6441b4"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Lógica de simulación Bluetooth nativa para Bluefy
document.getElementById('btn-conectar').addEventListener('click', async () => {
  document.getElementById('status-conexion').innerText = "Buscando EXO lightstick por Bluetooth...";
  
  try {
    // Aquí invocamos el Bluetooth real. Al estar en GitHub, Bluefy sí abrirá la ventana flotante.
    const dispositivo = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true, 
      optionalServices: ['0000ff00-0000-1000-8000-00805f9b34fb'] 
    });
    
    document.getElementById('status-conexion').innerText = "Estado: ¡Conectado a " + dispositivo.name + "!";
  } catch (error) {
    document.getElementById('status-conexion').innerText = "Error: Conexión cancelada o no soportada.";
    console.log(error);
  }
});

// Control de botones de la Administradora
document.querySelectorAll('.btn-color').forEach(boton => {
  boton.addEventListener('click', () => {
    let texto = boton.innerText;
    let colorId = "blanco";
    if (texto.includes('Rojo')) colorId = "rojo";
    if (texto.includes('Azul')) colorId = "azul";
    if (texto.includes('Morado')) colorId = "morado";
    if (texto.includes('Rosa')) colorId = "rosa";
    if (texto.includes('Verde')) colorId = "verde";
    if (texto.includes('Amarillo')) colorId = "amarillo";

    database.ref('colorEvento').set({
      colorActivo: colorId,
      timestamp: Date.now()
    });
  });
});

// Escuchador Firebase
database.ref('colorEvento').on('value', (snapshot) => {
  const datos = snapshot.val();
  if (datos) {
    document.getElementById('color-actual-db').innerText = "Color Emitido: " + datos.colorActivo.toUpperCase();
  }
});
