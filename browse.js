const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sizeFilter = document.getElementById("sizeFilter");
const transactionFilter = document.getElementById("transactionFilter");
const conditionFilter = document.getElementById("conditionFilter");
const sortFilter = document.getElementById("sortFilter");
const itemsGrid = document.getElementById("itemsGrid");

function filterItems() {
  const keyword = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const size = sizeFilter.value;
  const transaction = transactionFilter.value;
  const condition = conditionFilter.value;
  const sort = sortFilter.value;

  let items = Array.from(itemsGrid.getElementsByClassName("item-card"));

  items.forEach(item => {
    const matchKeyword = item.dataset.keyword.includes(keyword);
    const matchCategory = !category || item.dataset.category === category;
    const matchSize = !size || item.dataset.size === size;
    const matchTransaction = !transaction || item.dataset.transaction === transaction;
    const matchCondition = !condition || item.dataset.condition === condition;

    if (matchKeyword && matchCategory && matchSize && matchTransaction && matchCondition) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  if (sort === "popular") {
    items.sort((a, b) => b.dataset.popularity - a.dataset.popularity);
  } else {
    items.sort((a, b) => a.dataset.popularity - b.dataset.popularity);
  }

  items.forEach(item => itemsGrid.appendChild(item));

  const visibleItems = items.filter(item => item.style.display !== "none");
  const noResults = document.getElementById("noResults");

  if (visibleItems.length === 0) {
    if (!noResults) {
      const msg = document.createElement("p");
      msg.id = "noResults";
      msg.textContent = "No items match your filters. Try adjusting them!";
      msg.style.textAlign = "center";
      msg.style.marginTop = "20px";
      msg.style.color = "#888";
      itemsGrid.appendChild(msg);
    }
  } else {
    if (noResults) noResults.remove();
  }
}

searchInput.addEventListener("input", filterItems);
categoryFilter.addEventListener("change", filterItems);
sizeFilter.addEventListener("change", filterItems);
transactionFilter.addEventListener("change", filterItems);
conditionFilter.addEventListener("change", filterItems);
sortFilter.addEventListener("change", filterItems);
