// hardcoded example recipes for recipes
window.recipes = [
    { name: "Chicken Fried Rice", category: "Dinner", ingredients: ["Chicken", "Rice", "Eggs", "Soy Sauce"], cookTime: "20 mins", allergens: ["Gluten-Free"] },
    { name: "Pasta Carbonara", category: "Dinner", ingredients: ["Pasta", "Eggs", "Cheese", "Bacon"], cookTime: "25 mins", allergens: [] },
    { name: "Tomato Soup", category: "Lunch", ingredients: ["Tomatoes", "Cream", "Onion", "Garlic"], cookTime: "30 mins", allergens: ["Vegetarian", "Gluten-Free"] },
    { name: "Avocado Toast", category: "Breakfast", ingredients: ["Bread", "Avocado", "Egg", "Salt"], cookTime: "10 mins", allergens: ["Vegetarian"] },
    { name: "Trail Mix", category: "Snack", ingredients: ["Nuts", "Dried Fruit", "Chocolate Chips"], cookTime: "5 mins", allergens: ["Vegan", "Gluten-Free"] },
];

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
                    placeholder = "Search recipes..."
                />

                <select id="recipe-filter" class="recipe-filter-dropdown">
                    <option value="all">Filter By: All</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                </select>

            </div>

            <div class = "recipes-grid" id = "recipes-grid">
                ${recipes.map((recipe, index) => {
                    const hasAllergens = recipe.allergens && recipe.allergens.length > 0;
                    const allergenLabel = hasAllergens ? recipe.allergens.join(", ") : "";
                    return `
                    <div class="recipe-card" data-recipe-index="${index}" data-category="${recipe.category}">
                        ${hasAllergens ? `<div class="recipe-card-allergen-badge" title="${allergenLabel}">⚠ ${allergenLabel}</div>` : ""}
                        <div class="recipe-card-content">
                            <h3 class="recipe-card-name">${recipe.name}</h3>
                            <p class="recipe-card-time">${recipe.cookTime}</p>
                        </div>
                    </div>`;
                }).join("")}
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
                            <label for="recipe-cooktime" class="recipes-label">Cook Time</label>
                            <input type="text" id="recipe-cooktime" class="recipes-input"/>
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
                            <label for="recipe-ingredients" class="recipes-label">Ingredients (comma-separated)</label>
                            <textarea id="recipe-ingredients" class="recipes-textarea"></textarea>
                        </div>
                        <div class="recipes-form-group">
                            <label class="recipes-label">Allergen / Dietary Tags</label>
                            <div class="recipe-allergen-tags" id="add-allergen-tags">
                                <label><input type="checkbox" value="Vegan"> Vegan</label>
                                <label><input type="checkbox" value="Vegetarian"> Vegetarian</label>
                                <label><input type="checkbox" value="Gluten-Free"> Gluten-Free</label>
                                <label><input type="checkbox" value="Dairy-Free"> Dairy-Free</label>
                                <label><input type="checkbox" value="Nut-Free"> Nut-Free</label>
                                <label><input type="checkbox" value="Organic"> Organic</label>
                            </div>
                        </div>
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
                        <div class="recipes-detail-section">
                            <h3>Allergen / Dietary Tags</h3>
                            <p id="recipe-detail-allergens"></p>
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
                            <label for="recipe-edit-cooktime" class="recipes-label">Cook Time</label>
                            <input type="text" id="recipe-edit-cooktime" class="recipes-input"/>
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
                            <label for="recipe-edit-ingredients" class="recipes-label">Ingredients (comma-separated)</label>
                            <textarea id="recipe-edit-ingredients" class="recipes-textarea"></textarea>
                        </div>
                        <div class="recipes-form-group">
                            <label class="recipes-label">Allergen / Dietary Tags</label>
                            <div class="recipe-allergen-tags" id="edit-allergen-tags">
                                <label><input type="checkbox" value="Vegan"> Vegan</label>
                                <label><input type="checkbox" value="Vegetarian"> Vegetarian</label>
                                <label><input type="checkbox" value="Gluten-Free"> Gluten-Free</label>
                                <label><input type="checkbox" value="Dairy-Free"> Dairy-Free</label>
                                <label><input type="checkbox" value="Nut-Free"> Nut-Free</label>
                                <label><input type="checkbox" value="Organic"> Organic</label>
                            </div>
                        </div>
                    </div>
                    <div class="recipes-modal-buttons">
                        <button class="recipes-edit-save" type="button">Save</button>
                        <button class="recipes-edit-cancel" type="button">Cancel</button>
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


    let currentRecipeIndex = null;

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
        nameInput.value = "";
        cooktimeInput.value = "";
        categoryInput.value = "Dinner";
        ingredientsInput.value = "";
        content.querySelectorAll("#add-allergen-tags input").forEach(cb => cb.checked = false);
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
            content.querySelector("#recipe-detail-allergens").textContent =
                (recipe.allergens && recipe.allergens.length) ? recipe.allergens.join(", ") : "None";

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
            editCooktimeInput.value = recipe.cookTime;
            editCategoryInput.value = recipe.category;
            editIngredientsInput.value = recipe.ingredients.join(", ");
            content.querySelectorAll("#edit-allergen-tags input").forEach(cb => {
                cb.checked = (recipe.allergens || []).includes(cb.value);
            });

            detailModal.style.display = "none";
            editModal.style.display = "flex";
            editNameInput.focus();
        }
    });

    // delete recipe
    detailDeleteBtn.addEventListener("click", () => {
        if (currentRecipeIndex !== null) {
            if (confirm("Are you sure you want to delete this recipe?")) {
                window.recipes.splice(currentRecipeIndex, 1);
                detailModal.style.display = "none";
                window.renderRecipesTab(content);
            }
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
            const cookTime = editCooktimeInput.value.trim();
            const category = editCategoryInput.value;
            const ingredientsText = editIngredientsInput.value.trim();

            if (!name || !cookTime || !ingredientsText) {
                alert("Please fill in all fields");
                return;
            }

            const ingredients = ingredientsText
                .split(",")
                .map(ing => ing.trim())
                .filter(ing => ing.length > 0);

            if (ingredients.length === 0) {
                alert("Please enter at least one ingredient");
                return;
            }

            const allergens = [...content.querySelectorAll("#edit-allergen-tags input:checked")].map(cb => cb.value);
            window.recipes[currentRecipeIndex] = { name, category, cookTime, ingredients, allergens };
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
        const cookTime = cooktimeInput.value.trim();
        const category = categoryInput.value;
        const ingredientsText = ingredientsInput.value.trim();

        if (!name || !cookTime || !ingredientsText) {
            alert("Please fill in all fields");
            return;
        }

        const ingredients = ingredientsText
            .split(",")
            .map(ing => ing.trim())
            .filter(ing => ing.length > 0);

        if (ingredients.length === 0) {
            alert("Please enter at least one ingredient");
            return;
        }

        const allergens = [...content.querySelectorAll("#add-allergen-tags input:checked")].map(cb => cb.value);
        window.recipes.push({ name, category, cookTime, ingredients, allergens });

        window.renderRecipesTab(content);
    });

    // add filtering/search -eb
    function applyFilters() {
        const filterValue = filterSelect.value;
        const query = searchInput.value.trim().toLowerCase();

        recipesGrid.querySelectorAll(".recipe-card").forEach(card => {
            const recipeName = card.querySelector(".recipe-card-name").textContent.trim().toLowerCase();

            const matchesSearch = !query || recipeName.includes(query);
            const matchesFilter = filterValue === "all" || card.dataset.category === filterValue;

            card.style.display = matchesSearch && matchesFilter ? "" : "none";
        });
    }

    filterSelect.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);

};
