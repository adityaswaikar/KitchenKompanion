const groceryUnits = ["items", "carton", "bag", "bunch", "lb", "lbs", "pound", "pounds", "oz", "cup", "cups", "box", "boxes", "block", "blocks", "loaf", "slices", "dozen", "tbsp", "tsp"];

function normalizeGroceryItem(item, quantity, unit) {
    if (typeof item === "object" && item !== null) {
        return {
            name: String(item.name || "").trim(),
            quantity: String(item.quantity || quantity || "1").trim(),
            unit: String(item.unit || unit || "items").trim(),
            completed: Boolean(item.completed),
        };
    }

    const text = String(item || "").trim();
    const parts = text.split(/\s+/);
    const first = parts[0] || "";
    const second = parts[1] || "";

    if (quantity || unit) {
        return {
            name: text,
            quantity: String(quantity || "1").trim(),
            unit: String(unit || "items").trim(),
            completed: false,
        };
    }

    if (/^\d+(\.\d+)?$/.test(first) && groceryUnits.includes(second.toLowerCase())) {
        return {
            quantity: first,
            unit: second.toLowerCase(),
            name: parts.slice(2).join(" ").trim(),
            completed: false,
        };
    }

    if (/^\d+(\.\d+)?$/.test(first)) {
        return {
            quantity: first,
            unit: "items",
            name: parts.slice(1).join(" ").trim(),
            completed: false,
        };
    }

    return { name: text, quantity: "1", unit: "items", completed: false };
}

function normalizeGroceryList(items) {
    return items
        .map(item => normalizeGroceryItem(item))
        .filter(item => item.name);
}

window.groceryListItems = normalizeGroceryList(window.groceryListItems || [
    { name: "Milk", quantity: "1", unit: "carton", completed: false },
    { name: "Apples", quantity: "6", unit: "items", completed: false },
]);

window.addToGroceryList = function(item, quantity, unit) {
    const newItem = normalizeGroceryItem(item, quantity, unit);
    if (!newItem.name) return;

    const existing = window.groceryListItems.find(current =>
        current.name.toLowerCase() === newItem.name.toLowerCase() &&
        current.unit.toLowerCase() === newItem.unit.toLowerCase()
    );

    if (existing) {
        const currentQuantity = Number(existing.quantity);
        const addedQuantity = Number(newItem.quantity);
        if (!Number.isNaN(currentQuantity) && !Number.isNaN(addedQuantity)) {
            existing.quantity = String(currentQuantity + addedQuantity);
        }
        existing.completed = false;
        return;
    }

    window.groceryListItems.push(newItem);
};

window.renderGroceryListTab = function(content) {
    const container = document.createElement("div");
    container.className = "grocery-screen";

    const title = document.createElement("h1");
    title.className = "grocery-title";
    title.textContent = "Grocery List";

    const form = document.createElement("div");
    form.className = "grocery-form";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Item name";
    input.className = "grocery-input";

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = "0.25";
    quantityInput.step = "0.25";
    quantityInput.placeholder = "Quantity";
    quantityInput.className = "grocery-input";

    const unitSelect = document.createElement("select");
    unitSelect.className = "grocery-input grocery-unit-select";
    unitSelect.innerHTML = groceryUnits
        .map(unit => `<option value="${unit}">${unit}</option>`)
        .join("");

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.className = "grocery-add-btn";

    const message = document.createElement("div");
    message.className = "grocery-message";
    message.hidden = true;

    const list = document.createElement("ul");
    list.className = "grocery-list";

    form.appendChild(input);
    form.appendChild(quantityInput);
    form.appendChild(unitSelect);
    form.appendChild(addBtn);
    container.appendChild(title);
    container.appendChild(form);
    container.appendChild(message);
    container.appendChild(list);
    content.appendChild(container);

    let editingIndex = null;

    function showMessage(text) {
        message.textContent = text;
        message.hidden = !text;
    }

    function resetForm() {
        input.value = "";
        quantityInput.value = "";
        unitSelect.value = "items";
        addBtn.textContent = "Add";
        editingIndex = null;
        showMessage("");
    }

    function getFormItem() {
        const name = input.value.trim();
        const quantity = quantityInput.value.trim();
        const unit = unitSelect.value;

        if (!name || !quantity) {
            showMessage("Enter an item name and quantity.");
            return null;
        }

        return { name, quantity, unit, completed: false };
    }

    function renderList() {
        list.innerHTML = "";

        window.groceryListItems.forEach((item, index) => {
            const li = document.createElement("li");
            li.className = "grocery-item";
            li.classList.toggle("is-complete", item.completed);

            const itemDetails = document.createElement("div");
            itemDetails.className = "grocery-item-details";

            const taskText = document.createElement("span");
            taskText.textContent = item.name;
            taskText.className = "grocery-item-text";
            taskText.addEventListener("click", () => {
                item.completed = !item.completed;
                renderList();
            });

            const quantityText = document.createElement("span");
            quantityText.textContent = `${item.quantity} ${item.unit}`;
            quantityText.className = "grocery-item-quantity";

            itemDetails.appendChild(taskText);
            itemDetails.appendChild(quantityText);

            const actions = document.createElement("div");
            actions.className = "grocery-actions";

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.className = "grocery-edit-btn";
            editBtn.addEventListener("click", () => {
                input.value = item.name;
                quantityInput.value = item.quantity;
                unitSelect.value = item.unit;
                addBtn.textContent = "Save";
                editingIndex = index;
                showMessage("");
            });

            const delBtn = document.createElement("button");
            delBtn.textContent = "Delete";
            delBtn.className = "grocery-delete-btn";
            delBtn.addEventListener("click", () => {
                window.groceryListItems.splice(index, 1);
                resetForm();
                renderList();
            });

            actions.appendChild(editBtn);
            actions.appendChild(delBtn);

            li.appendChild(itemDetails);
            li.appendChild(actions);
            list.appendChild(li);
        });
    }

    function addItem() {
        const item = getFormItem();
        if (!item) return;

        if (editingIndex !== null) {
            item.completed = window.groceryListItems[editingIndex].completed;
            window.groceryListItems[editingIndex] = item;
        } else {
            window.addToGroceryList(item);
        }

        resetForm();
        renderList();
    }

    addBtn.addEventListener("click", (event) => {
        event.preventDefault();
        addItem();
    });

    form.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addItem();
        }
    });

    renderList();
};
