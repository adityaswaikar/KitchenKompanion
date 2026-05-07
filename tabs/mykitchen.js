// Hardcoded examples for my kitchen and inventory info
window.kitchenItems = [
    { name: "Milk", quantity: "1", unit: "carton", added: "April 1, 2026", expires: "April 8, 2026", category: "Dairy" },
    { name: "Cheese", quantity: "2", unit: "blocks", added: "March 20, 2026", expires: "April 20, 2026", category: "Dairy" },
    { name: "Eggs", quantity: "12", unit: "eggs", added: "March 16, 2026", expires: "April 6, 2026", category: "Dairy" },
    { name: "Chicken", quantity: "2", unit: "pounds", added: "April 3, 2026", expires: "April 7, 2026", category: "Meat" },
    { name: "Rice", quantity: "1", unit: "bag", added: "March 5, 2026", expires: "June 1, 2026", category: "Pantry" },
    { name: "Pasta", quantity: "3", unit: "boxes", added: "March 8, 2026", expires: "July 15, 2026", category: "Pantry" },
    { name: "Bread", quantity: "1", unit: "loaf", added: "April 3, 2026", expires: "April 9, 2026", category: "Pantry" },
    { name: "Apples", quantity: "8", unit: "apples", added: "April 1, 2026", expires: "April 14, 2026", category: "Produce" },
    { name: "Spinach", quantity: "1", unit: "bag", added: "April 4, 2026", expires: "April 10, 2026", category: "Produce" },
    { name: "Tomatoes", quantity: "5", unit: "tomatoes", added: "April 2, 2026", expires: "April 11, 2026", category: "Produce" },
];

