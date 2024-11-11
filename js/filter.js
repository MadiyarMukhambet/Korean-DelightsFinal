 document.addEventListener("DOMContentLoaded", function () {
    // Загрузка фильтров из localStorage
    const savedMinPrice = localStorage.getItem("minPrice") || "";
    const savedMaxPrice = localStorage.getItem("maxPrice") || "";
    const savedCategory = localStorage.getItem("category") || "all";
    const savedSpecialOffer = localStorage.getItem("specialOffer") === "true";

    document.getElementById("min-price").value = savedMinPrice;
    document.getElementById("max-price").value = savedMaxPrice;
    document.getElementById("category").value = savedCategory;
    document.getElementById("special-offer").checked = savedSpecialOffer;

    // Функция фильтрации
    function filterProducts() {
        const minPrice = parseFloat(document.getElementById("min-price").value) || 0;
        const maxPrice = parseFloat(document.getElementById("max-price").value) || Infinity;
        const selectedCategory = document.getElementById("category").value;
        const onlySpecialOffers = document.getElementById("special-offer").checked;

        // Сохранение фильтров
        localStorage.setItem("minPrice", minPrice);
        localStorage.setItem("maxPrice", maxPrice);
        localStorage.setItem("category", selectedCategory);
        localStorage.setItem("specialOffer", onlySpecialOffers);

        const products = document.querySelectorAll(".product-item");
        products.forEach((product) => {
            const priceText = product.querySelector("p").innerText;
            const price = parseFloat(priceText.replace("$", ""));
            const category = product.dataset.category;
            const isSpecialOffer = product.dataset.specialOffer === "true";

            // Применение условий фильтрации
            const meetsPriceCondition = price >= minPrice && price <= maxPrice;
            const meetsCategoryCondition = selectedCategory === "all" || category === selectedCategory;
            const meetsSpecialOfferCondition = !onlySpecialOffers || isSpecialOffer;

            // Показ или скрытие продукта на основе фильтров
            if (meetsPriceCondition && meetsCategoryCondition && meetsSpecialOfferCondition) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    }

    // Применение фильтра при загрузке страницы
    filterProducts();

    // Обработчик кнопки "Apply Filter"
    document.getElementById("apply-filter").addEventListener("click", filterProducts);
});