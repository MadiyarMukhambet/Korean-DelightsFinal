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

document.getElementById("apply-filter").addEventListener("click", function() {
    let minPrice = parseFloat(document.getElementById("min-price").value) || 0;
    let maxPrice = parseFloat(document.getElementById("max-price").value) || Infinity;
    let category = document.getElementById("category").value;

    let cards = document.querySelectorAll(".product-grid .card");

    cards.forEach(function(card) {
        let price = parseFloat(card.querySelector("p").textContent.replace('$', ''));
        let cardCategory = card.getAttribute("data-category");

        let categoryMatch = category === "all" || category === cardCategory;
        let priceMatch = price >= minPrice && price <= maxPrice;

        if (categoryMatch && priceMatch) {
            card.style.display = "block"; // Показываем карточку
        } else {
            card.style.display = "none"; // Прячем карточку
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    const closeModalBtn = modal.querySelector('.close-btn');

    // Function to open the modal with product details
    function openModal(title, imageSrc, price, description, ingredients) {
        modal.style.display = 'block';
        document.getElementById('product-title').innerText = title;
        document.getElementById('product-image').src = imageSrc;
        document.getElementById('product-price').innerText = `Price: ${price}`;
        document.getElementById('product-description').innerText = description;
        document.getElementById('product-ingredients').innerText = ingredients;
    }

    // Close modal handler
    closeModalBtn.onclick = () => { modal.style.display = 'none'; };
    window.onclick = (event) => { if (event.target === modal) modal.style.display = 'none'; };

    // Add event listeners to "View Details" buttons
    document.querySelectorAll('.card .btn-danger').forEach(button => {
        button.addEventListener('click', (e) => {
            const productItem = e.target.closest('.card');
            const title = productItem.querySelector('.card-title').innerText;
            const imageSrc = productItem.querySelector('img').src;
            const price = productItem.querySelector('p').innerText;
            const description = `Detailed description of ${title}.`; // Customize as needed
            const ingredients = `Ingredients for ${title}.`; // Customize as needed

            openModal(title, imageSrc, price, description, ingredients);
        });
    });
});




