// Importar Firebase desde el CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, get, update, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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

// Agregar lógica para actualizar la receta existente si ya existe, en lugar de crear una nueva receta
const recipeName = document.getElementById('recipe-name').value;
const recipeRef = ref(database, 'recipes/' + recipeName);

get(recipeRef).then((snapshot) => {
    if (snapshot.exists()) {
        // Actualizar la receta existente
        update(recipeRef, {
            recipeName: document.getElementById('recipe-name').value,
            category: document.getElementById('category').value,
            difficulty: document.getElementById('difficulty').value,
            ingredients: document.getElementById('ingredients').value,
            procedure: document.getElementById('procedure').value,
            prepTime: document.getElementById('prep-time').value,
            servings: document.getElementById('servings').value,
            comments: document.getElementById('comments').value
        }).then(() => {
            console.log("Receta actualizada con éxito.");
        }).catch((error) => {
            console.error("Error al actualizar la receta:", error);
        });
    } else {
        // Crear una nueva receta si no existe
        set(recipeRef, {
            recipeName: document.getElementById('recipe-name').value,
            category: document.getElementById('category').value,
            difficulty: document.getElementById('difficulty').value,
            ingredients: document.getElementById('ingredients').value,
            procedure: document.getElementById('procedure').value,
            prepTime: document.getElementById('prep-time').value,
            servings: document.getElementById('servings').value,
            comments: document.getElementById('comments').value
        }).then(() => {
            console.log("Receta guardada con éxito.");
        }).catch((error) => {
            console.error("Error al guardar la receta:", error);
        });
    }
});