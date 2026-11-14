const searchForm = document.querySelector(".header-search-form");
const searchInput = document.querySelector("#site-search");
const searchStatus = document.querySelector(".search-status");
const searchableCards = Array.from(document.querySelectorAll(".product, .good"));

if (!(searchForm instanceof HTMLFormElement)) {
    throw new Error("Не найдена форма поиска по товарам.");
}

if (!(searchInput instanceof HTMLInputElement)) {
    throw new Error("Не найдено поле поиска по товарам.");
}

if (!(searchStatus instanceof HTMLElement)) {
    throw new Error("Не найдено сообщение о результатах поиска.");
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = searchInput.value.trim().toLocaleLowerCase("ru");
    const matches = [];

    searchableCards.forEach((card) => {
        const imageText = Array.from(card.querySelectorAll("img"))
            .map((image) => image.alt)
            .join(" ");
        const cardText = `${card.textContent} ${imageText}`.toLocaleLowerCase("ru");
        const isMatch = query === "" || cardText.includes(query);

        card.hidden = !isMatch;

        if (isMatch && query !== "") {
            matches.push(card);
        }
    });

    if (query === "") {
        searchStatus.textContent = "Показаны все товары и категории.";
        return;
    }

    searchStatus.textContent = matches.length
        ? `Найдено карточек: ${matches.length}.`
        : "Ничего не найдено.";

    matches[0]?.scrollIntoView({ block: "center" });
});
