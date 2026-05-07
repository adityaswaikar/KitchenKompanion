// hardcoded example recipes for recipes
window.recipes = [
    { name: "Chicken Fried Rice", category: "Dinner", ingredients: ["1 lb Chicken", "2 cups Rice", "2 Eggs", "2 tbsp Soy Sauce"], cookTime: "20 mins" },
    { name: "Pasta Carbonara", category: "Dinner", ingredients: ["1 box Pasta", "2 Eggs", "1 cup Cheese", "4 oz Bacon"], cookTime: "25 mins" },
    { name: "Tomato Soup", category: "Lunch", ingredients: ["6 Tomatoes", "1 cup Cream", "1 Onion", "2 tsp Garlic"], cookTime: "30 mins" },
    { name: "Avocado Toast", category: "Breakfast", ingredients: ["2 slices Bread", "1 Avocado", "1 Egg", "1 tsp Salt"], cookTime: "10 mins" },
    { name: "Trail Mix", category: "Snack", ingredients: ["1 cup Nuts", "1 cup Dried Fruit", "0.5 cup Chocolate Chips"], cookTime: "5 mins" },
];

function recipeCookMinutes(recipe) {
    const match = String(recipe.cookTime || "").match(/\d+/);
    return match ? Number(match[0]) : 0;
}

function recipeSearchText(recipe) {
    return [recipe.name, recipe.category, ...(recipe.ingredients || [])].join(" ").toLowerCase();
}

function parseRecipeIngredients(text) {
    return text
        .split("\n")
        .map(ing => ing.trim())
        .filter(ing => ing.length > 0);
}

function ingredientsHaveQuantities(ingredients) {
    return ingredients.every(ing => /^\d+(\.\d+)?\s+\S+/.test(ing));
}

