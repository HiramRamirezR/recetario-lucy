import { getDatabase, ref, get, set, update, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const db = getDatabase();
const urlParams = new URLSearchParams(window.location.search);
const recipeName = urlParams.get('name');

document.addEventListener('DOMContentLoaded', (event) => {
    if (recipeName) {
        const recipeRef = ref(db, 'recipes/' + recipeName);
        get(recipeRef).then((snapshot) => {
            if (snapshot.exists()) {
                const recipe = snapshot.val();
                document.getElementById('recipe-name').value = recipe.recipeName;
                document.getElementById('category').value = recipe.category;
                document.getElementById('difficulty').value = recipe.difficulty;
                document.getElementById('ingredients').value = recipe.ingredients;
                document.getElementById('procedure').value = recipe.procedure;
                document.getElementById('prep-time').value = recipe.prepTime;
                document.getElementById('servings').value = recipe.servings;
                document.getElementById('comments').value = recipe.comments;
                document.getElementById('recipeImage').value = recipe.imageUrl;
            } else {
                console.error("Receta no encontrada.");
            }
        }).catch((error) => {
            console.error("Error al cargar la receta:", error);
        });
    }

    document.getElementById('recipe-form').addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío del formulario

        const originalRecipeName = urlParams.get('name'); // Obtener el nombre original de la receta desde la URL
        const newRecipeName = document.getElementById('recipe-name').value;
        const recipeRef = ref(db, 'recipes/' + originalRecipeName);

        // Actualizar la receta existente
        update(recipeRef, {
            recipeName: newRecipeName, // Actualizar el nombre a nuevo
            category: document.getElementById('category').value,
            difficulty: document.getElementById('difficulty').value,
            ingredients: document.getElementById('ingredients').value,
            procedure: document.getElementById('procedure').value,
            prepTime: document.getElementById('prep-time').value,
            servings: document.getElementById('servings').value,
            comments: document.getElementById('comments').value,
            imageUrl: document.getElementById('recipeImage').value
        }).then(() => {
            // Si el nombre ha cambiado, eliminar la receta antigua
            if (originalRecipeName !== newRecipeName) {
                remove(recipeRef).then(() => {
                    console.log("Receta original eliminada y nueva receta guardada con éxito.");
                }).catch((error) => {
                    console.error("Error al eliminar la receta original:", error);
                });
            }
            console.log("Receta actualizada con éxito.");
        }).catch((error) => {
            console.error("Error al actualizar la receta:", error);
        });
    });
});