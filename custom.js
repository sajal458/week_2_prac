async function fetchpost(searchTerm = '') {
    let url = searchTerm
        ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        : "https://www.themealdb.com/api/json/v1/1/search.php?f=a";

    const res = await fetch(url);
    const data = await res.json();
    if (data.meals) {
        renderpost(data.meals);
    } else {
        renderpost([]);
    }
}
const postlist = document.getElementById("postlist");
function renderpost(meals) {
    postlist.innerHTML = "";

    if (meals.length === 0) {
        postlist.innerHTML = '<p class="bg-danger">No drinks found</p>';
        return;
    }

    meals.forEach(meal => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";

    const card = document.createElement("div");
    card.className = "card h-100";
    card.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
        <div class="card-body">
            <h5 class="card-title text-center">${meal.strMeal}</h5>
        </div>
    `;

    
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = `
    <img src="${meal.strMealThumb}" class="img-fluid mb-3" alt="${meal.strMeal}">
    <h5>${meal.strMeal}</h5>
    <ul>
    <li>${meal.strIngredient1}</li>
    <li>${meal.strIngredient2}</li>
    <li>${meal.strIngredient3}</li>
    <li>${meal.strIngredient4}</li>
    <li>${meal.strIngredient5}</li>
    <li>${meal.strIngredient6}</li>
    </ul>
  `;

  document.getElementById("openModalBtn").click();
});

    col.appendChild(card);
    postlist.appendChild(col);
});
};
document.getElementById("searchBtn").addEventListener("click", () => {
    const value = document.getElementById("searchInput").value;
    fetchpost(value);
});
fetchpost();