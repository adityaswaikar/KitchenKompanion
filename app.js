// app.js
// Created 2/19/26 Eric Bennett

(function () {
    const content = document.getElementById('content');
    const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));

    if (!content) {
        console.error('Missing element: #content');
        return;
    }

    if (tabButtons.length === 0) {
        console.error('No tab buttons found.');
        return;
    }

    const renderers = {
        mykitchen: () => window.renderMyKitchenTab?.(content),
        grocerylist: () => window.renderGroceryListTab?.(content),
        recipes: () => window.renderRecipesTab?.(content),
    }

    function setActiveButton(tabName) {
        tabButtons.forEach((btn) => {
            const isActive = btn.dataset.tab === tabName;
            btn.classList.toggle("active", isActive);
        });
    }

    function clearContent() {
        content.innerHTML = "";
        content.scrollTop = 0; //resets the scroll to the top when switching tabs.
    }

    function showMissingRenderer(tabName) {
        const msg = document.createElement("div");
        msg.innerHTML = `` //fill in
        content.appendChild(msg);
    }

    function renderTab(tabName) {
        setActiveButton(tabName);
        clearContent();

        const render = renderers[tabName];
        if (!render) {
            showMissingRenderer(tabName);
            return;
        }

        const before = content.childNodes.length;
        render();
        const after = content.childNodes.length;

        if (after === before) {
            showMissingRenderer(tabName);
        }
    }

    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const tabName = btn.dataset.tab;
            if (tabName) {
                renderTab(tabName);
            }
        });
    });

    renderTab("mykitchen");
})();