import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const db = getDatabase();
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
                <p>${recipe.description}</p>
                <p><strong>Categoría:</strong> ${recipe.category}</p>
                <p><strong>Dificultad:</strong> ${recipe.difficulty}</p>
                <p><strong>Ingredientes:</strong> ${recipe.ingredients}</p>
                <p><strong>Instrucciones:</strong> ${recipe.instructions}</p>
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