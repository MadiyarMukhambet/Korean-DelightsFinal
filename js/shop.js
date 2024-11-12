//Selecting and Manipulating
// Функция для получения сохраненного рейтинга из localStorage
function getRatings() {
    return JSON.parse(localStorage.getItem('ratings')) || {};
}

// Функция для сохранения рейтинга в localStorage
function saveRatings(ratings) {
    localStorage.setItem('ratings', JSON.stringify(ratings));
}

// Функция для сохранения цвета карточки в localStorage
function getWishlistItems() {
    return JSON.parse(localStorage.getItem('wishlistItems')) || [];
}

// Функция для сохранения товаров в вишлисте в localStorage
function saveWishlistItems(items) {
    localStorage.setItem('wishlistItems', JSON.stringify(items));
}

// Функция для применения сохраненного рейтинга к звездам
function applyRatings() {
    const ratings = getRatings();
    document.querySelectorAll('.rating').forEach((ratingElement, index) => {
        const stars = ratingElement.querySelectorAll('.bi-star, .bi-star-fill');
        const savedRating = ratings[index] || 0;
        setRating(stars, savedRating); // Устанавливаем сохраненный рейтинг
    });
}

// Функция для применения цвета карточки для товаров в вишлисте
function applyWishlistStyles() {
    const wishlistItems = getWishlistItems();
    document.querySelectorAll('.card').forEach(card => {
        const productTitle = card.querySelector('.card-title').textContent;
        if (wishlistItems.includes(productTitle)) {
            card.style.backgroundColor = '#f8d7da';
        }
    });
}

// Установка рейтинга звезд
function setRating(stars, rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('bi-star-fill');
            star.classList.remove('bi-star');
        } else {
            star.classList.add('bi-star');
            star.classList.remove('bi-star-fill');
        }
    });
}

// Добавление обработчиков событий для рейтинга
document.querySelectorAll('.rating').forEach((ratingElement, index) => {
    const stars = ratingElement.querySelectorAll('.bi-star, .bi-star-fill');
    stars.forEach((star, starIndex) => {
        star.addEventListener('click', () => {
            setRating(stars, starIndex + 1);
            
            // Сохраняем рейтинг в localStorage
            const ratings = getRatings();
            ratings[index] = starIndex + 1; // Сохраняем рейтинг по индексу
            saveRatings(ratings);
        });
    });
});

// Добавление в вишлист и изменение цвета карточки
document.querySelectorAll('.add-to-wishlist button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const productTitle = card.querySelector('.card-title').textContent;
        
        alert(`You added ${productTitle} to the wishlist!`);
        card.style.backgroundColor = '#f8d7da';

        // Сохраняем продукт в localStorage для вишлиста
        let wishlistItems = getWishlistItems();
        if (!wishlistItems.includes(productTitle)) {
            wishlistItems.push(productTitle);
            saveWishlistItems(wishlistItems);
        }
    });
});

// Применение сохраненных состояний при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    applyRatings();          // Применяем сохраненные рейтинги
    applyWishlistStyles();    // Применяем цвет для карточек в вишлисте
});


const menuItems = document.querySelectorAll('.navbar-nav .nav-link button');
let currentIndex = 1;
function setFocus(shop) {
menuItems[shop].focus();
}
document.addEventListener('keydown', (event) => {
if (event.key === 'ArrowUp') {
    currentIndex = (currentIndex + 1) % menuItems.length;
    setFocus(currentIndex);
    event.preventDefault(); 
} else if (event.key === 'ArrowDown') {
    currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
    setFocus(currentIndex);
    event.preventDefault(); 
}
});
setFocus(currentIndex);


// Функция выхода из аккаунта
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    alert('You have been logged out.');
    window.location.href = 'index.html';
}

// Выполнение проверки авторизации при загрузке страницы


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

        const products = document.querySelectorAll(".card");
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
 // JavaScript для открытия модального окна и отображения информации о продукте
document.addEventListener("DOMContentLoaded", function () {
    // Получаем все кнопки "View Details"
    const viewDetailButtons = document.querySelectorAll(".btn-danger");
    const modal = document.getElementById("productModal");
    const closeModalButton = modal.querySelector(".close");

    // Элементы модального окна, в которые будем вставлять информацию о продукте
    const modalTitle = document.getElementById("product-title");
    const modalImage = document.getElementById("product-image");
    const modalPrice = document.getElementById("product-price");
    const modalDescription = document.getElementById("product-description");
    const modalIngredients = document.getElementById("product-ingredients");

    // Функция открытия модального окна
    function openModal(card) {
        const title = card.querySelector(".card-title").innerText;
        const price = card.querySelector("p").innerText;
        const imageSrc = card.querySelector("img").src;
        const description = card.getAttribute("data-description");
        const ingredients = card.getAttribute("data-ingredients");

        modalTitle.innerText = title;
        modalPrice.innerText = `Price: ${price}`;
        modalImage.src = imageSrc;
        modalDescription.innerText = `Description: ${description}`;
        modalIngredients.innerText = `Ingredients: ${ingredients}`;

        modal.style.display = "block";
    }

    // Закрытие модального окна
    closeModalButton.onclick = function () {
        modal.style.display = "none";
    };

    // Закрытие модального окна при клике за пределами его содержимого
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Привязка события "click" к каждой кнопке "View Details"
    viewDetailButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const card = button.closest(".card");
            openModal(card);
        });
    });
});
// Получаем модальное окно и кнопку закрытия
var modal = document.querySelector('.modal');
var closeButton = document.querySelector('.close-btn');

// Когда пользователь нажимает на кнопку закрытия
closeButton.addEventListener('click', function() {
  modal.style.display = 'none'; // Закрываем модальное окно
});

// Когда пользователь кликает в любом месте за пределами модального окна, оно тоже закрывается
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none'; // Закрываем модальное окно
  }
});