window.renderRecipesTab = function (content) {
    const recipes = window.recipes || [];

    content.innerHTML = `
        <div class = "recipes-screen">
            <h1 class = "recipes-title">Recipes</h1>

            <div class = "recipes-searchBar">
                <input 
                    type = "text" 
                    id = "recipe-search" 
                    class = "recipe-search-bar" 
                    placeholder = "Search recipes or ingredients..."
                />

                <select id="recipe-filter" class="recipe-filter-dropdown">
                    <option value="all">Filter By: All</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                </select>

                <select id="recipe-time-filter" class="recipe-filter-dropdown">
                    <option value="all">Time: All</option>
                    <option value="15">15 min or less</option>
                    <option value="30">30 min or less</option>
                </select>

                <select id="recipe-sort" class="recipe-filter-dropdown">
                    <option value="default">Sort: Default</option>
                    <option value="time-asc">Shortest time first</option>
                </select>

            </div>

            <div class = "recipes-grid" id = "recipes-grid">
                ${recipes.map((recipe, index) => `
                    <div class="recipe-card" data-recipe-index="${index}" data-category="${recipe.category}" data-time="${recipeCookMinutes(recipe)}" data-search="${recipeSearchText(recipe)}">
                        <div class="recipe-card-content">
                            <h3 class="recipe-card-name">${recipe.name}</h3>
                            <p class="recipe-card-time">${recipe.cookTime}</p>
                        </div>
                    </div>
                `).join("")}
            </div>

            <button class="recipes-add-btn">
                <span class="recipes-add-icon" aria-hidden="true">+</span>
                <span>Add Recipe</span>
            </button>

            <div class="recipes-add-modal" style="display: none;">
                <div class="recipes-modal-panel">
                    <h2 class="recipes-modal-title">Create Recipe</h2>
                    <div class="recipes-form">
                        <div class="recipes-form-group">
                            <label for="recipe-name" class="recipes-label">Recipe Name</label>
                            <input type="text" id="recipe-name" class="recipes-input"/>
                        </div>
                        <div class="recipes-form-group">
                            <label for="recipe-cooktime" class="recipes-label">Cook Time (minutes)</label>
                            <input type="number" min="1" id="recipe-cooktime" class="recipes-input"/>
                        </div>
                        <div class="recipes-form-group">
                            <label for="recipe-category" class="recipes-label">Category</label>
                            <select id="recipe-category" class="recipe-filter-dropdown">
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                            </select>
                        </div>
                        <div class="recipes-form-group">
                            <label for="recipe-ingredients" class="recipes-label">Ingredients with quantities (one per line)</label>
                            <textarea id="recipe-ingredients" class="recipes-textarea"></textarea>
                        </div>
                        <div class="recipes-form-message" data-message="add" hidden></div>
                    </div>
                    <div class="recipes-modal-buttons">
                        <button class="recipes-modal-add" type="button">Add Recipe</button>
                        <button class="recipes-modal-cancel" type="button">Cancel</button>
                    </div>
                </div>
            </div>

            <div class="recipes-detail-modal" style="display: none;">
                <div class="recipes-modal-panel">
                    <h2 class="recipes-modal-title" id="recipe-detail-name"></h2>
                    <div class="recipes-detail-content">
                        <div class="recipes-detail-section">
                            <h3>Category</h3>
                            <p id="recipe-detail-category"></p>
                        </div>
                        <div class="recipes-detail-section">
                            <h3>Cook Time</h3>
                            <p id="recipe-detail-cooktime"></p>
                        </div>
                        <div class="recipes-detail-section">
                            <h3>Ingredients</h3>
                            <ul id="recipe-detail-ingredients"></ul>
                        </div>
                    </div>
                    <div class="recipes-modal-buttons">
                        <button class="recipes-detail-grocery" type="button">Add to grocery list</button>
                        <button class="recipes-detail-edit" type="button">Edit</button>
                        <button class="recipes-detail-delete" type="button">Delete</button>
                        <button class="recipes-detail-close" type="button">Close</button>
                    </div>
                </div>
            </div>

            <div class="recipes-edit-modal" style="display: none;">
                <div class="recipes-modal-panel">
                    <h2 class="recipes-modal-title">Edit Recipe</h2>
                    <div class="recipes-form">
                        <div class="recipes-form-group">
                            <label for="recipe-edit-name" class="recipes-label">Recipe Name</label>
                            <input type="text" id="recipe-edit-name" class="recipes-input"/>
                        </div>
                        <div class="recipes-form-group">
                            <label for="recipe-edit-cooktime" class="recipes-label">Cook Time (minutes)</label>
                            <input type="number" min="1" id="recipe-edit-cooktime" class="recipes-input"/>
                        </div>
                        <div class="recipes-form-group">
                            <label for="recipe-edit-category" class="recipes-label">Category</label>
                            <select id="recipe-edit-category" class="recipe-filter-dropdown">
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                            </select>
                        </div>
                        <div class="recipes-form-group">
                            <label for="recipe-edit-ingredients" class="recipes-label">Ingredients with quantities (one per line)</label>
                            <textarea id="recipe-edit-ingredients" class="recipes-textarea"></textarea>
                        </div>
                        <div class="recipes-form-message" data-message="edit" hidden></div>
                    </div>
                    <div class="recipes-modal-buttons">
                        <button class="recipes-edit-save" type="button">Save</button>
                        <button class="recipes-edit-cancel" type="button">Cancel</button>
                    </div>
                </div>
            </div>

            <div class="recipes-confirm-modal" style="display: none;">
                <div class="recipes-modal-panel">
                    <h2 class="recipes-modal-title">Delete Recipe?</h2>
                    <p class="recipes-confirm-copy">This will remove the recipe from this prototype.</p>
                    <div class="recipes-modal-buttons">
                        <button class="recipes-confirm-delete" type="button">Delete</button>
                        <button class="recipes-confirm-cancel" type="button">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // modal and event listeners
    const addRecipeBtn = content.querySelector(".recipes-add-btn");
    const addModal = content.querySelector(".recipes-add-modal");
    const addConfirmBtn = content.querySelector(".recipes-modal-add");
    const addCancelBtn = content.querySelector(".recipes-modal-cancel");

    const detailModal = content.querySelector(".recipes-detail-modal");
    const detailCloseBtn = content.querySelector(".recipes-detail-close");
    const detailEditBtn = content.querySelector(".recipes-detail-edit");
    const detailGroceryBtn = content.querySelector(".recipes-detail-grocery");
    const detailDeleteBtn = content.querySelector(".recipes-detail-delete");

    const confirmModal = content.querySelector(".recipes-confirm-modal");
    const confirmDeleteBtn = content.querySelector(".recipes-confirm-delete");
    const confirmCancelBtn = content.querySelector(".recipes-confirm-cancel");

    const editModal = content.querySelector(".recipes-edit-modal");
    const editSaveBtn = content.querySelector(".recipes-edit-save");
    const editCancelBtn = content.querySelector(".recipes-edit-cancel");
    const editNameInput = content.querySelector("#recipe-edit-name");
    const editCooktimeInput = content.querySelector("#recipe-edit-cooktime");
    const editCategoryInput = content.querySelector("#recipe-edit-category");
    const editIngredientsInput = content.querySelector("#recipe-edit-ingredients");

    const nameInput = content.querySelector("#recipe-name");
    const cooktimeInput = content.querySelector("#recipe-cooktime");
    const categoryInput = content.querySelector("#recipe-category");
    const ingredientsInput = content.querySelector("#recipe-ingredients");

    // eric - add the recipes search elements
    const recipesGrid = content.querySelector(".recipes-grid");
    const searchInput = content.querySelector("#recipe-search");
    const filterSelect = content.querySelector("#recipe-filter");
    const timeFilterSelect = content.querySelector("#recipe-time-filter");
    const sortSelect = content.querySelector("#recipe-sort");
    const addMessage = content.querySelector('[data-message="add"]');
    const editMessage = content.querySelector('[data-message="edit"]');


    let currentRecipeIndex = null;

    function showRecipeMessage(element, text) {
        element.textContent = text;
        element.hidden = !text;
    }

    function clearAddForm() {
        nameInput.value = "";
        cooktimeInput.value = "";
        categoryInput.value = "Dinner";
        ingredientsInput.value = "";
        showRecipeMessage(addMessage, "");
    }

    // open modal
    addRecipeBtn.addEventListener("click", () => {
        addModal.style.display = "flex";
        nameInput.focus();
    });

    // close modal
    addCancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        addModal.style.display = "none";
        clearAddForm();
    });


    // recipe card
    const recipeCards = content.querySelectorAll(".recipe-card");
    recipeCards.forEach(card => {
        card.addEventListener("click", () => {
            const index = parseInt(card.dataset.recipeIndex);
            currentRecipeIndex = index;
            const recipe = recipes[index];
            
            content.querySelector("#recipe-detail-name").textContent = recipe.name;
            content.querySelector("#recipe-detail-category").textContent = recipe.category;
            content.querySelector("#recipe-detail-cooktime").textContent = recipe.cookTime;
            
            const ingredientsList = content.querySelector("#recipe-detail-ingredients");
            ingredientsList.innerHTML = recipe.ingredients
                .map(ing => `<li>${ing}</li>`)
                .join("");
            
            detailModal.style.display = "flex";
        });
    });
    if (window.selectedRecipeToOpen) {
        const card = [...recipeCards].find(card => recipes[parseInt(card.dataset.recipeIndex)].name === window.selectedRecipeToOpen);
        window.selectedRecipeToOpen = null;
        card?.click();
    }

    // edit recipe
    detailEditBtn.addEventListener("click", () => {
        if (currentRecipeIndex !== null) {
            const recipe = recipes[currentRecipeIndex];
            editNameInput.value = recipe.name;
            editCooktimeInput.value = recipeCookMinutes(recipe);
            editCategoryInput.value = recipe.category;
            editIngredientsInput.value = recipe.ingredients.join("\n");
            showRecipeMessage(editMessage, "");
            
            detailModal.style.display = "none";
            editModal.style.display = "flex";
            editNameInput.focus();
        }
    });

    // delete recipe
    detailDeleteBtn.addEventListener("click", () => {
        if (currentRecipeIndex !== null) {
            detailModal.style.display = "none";
            confirmModal.style.display = "flex";
        }
    });

    confirmCancelBtn.addEventListener("click", () => {
        confirmModal.style.display = "none";
        detailModal.style.display = "flex";
    });

    confirmDeleteBtn.addEventListener("click", () => {
        if (currentRecipeIndex !== null) {
            window.recipes.splice(currentRecipeIndex, 1);
            confirmModal.style.display = "none";
            window.renderRecipesTab(content);
        }
    });

    detailGroceryBtn.addEventListener("click", () => {
        if (currentRecipeIndex !== null) {
            recipes[currentRecipeIndex].ingredients.forEach(window.addToGroceryList);
            document.querySelector('[data-tab="grocerylist"]')?.click();
        }
    });

    // edit save
    editSaveBtn.addEventListener("click", () => {
        if (currentRecipeIndex !== null) {
            const name = editNameInput.value.trim();
            const cookMinutes = Number(editCooktimeInput.value);
            const category = editCategoryInput.value;
            const ingredientsText = editIngredientsInput.value.trim();

            if (!name || !cookMinutes || !ingredientsText) {
                showRecipeMessage(editMessage, "Please fill in all fields.");
                return;
            }

            const ingredients = parseRecipeIngredients(ingredientsText);

            if (ingredients.length === 0) {
                showRecipeMessage(editMessage, "Please enter at least one ingredient.");
                return;
            }

            if (!ingredientsHaveQuantities(ingredients)) {
                showRecipeMessage(editMessage, "Start each ingredient with a quantity, such as 2 cups Rice.");
                return;
            }

            window.recipes[currentRecipeIndex] = { name, category, cookTime: `${cookMinutes} mins`, ingredients };
            editModal.style.display = "none";
            window.renderRecipesTab(content);
        }
    });

    // edit cancel
    editCancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        editModal.style.display = "none";
    });



    // close modal
    detailCloseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        detailModal.style.display = "none";
    });



    // add recipe
    addConfirmBtn.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const cookMinutes = Number(cooktimeInput.value);
        const category = categoryInput.value;
        const ingredientsText = ingredientsInput.value.trim();

        if (!name || !cookMinutes || !ingredientsText) {
            showRecipeMessage(addMessage, "Please fill in all fields.");
            return;
        }

        const ingredients = parseRecipeIngredients(ingredientsText);

        if (ingredients.length === 0) {
            showRecipeMessage(addMessage, "Please enter at least one ingredient.");
            return;
        }

        if (!ingredientsHaveQuantities(ingredients)) {
            showRecipeMessage(addMessage, "Start each ingredient with a quantity, such as 2 cups Rice.");
            return;
        }

        window.recipes.push({ name, category, cookTime: `${cookMinutes} mins`, ingredients });

        window.renderRecipesTab(content);
    });

    // add filtering/search -eb
    function applyFilters() {
        const filterValue = filterSelect.value;
        const timeValue = timeFilterSelect.value;
        const sortValue = sortSelect.value;
        const query = searchInput.value.trim().toLowerCase();
        const cards = Array.from(recipesGrid.querySelectorAll(".recipe-card"));

        cards.forEach(card => {
            const recipeTime = Number(card.dataset.time);
            const searchableText = card.dataset.search || "";

            const matchesSearch = !query || searchableText.includes(query);
            const matchesFilter = filterValue === "all" || card.dataset.category === filterValue;
            const matchesTime = timeValue === "all" || recipeTime <= Number(timeValue);

            card.style.display = matchesSearch && matchesFilter && matchesTime ? "" : "none";
        });

        if (sortValue === "time-asc") {
            cards
                .sort((a, b) => Number(a.dataset.time) - Number(b.dataset.time))
                .forEach(card => recipesGrid.appendChild(card));
        } else {
            cards
                .sort((a, b) => Number(a.dataset.recipeIndex) - Number(b.dataset.recipeIndex))
                .forEach(card => recipesGrid.appendChild(card));
        }
    }

    filterSelect.addEventListener("change", applyFilters);
    timeFilterSelect.addEventListener("change", applyFilters);
    sortSelect.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);

};
