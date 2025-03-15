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
            if (recipe && recipe.recipeName) { // Verificar que recipe y recipeName existan
                const recipeItem = document.createElement('div');
                recipeItem.classList.add('recipe-item');
                const recipeLink = document.createElement('a');
                recipeLink.href = `receta.html?name=${encodeURIComponent(recipe.recipeName)}`; // Enlace a la vista de la receta
                recipeLink.textContent = recipe.recipeName; // Nombre de la receta
                recipeItem.appendChild(recipeLink);
                recipeList.appendChild(recipeItem);
            } else {
                console.warn("Receta sin nombre encontrada:", recipe);
            }
        });
    });
}

// Cargar recetas al iniciar
loadRecipes();

// Agregar lógica para filtrar recetas al escribir en el campo de búsqueda
document.getElementById('search-name').addEventListener('input', () => {
    const searchName = document.getElementById('search-name').value.toLowerCase();
    const filterCategory = document.getElementById('filter-category').value;
    const filterDifficulty = document.getElementById('filter-difficulty').value;

    const recipesRef = ref(db, 'recipes/');
    onValue(recipesRef, (snapshot) => {
        recipeList.innerHTML = ''; // Limpiar la lista antes de agregar nuevas recetas
        if (searchName === '') {
            // Si el campo de búsqueda está vacío, cargar todas las recetas
            snapshot.forEach((childSnapshot) => {
                const recipe = childSnapshot.val();
                if (recipe && recipe.recipeName) {
                    const recipeItem = document.createElement('div');
                    recipeItem.classList.add('recipe-item');
                    const recipeLink = document.createElement('a');
                    recipeLink.href = `receta.html?name=${encodeURIComponent(recipe.recipeName)}`;
                    recipeLink.textContent = recipe.recipeName;
                    recipeItem.appendChild(recipeLink);
                    recipeList.appendChild(recipeItem);
                }
            });
        } else {
            snapshot.forEach((childSnapshot) => {
                const recipe = childSnapshot.val();
                if (recipe && recipe.recipeName) {
                    const matchesName = recipe.recipeName.toLowerCase().includes(searchName);
                    const matchesCategory = filterCategory === '' || recipe.category === filterCategory;
                    const matchesDifficulty = filterDifficulty === '' || recipe.difficulty === filterDifficulty;

                    if (matchesName && matchesCategory && matchesDifficulty) {
                        const recipeItem = document.createElement('div');
                        recipeItem.classList.add('recipe-item');
                        const recipeLink = document.createElement('a');
                        recipeLink.href = `receta.html?name=${encodeURIComponent(recipe.recipeName)}`;
                        recipeLink.textContent = recipe.recipeName;
                        recipeItem.appendChild(recipeLink);
                        recipeList.appendChild(recipeItem);
                    }
                }
            });
        }
    });
});

// Agregar lógica para filtrar recetas por categoría
document.getElementById('filter-category').addEventListener('change', () => {
    const filterCategory = document.getElementById('filter-category').value;
    document.getElementById('search-name').value = ''; // Vaciar el campo de búsqueda

    const recipesRef = ref(db, 'recipes/');
    onValue(recipesRef, (snapshot) => {
        recipeList.innerHTML = ''; // Limpiar la lista antes de agregar nuevas recetas
        snapshot.forEach((childSnapshot) => {
            const recipe = childSnapshot.val();
            if (recipe && recipe.recipeName) {
                const matchesCategory = filterCategory === '' || recipe.category === filterCategory;

                if (matchesCategory) {
                    const recipeItem = document.createElement('div');
                    recipeItem.classList.add('recipe-item');
                    const recipeLink = document.createElement('a');
                    recipeLink.href = `receta.html?name=${encodeURIComponent(recipe.recipeName)}`;
                    recipeLink.textContent = recipe.recipeName;
                    recipeItem.appendChild(recipeLink);
                    recipeList.appendChild(recipeItem);
                }
            }
        });
    });
});

// Agregar lógica para filtrar recetas por dificultad
document.getElementById('filter-difficulty').addEventListener('change', () => {
    const filterDifficulty = document.getElementById('filter-difficulty').value;
    document.getElementById('search-name').value = ''; // Vaciar el campo de búsqueda

    const recipesRef = ref(db, 'recipes/');
    onValue(recipesRef, (snapshot) => {
        recipeList.innerHTML = ''; // Limpiar la lista antes de agregar nuevas recetas
        snapshot.forEach((childSnapshot) => {
            const recipe = childSnapshot.val();
            if (recipe && recipe.recipeName) {
                const matchesDifficulty = filterDifficulty === '' || recipe.difficulty === filterDifficulty;

                if (matchesDifficulty) {
                    const recipeItem = document.createElement('div');
                    recipeItem.classList.add('recipe-item');
                    const recipeLink = document.createElement('a');
                    recipeLink.href = `receta.html?name=${encodeURIComponent(recipe.recipeName)}`;
                    recipeLink.textContent = recipe.recipeName;
                    recipeItem.appendChild(recipeLink);
                    recipeList.appendChild(recipeItem);
                }
            }
        });
    });
});