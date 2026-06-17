window.renderInventoryInfoTab = () => {
  const content = document.getElementById("content");
  if (!content) return;

  content.innerHTML = `
      <div class="inventoryinfo-container">
          <h1 class="app-header">Inventory Info</h1>
          

          <div class="section-wrapper">
              <span class="section-header">Expiring Soon:</span>
              <div id="expiring-list"></div>
              <button class="primary-button" id="view-all-btn">View All</button>
          </div>

          <div class="section-wrapper">
              <span class="section-header">Running Low:</span>
              <div id="low-list"></div>
              <button class="primary-button" id="grocery-btn">Add to Grocery List</button>
          </div>

          <div class="section-wrapper">
              <span class="section-header">Suggested Recipe:</span>
              <span class="section-header" style="font-size:26px;font-weight:bold;">Chicken Fried Rice</span>
              <ul class="recipe-meta">
                  <li>Chicken</li>
                  <li>Rice</li>
                  <li>Eggs</li>
                  <li style="color:#d32f2f;">Chicken expires in 2 days!</li>
              </ul>
              <button class="primary-button" id="start-cooking-btn">Start Cooking</button>
          </div>
      </div>
  `;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiringData = (window.kitchenItems || [])
      .map(item => {
          const exp = new Date(item.expires);
          const daysLeft = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
          return { item, daysLeft };
      })
      .filter(({ daysLeft }) => daysLeft <= 7)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .map(({ item, daysLeft }) => {
          const dayLabel = Math.abs(daysLeft) === 1 ? "day" : "days";
          const label = daysLeft < 0
              ? `${item.name} - Expired ${Math.abs(daysLeft)} ${dayLabel} ago`
              : daysLeft === 0
                  ? `${item.name} - Expires today`
                  : `${item.name} - Expires in ${daysLeft} ${dayLabel}`;
          const color = daysLeft <= 2 ? "#d32f2f" : "#F4B400";
          return { text: label, color };
      });

  const lowData = (window.kitchenItems || [])
      .map(item => {
          const match = item.quantity.match(/^(\d+)/);
          const count = match ? parseInt(match[1], 10) : null;
          return { item, count };
      })
      .filter(({ count }) => count !== null && count <= 2)
      .sort((a, b) => a.count - b.count)
      .map(({ item, count }) => ({
          text: `${item.name} - Only ${item.quantity} left`,
          color: count <= 1 ? "#d32f2f" : "#F4B400",
          item,
      }));

  const fillList = (data, containerId) => {
      const container = document.getElementById(containerId);
      data.forEach(item => {
          const row = document.createElement("div");
          row.className = "item-row";
          row.innerHTML = `
              <span>• ${item.text}</span>
              <div class="status-dot" style="background-color: ${item.color}"></div>
          `;
          container.appendChild(row);
      });
  };

  fillList(expiringData, "expiring-list");
  fillList(lowData, "low-list");

  content.querySelector("#view-all-btn").addEventListener("click", () => {
      document.querySelector('[data-tab="mykitchen"]')?.click();
  });

  const groceryBtn = content.querySelector("#grocery-btn");
  groceryBtn.addEventListener("click", () => {
      lowData.forEach(({ item }) => {
          window.addToGroceryList?.(item.name, "1", item.unit);
      });
      document.querySelector('[data-tab="grocerylist"]')?.click();
  });

  content.querySelector("#start-cooking-btn").addEventListener("click", () => {
      window.selectedRecipeToOpen = "Chicken Fried Rice";
      document.querySelector('[data-tab="recipes"]')?.click();
  });
};

document.addEventListener("DOMContentLoaded", window.renderInventoryInfoTab);
