const firebaseConfig = {
apiKey: "AIzaSyATkiugT6y_B8chGR0fhrj-sWXs",
authDomain: "fc-kkbsng13-01.firebaseapp.com",
databaseURL: "https://fc-kkbsng13-01-default-rtdb.firebaseio.com/",
projectId: "fc-kkbsng13-01",
storageBucket: "fc-kkbsng13-01.appspot.com",
messagingSenderId: "535419100872",
appId: "1:535419100872:web:68c50a5cfb3436bf6441b4"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

let characteristicGlobal = null;

document.getElementById('btn-conectar').addEventListener('click', async () => {
try {
const device = await navigator.bluetooth.requestDevice({
filters: [{ namePrefix: 'EXO' }],
optionalServices: ['0000ff00-0000-1000-8000-00805f9b34fb']
});
  
const server = await device.gatt.connect();
  
const service = await server.getPrimaryService('0000ff00-0000-1000-8000-00805f9b34fb');
  
characteristicGlobal = await service.getCharacteristic('0000ff01-0000-1000-8000-00805f9b34fb');

  document.getElementById('status-conexion').innerText = "¡CONECTADO!";
  
} catch (error) {
document.getElementById('status-conexion').innerText = "Error";
}
  
});

async function enviarColor(color) {
if (!characteristicGlobal) return;
  
const comandos = {
"rojo": new Uint8Array([0x55, 0x01, 0xFF, 0x00, 0x00]),
"azul": new Uint8Array([0x55, 0x01, 0x00, 0x00, 0xFF]),
"morado": new Uint8Array([0x55, 0x01, 0xFF, 0x00, 0xFF])
};
  
await characteristicGlobal.writeValue(comandos[color]);
}

database.ref('colorEvento').on('value', (snapshot) => {
const datos = snapshot.val();
  
if (datos) enviarColor(datos.colorActivo);
  
});
