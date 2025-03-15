// Importar Firebase desde el CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, get, update, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

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

const form = document.getElementById('recipe-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const recipeName = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const prepTime = document.getElementById('prep-time').value;
    const comments = document.getElementById('comments').value;
    const difficulty = document.getElementById('difficulty').value;
    const servings = document.getElementById('servings').value;
    const category = document.getElementById('category').value;
    const procedure = document.getElementById('procedure').value;
    const recipeImage = document.getElementById('recipeImage').files[0];

    const recipeData = {
        recipeName,
        ingredients,
        prepTime,
        comments,
        difficulty,
        servings,
        category,
        procedure,
        imageUrl: null // Agrega un campo imageUrl inicialmente nulo
    };

    console.log('Intentando guardar la receta:', recipeData);

    const newRecipeRef = ref(database, 'recipes/' + recipeName);

    if (recipeImage) {
        const storage = getStorage();
        const imageRef = storageRef(storage, 'recipeImages/' + recipeImage.name); // Ruta en Storage
        try {
            const snapshot = await uploadBytes(imageRef, recipeImage);
            const imageUrl = await getDownloadURL(snapshot.ref);
            recipeData.imageUrl = imageUrl; // Actualiza imageUrl con la URL de descarga
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
            alert('Error al cargar la imagen.');
            return; // Detiene el proceso si hay un error en la carga de la imagen
        }
    }

    get(newRecipeRef).then((snapshot) => {
        if (snapshot.exists()) {
            // Actualizar la receta existente
            update(newRecipeRef, recipeData)
                .then(() => {
                    console.log("Receta actualizada con éxito.");
                    alert('Receta actualizada con éxito!');
                    form.reset();
                })
                .catch((error) => {
                    console.error("Error al actualizar la receta:", error);
                });
        } else {
            // Crear una nueva receta si no existe
            set(newRecipeRef, recipeData)
                .then(() => {
                    console.log("Receta guardada con éxito.");
                    alert('Receta guardada con éxito!');
                    form.reset();
                })
                .catch((error) => {
                    console.error("Error al guardar la receta:", error);
                });
        }
    });
});