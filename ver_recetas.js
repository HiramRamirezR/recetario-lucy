import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const db = getDatabase();
const recipeList = document.getElementById('recipe-list');

// Función para cargar recetas desde Firebase
function loadRecipes() {
    const recipesRef = ref(db, 'recipes/');
    onValue(recipesRef, (snapshot) => {
        recipeList.innerHTML = ''; // Limpiar la lista antes de agregar nuevas recetas
        snapshot.forEach((childSnapshot) => {
            const recipe = childSnapshot.val();
            const recipeItem = document.createElement('div');
            recipeItem.classList.add('recipe-item');
            const recipeLink = document.createElement('a');
            recipeLink.href = `receta.html?name=${encodeURIComponent(recipe.recipeName)}`; // Enlace a la vista de la receta
            recipeLink.textContent = recipe.recipeName; // Nombre de la receta
            recipeItem.appendChild(recipeLink);
            recipeList.appendChild(recipeItem);
        });
    });
}

// Cargar recetas al iniciar
loadRecipes();

// Agregar lógica para filtrar recetas
document.getElementById('filter-button').addEventListener('click', () => {
    const searchName = document.getElementById('search-name').value.toLowerCase();
    const filterCategory = document.getElementById('filter-category').value;
    const filterDifficulty = document.getElementById('filter-difficulty').value;

    const recipesRef = ref(db, 'recipes/');
    onValue(recipesRef, (snapshot) => {
        recipeList.innerHTML = ''; // Limpiar la lista antes de agregar nuevas recetas
        snapshot.forEach((childSnapshot) => {
            const recipe = childSnapshot.val();
            const matchesName = recipe.recipeName.toLowerCase().includes(searchName);
            const matchesCategory = filterCategory === '' || recipe.category === filterCategory;
            const matchesDifficulty = filterDifficulty === '' || recipe.difficulty === filterDifficulty;

            if (matchesName && matchesCategory && matchesDifficulty) {
                const recipeItem = document.createElement('div');
                recipeItem.classList.add('recipe-item');
                const recipeLink = document.createElement('a');
                recipeLink.href = `receta.html?name=${encodeURIComponent(recipe.recipeName)}`; // Enlace a la vista de la receta
                recipeLink.textContent = recipe.recipeName; // Nombre de la receta
                recipeItem.appendChild(recipeLink);
                recipeList.appendChild(recipeItem);
            }
        });
    });
});