window.renderMyKitchenTab = function (content) {
    const items = window.kitchenItems;

    content.innerHTML = `
        <section class="kitchen-screen">
            <h1 class="kitchen-title">My Kitchen</h1>

            <div class="kitchen-controls">
                <input class="kitchen-field" id="kitchen-search" type="text" placeholder="Search items...">
                <select class="kitchen-field" id="kitchen-filter">
                    <option value="all">Filter By: All</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Meat">Meat</option>
                    <option value="Produce">Produce</option>
                    <option value="Pantry">Pantry</option>
                    <option value="expiring">Expiring This Week</option>
                </select>
            </div>

            <div class="kitchen-grid"></div>

            <button class="kitchen-add-btn">
                <span class="kitchen-add-icon" aria-hidden="true">+</span>
                <span>Add Item</span>
            </button>

            <div class="kitchen-modal" hidden>
                <div class="kitchen-modal-panel">
                    <h2 class="kitchen-modal-title">Item Details</h2>
                    <div class="kitchen-detail-list">
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Name</div>
                            <div class="kitchen-detail-value" data-detail="name"></div>
                            <input type="text" data-detail="name"/>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Quantity</div>
                            <div class="kitchen-detail-value" data-detail="quantity"></div>
                            <input type="text" data-detail="quantity"/>
                            <select data-detail="editUnit">
                                <option value="">Unit</option>
                                <option value="each">Each</option>
                                <option value="carton">Carton</option>
                                <option value="bag">Bag</option>
                                <option value="bunch">Bunch</option>
                                <option value="lbs">Lbs</option>
                                <option value="oz">Oz</option>
                                <option value="cups">Cups</option>
                                <option value="boxes">Boxes</option>
                                <option value="loaf">Loaf</option>
                            </select>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Date Added</div>
                            <div class="kitchen-detail-value" data-detail="added"></div>
                            <input type="date" data-detail="added"/>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Expiration Date</div>
                            <div class="kitchen-detail-value" data-detail="expires"></div>
                            <input type="date" data-detail="expires"/>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Category</div>
                            <div class="kitchen-detail-value" data-detail="category"></div>
                            <select data-detail="editCategory">
                                <option value="">Select a category</option>
                                <option value="Dairy">Dairy</option>
                                <option value="Meat">Meat</option>
                                <option value="Produce">Produce</option>
                                <option value="Pantry">Pantry</option>
                                <option value="Beverages">Beverages</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Dietary Tags</div>
                            <div class="kitchen-detail-value" data-detail="dietaryTags"></div>
                            <div class="edit-dietary-tags">
                                <label><input type="checkbox" value="Vegan"> Vegan</label>
                                <label><input type="checkbox" value="Vegetarian"> Vegetarian</label>
                                <label><input type="checkbox" value="Gluten-Free"> Gluten-Free</label>
                                <label><input type="checkbox" value="Dairy-Free"> Dairy-Free</label>
                                <label><input type="checkbox" value="Nut-Free"> Nut-Free</label>
                                <label><input type="checkbox" value="Organic"> Organic</label>
                            </div>
                        </div>
                    </div>
                    <div class="kitchen-modal-buttons">
                        <button class="kitchen-modal-close" type="button">Close</button>
                        <button class="kitchen-modal-edit" type="button">Edit</button>
                        <button class="kitchen-modal-confirm" type="button">Confirm</button>
                        <button class="kitchen-modal-cancel" type="button">Cancel</button>
                        <button class="kitchen-modal-delete" type="button">Delete</button>
                    </div>
                </div>
            </div>

            <div class="kitchen-add-modal" hidden>
                <div class="kitchen-modal-panel">
                    <h2 class="kitchen-modal-title">Add New Item</h2>
                    <div class="kitchen-detail-list">
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Name</div>
                            <input type="text" data-detail="addName"/>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Quantity</div>
                            <input type="text" data-detail="addQuantity"/>
                            <select data-detail="addUnit">
                                <option value="">Unit</option>
                                <option value="each">Each</option>
                                <option value="carton">Carton</option>
                                <option value="bag">Bag</option>
                                <option value="bunch">Bunch</option>
                                <option value="lbs">Lbs</option>
                                <option value="oz">Oz</option>
                                <option value="cups">Cups</option>
                                <option value="boxes">Boxes</option>
                                <option value="loaf">Loaf</option>
                            </select>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Date Added</div>
                            <input type="date" data-detail="addAdded"/>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Expiration Date</div>
                            <input type="date" data-detail="addExpires"/>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Category</div>
                            <select data-detail="addCategory">
                                <option value="">Select a category</option>
                                <option value="Dairy">Dairy</option>
                                <option value="Meat">Meat</option>
                                <option value="Produce">Produce</option>
                                <option value="Pantry">Pantry</option>
                                <option value="Beverages">Beverages</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Dietary Tags</div>
                            <div class="add-dietary-tags">
                                <label><input type="checkbox" value="Vegan"> Vegan</label>
                                <label><input type="checkbox" value="Vegetarian"> Vegetarian</label>
                                <label><input type="checkbox" value="Gluten-Free"> Gluten-Free</label>
                                <label><input type="checkbox" value="Dairy-Free"> Dairy-Free</label>
                                <label><input type="checkbox" value="Nut-Free"> Nut-Free</label>
                                <label><input type="checkbox" value="Organic"> Organic</label>
                            </div>
                        </div>
                    </div>
                    <div class="kitchen-modal-buttons">
                        <button class="kitchen-modal-add" type="button">Add</button>
                        <button class="kitchen-modal-add-cancel" type="button">Cancel</button>
                    </div>
                </div>
            </div>
        </section>
    `;

    const grid = content.querySelector(".kitchen-grid");
    const modal = content.querySelector(".kitchen-modal");
    const addModalElement = content.querySelector(".kitchen-add-modal");

    const closeButton = content.querySelector(".kitchen-modal-close");
    const editButton = content.querySelector(".kitchen-modal-edit");
    const confirmButton = content.querySelector(".kitchen-modal-confirm");
    const cancelButton = content.querySelector(".kitchen-modal-cancel");
    const deleteButton = content.querySelector(".kitchen-modal-delete");

    const addItemButton = content.querySelector(".kitchen-add-btn");
    const confirmAddButton = content.querySelector(".kitchen-modal-add");
    const cancelAddButton = content.querySelector(".kitchen-modal-add-cancel");

    let isEditing = false;
    let currItem = null;

    function toDateInputValue(dateValue) {
        const date = new Date(dateValue);
        if (Number.isNaN(date.getTime())) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function toDisplayDate(dateValue) {
        if (!dateValue) return "";
        const date = new Date(`${dateValue}T00:00:00`);
        if (Number.isNaN(date.getTime())) return "";
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    const detailFields = {
        name: content.querySelector('[data-detail="name"]'),
        quantity: content.querySelector('[data-detail="quantity"]'),
        added: content.querySelector('[data-detail="added"]'),
        expires: content.querySelector('[data-detail="expires"]'),
        category: content.querySelector('[data-detail="category"]'),
    };

    const inputFields = {
        name: content.querySelector('input[data-detail="name"]'),
        quantity: content.querySelector('input[data-detail="quantity"]'),
        unit: content.querySelector('select[data-detail="editUnit"]'),
        added: content.querySelector('input[data-detail="added"]'),
        expires: content.querySelector('input[data-detail="expires"]'),
        category: content.querySelector('select[data-detail="editCategory"]'),
    };

    const addFields = {
        name: content.querySelector('input[data-detail="addName"]'),
        quantity: content.querySelector('input[data-detail="addQuantity"]'),
        unit: content.querySelector('select[data-detail="addUnit"]'),
        added: content.querySelector('input[data-detail="addAdded"]'),
        expires: content.querySelector('input[data-detail="addExpires"]'),
        category: content.querySelector('select[data-detail="addCategory"]'),
    };

    function renderGrid() {
        grid.innerHTML = items.map((item, index) => `
            <div class="kitchen-card" data-item-index="${index}" data-category="${item.category}" data-expires="${item.expires}">
                <div class="kitchen-card-name">${item.name}</div>
                <div class="kitchen-card-quantity">
                    <span class="kitchen-card-quantity-number">${item.quantity}</span> ${item.unit}
                    <button class="decrement-button" data-item-index="${index}">Use 1</button>
                </div>
                <div class="kitchen-card-category">${item.category}</div>
                <div class="kitchen-card-expires">Expires: ${item.expires}</div>
            </div>
        `).join("");

        grid.querySelectorAll(".decrement-button").forEach(button => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                const idx = Number(event.target.dataset.itemIndex);
                const item = items[idx];
                const card = content.querySelector(`.kitchen-card[data-item-index="${idx}"]`);
                if (item.quantity > 1) {
                    item.quantity--;
                    card.querySelector(".kitchen-card-quantity-number").textContent = item.quantity;
                } else {
                    items.splice(idx, 1);
                    renderGrid();
                }
            });
        });
    }

    function openModal(item) {
        detailFields.name.textContent = item.name;
        detailFields.quantity.textContent = `${item.quantity} ${item.unit}`;
        detailFields.added.textContent = item.added;
        detailFields.expires.textContent = item.expires;
        detailFields.category.textContent = item.category;

        modal.hidden = false;
        isEditing = false;

        closeButton.hidden = false;
        editButton.hidden = false;
        inputFields.name.hidden = true;
        inputFields.quantity.hidden = true;
        inputFields.added.hidden = true;
        inputFields.expires.hidden = true;
        inputFields.unit.hidden = true;
        inputFields.category.hidden = true;
        confirmButton.hidden = true;
        cancelButton.hidden = true;
        deleteButton.hidden = true;
        detailFields.name.hidden = false;
        detailFields.quantity.hidden = false;
        detailFields.added.hidden = false;
        detailFields.expires.hidden = false;
        detailFields.category.hidden = false;

        content.querySelector(".edit-dietary-tags").hidden = true;
        content.querySelectorAll(".edit-dietary-tags input").forEach(cb => cb.disabled = true);
        content.querySelectorAll(".edit-dietary-tags input").forEach(cb => {
            cb.checked = item.dietaryTags && item.dietaryTags.includes(cb.value);
        });

        content.querySelector('[data-detail="dietaryTags"]').hidden = false;
        content.querySelector('[data-detail="dietaryTags"]').textContent = item.dietaryTags?.join(", ") || "None";

        currItem = item;
    }

    function closeModal() {
        currItem = null;
        modal.hidden = true;
    }

    function cancelModal() {
        openModal(currItem);
    }

    function confirmModal() {
        currItem.name = inputFields.name.value;
        currItem.quantity = Number(inputFields.quantity.value);
        currItem.unit = inputFields.unit.value;
        currItem.added = toDisplayDate(inputFields.added.value);
        currItem.expires = toDisplayDate(inputFields.expires.value);
        currItem.category = inputFields.category.value;
        currItem.dietaryTags = [...content.querySelectorAll(".edit-dietary-tags input:checked")].map(cb => cb.value);

        renderGrid();
        openModal(currItem);
    }

    function editModal() {
        isEditing = true;

        confirmButton.hidden = false;
        cancelButton.hidden = false;
        deleteButton.hidden = false;
        inputFields.name.hidden = false;
        inputFields.quantity.hidden = false;
        inputFields.added.hidden = false;
        inputFields.expires.hidden = false;
        inputFields.unit.hidden = false;
        inputFields.category.hidden = false;

        inputFields.name.value = currItem.name;
        inputFields.quantity.value = currItem.quantity;
        inputFields.added.value = toDateInputValue(currItem.added);
        inputFields.expires.value = toDateInputValue(currItem.expires);
        inputFields.unit.value = currItem.unit;
        inputFields.category.value = currItem.category;

        closeButton.hidden = true;
        editButton.hidden = true;
        detailFields.name.hidden = true;
        detailFields.quantity.hidden = true;
        detailFields.added.hidden = true;
        detailFields.expires.hidden = true;
        detailFields.category.hidden = true;

        content.querySelectorAll(".edit-dietary-tags input").forEach(cb => cb.disabled = false);
        content.querySelectorAll(".edit-dietary-tags input").forEach(cb => {
            cb.checked = (currItem.dietaryTags || []).includes(cb.value);
        });
        content.querySelector('[data-detail="dietaryTags"]').hidden = true;
        content.querySelector(".edit-dietary-tags").hidden = false;
    }

    function deleteModal() {
        const index = items.indexOf(currItem);
        items.splice(index, 1);
        closeModal();
        renderGrid();
    }

    function openAddModal() {
        addModalElement.hidden = false;
        addFields.name.value = "";
        addFields.quantity.value = "";
        addFields.unit.value = "";
        addFields.added.value = "";
        addFields.expires.value = "";
        addFields.category.value = "";
        content.querySelectorAll(".add-dietary-tags input").forEach(cb => cb.checked = false);
    }

    function cancelAddModal() {
        addModalElement.hidden = true;
    }

    function confirmAddModal() {
        const newItem = {
            name: addFields.name.value,
            quantity: Number(addFields.quantity.value),
            unit: addFields.unit.value,
            added: toDisplayDate(addFields.added.value),
            expires: toDisplayDate(addFields.expires.value),
            category: addFields.category.value,
            dietaryTags: [...content.querySelectorAll(".add-dietary-tags input:checked")].map(cb => cb.value),
        };
        items.push(newItem);
        renderGrid();
        cancelAddModal();
    }

    grid.addEventListener("click", (event) => {
        const button = event.target.closest(".kitchen-card");
        if (!button) return;
        openModal(items[Number(button.dataset.itemIndex)]);
    });

    closeButton.addEventListener("click", closeModal);
    editButton.addEventListener("click", editModal);
    cancelButton.addEventListener("click", cancelModal);
    confirmButton.addEventListener("click", confirmModal);
    deleteButton.addEventListener("click", deleteModal);
    addItemButton.addEventListener("click", openAddModal);
    confirmAddButton.addEventListener("click", confirmAddModal);
    cancelAddButton.addEventListener("click", cancelAddModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
    });

    const filterSelect = content.querySelector("#kitchen-filter");
    const searchInput = content.querySelector("#kitchen-search");

    function applyFilters() {
        const filterValue = filterSelect.value;
        const query = searchInput.value.trim().toLowerCase();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        grid.querySelectorAll(".kitchen-card").forEach(card => {
            const matchesSearch = !query || card.textContent.trim().toLowerCase().includes(query);
            let matchesFilter = true;
            if (filterValue === "expiring") {
                const daysLeft = Math.ceil((new Date(card.dataset.expires) - today) / (1000 * 60 * 60 * 24));
                matchesFilter = daysLeft <= 7;
            } else if (filterValue !== "all") {
                matchesFilter = card.dataset.category === filterValue;
            }
            card.style.display = matchesSearch && matchesFilter ? "" : "none";
        });
    }

    filterSelect.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);

    renderGrid();
};
