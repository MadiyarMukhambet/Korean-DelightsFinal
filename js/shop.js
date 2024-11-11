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
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const signupContainer = document.querySelector('.signup');

    if (isLoggedIn) {
        signupContainer.innerHTML = `<button class="btn btn-outline-warning" onclick="logout()">Logout</button>`;
    } else {
        signupContainer.innerHTML = `
            <li class="nav-item me-2"><a class="nav-link" href="login.html"><button class="btn btn-outline-warning"><i class="bi bi-person-circle"></i> Log</button></a></li>
            <li class="nav-item"><a class="nav-link" href="register.html"><button type="button" class="btn btn-warning"><i class="fa-solid fa-key"></i> Register</button></a></li>
        `;
    }
}

// Функция выхода из аккаунта
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    alert('You have been logged out.');
    window.location.href = 'index.html';
}

// Выполнение проверки авторизации при загрузке страницы
window.addEventListener('load', checkAuth);

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