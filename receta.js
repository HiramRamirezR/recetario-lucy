import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

const db = getDatabase();
const storage = getStorage();

document.addEventListener('DOMContentLoaded', (event) => {
    const recipeDetails = document.getElementById('recipe-details');

    // Función para cargar los detalles de la receta
    function loadRecipe() {
        const urlParams = new URLSearchParams(window.location.search);
        const recipeName = urlParams.get('name');
        const recipeRef = ref(db, 'recipes/' + recipeName);

        get(recipeRef).then((snapshot) => {
            if (snapshot.exists()) {
                const recipe = snapshot.val();
                recipeDetails.innerHTML = `
                    <h2>${recipe.recipeName}</h2>
                    <img class="recipe-image" src="${recipe.imageUrl}" alt="Imagen de la receta" />
                    <p><strong>Categoría:</strong> ${recipe.category}</p>
                    <p><strong>Dificultad:</strong> ${recipe.difficulty}</p>
                    <p><strong>Ingredientes:</strong> ${recipe.ingredients}</p>
                    <p><strong>Instrucciones:</strong> ${recipe.instructions}</p>
                    <p><strong>Comentarios:</strong> ${recipe.comments}</p>
                    <button id="edit-recipe" onclick="location.href='formulario.html?name=${encodeURIComponent(recipe.recipeName)}'">Editar Receta</button>
                `;
            } else {
                recipeDetails.innerHTML = "<p>Receta no encontrada.</p>";
            }
        }).catch((error) => {
            console.error("Error al cargar la receta:", error);
            recipeDetails.innerHTML = "<p>Error al cargar la receta.</p>";
        });
    }

    // Cargar la receta al iniciar
    loadRecipe();
});