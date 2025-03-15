import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const form = document.getElementById('recipe-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const recipeName = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const prepTime = document.getElementById('prep-time').value;
    const comments = document.getElementById('comments').value;
    const difficulty = document.getElementById('difficulty').value;
    const servings = document.getElementById('servings').value;
    const category = document.getElementById('category').value;
    const procedure = document.getElementById('procedure').value;

    const recipeData = {
        recipeName,
        ingredients,
        prepTime,
        comments,
        difficulty,
        servings,
        category,
        procedure
    };

    console.log('Intentando guardar la receta:', recipeData);

    const db = getDatabase(); // Obtén la instancia de la base de datos

    const newRecipeRef = ref(db, 'recipes/' + recipeName); // Usa ref() con la instancia y la ruta

    set(newRecipeRef, recipeData) // Usa set() con la referencia y los datos
        .then(() => {
            console.log('Receta guardada con éxito:', recipeName);
            alert('Receta guardada con éxito!');
            form.reset();
        })
        .catch((error) => {
            console.error('Error al guardar la receta: ', error);
        });
});