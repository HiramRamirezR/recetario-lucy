// Importar Firebase desde el CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAvpbAA8V6eYcGYLDhSxCOyonl8_9FSINY",
    authDomain: "recetario-62cc2.firebaseapp.com",
    projectId: "recetario-62cc2",
    storageBucket: "recetario-62cc2.firebasestorage.app",
    messagingSenderId: "873636175264",
    appId: "1:873636175264:web:de851a48429460f4dbd8c5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Hacer que la variable database sea accesible globalmente
window.database = database;