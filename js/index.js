const translations = {
    en: {
        home: "Home",
        shop: "Shop",
        specials: "Special Offers",
        wishlist: "Wishlist",
        cart: "Cart(0)"
    },
    kr: {
        home: "홈",
        shop: "상점",
        specials: "특별 제안",
        wishlist: "위시리스트",
        cart: "장바구니(0)"
    }
};

document.getElementById('language-selector').addEventListener('change', function () {
    const selectedLang = this.value;
    document.querySelectorAll('[data-key]').forEach(function (element) {
        const key = element.getAttribute('data-key');
        element.textContent = translations[selectedLang][key];
    });
});


function applyTranslations(language) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        el.textContent = translations[language][key];
    });
}

// Initialize with default language
applyTranslations('en');

    document.querySelectorAll('.subscribe button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const emailInput = document.querySelector('.newsletter input[type="email"]');
            if (emailInput.value) {
                alert(`You subscribed with the email: ${emailInput.value}`);
                emailInput.style.display = 'none';
                button.style.display = 'none';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });

//Manipulating Attributes(read more)
// Функция для получения сохраненных состояний блоков
function getReadMoreStates() {
    return JSON.parse(localStorage.getItem('readMoreStates')) || {};
}

// Функция для сохранения состояний блоков
function saveReadMoreStates(states) {
    localStorage.setItem('readMoreStates', JSON.stringify(states));
}

// Применение сохраненных состояний при загрузке страницы
function applyReadMoreStates() {
    const readMoreStates = getReadMoreStates();
    document.querySelectorAll('.categories .read-more').forEach((button, index) => {
        const additionalContent = button.nextElementSibling;
        
        // Применяем сохраненное состояние для каждого блока
        if (readMoreStates[index]) {
            additionalContent.style.display = 'block';
            button.textContent = 'Read Less';
        } else {
            additionalContent.style.display = 'none';
            button.textContent = 'Read More';
        }
    });
}

// Добавление обработчиков событий для кнопок "Read More"
document.querySelectorAll('.categories .read-more').forEach((button, index) => {
    button.addEventListener('click', () => {
        const additionalContent = button.nextElementSibling;
        const readMoreStates = getReadMoreStates();

        // Переключаем состояние видимости контента и обновляем кнопку
        if (additionalContent.style.display === 'none') {
            additionalContent.style.display = 'block';
            button.textContent = 'Read Less';
            readMoreStates[index] = true; // Сохраняем состояние "открыто"
        } else {
            additionalContent.style.display = 'none';
            button.textContent = 'Read More';
            readMoreStates[index] = false; // Сохраняем состояние "закрыто"
        }
        
        saveReadMoreStates(readMoreStates); // Сохраняем обновленные состояния в localStorage
    });
});

// Применяем сохраненные состояния при загрузке страницы
document.addEventListener('DOMContentLoaded', applyReadMoreStates);


// FAQ
document.querySelectorAll('.faq-question').forEach(button => {
button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const isVisible = answer.style.display === 'block';
    
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.display = 'none';
    });

    document.querySelectorAll('.arrow').forEach(arrow => {
        arrow.style.transform = 'rotate(0deg)';
    });

    answer.style.display = isVisible ? 'none' : 'block';
    button.querySelector('.arrow').style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
});
});

//Time
function updateTime() {
    const timeContainer = document.getElementById('current-time');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    timeContainer.textContent = `Today is: ${formattedDate}`;
}

setInterval(updateTime, 1000); 
updateTime();
    
const modal = document.getElementById("subscribeModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.querySelector(".close");


openModalBtn.addEventListener("click", () => {
modal.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
modal.style.display = "none";
});

window.addEventListener("click", (event) => {
if (event.target == modal) {
  modal.style.display = "none";
}
});

const subscriptionForm = document.getElementById("subscriptionForm");
subscriptionForm.addEventListener("submit", (event) => {
event.preventDefault(); 
const email = document.getElementById("email").value;
alert(`You have successfully subscribed with ${email}`);
modal.style.display = "none"; 
});

//Keyboard Event Handling
const menuItems = document.querySelectorAll('.navbar-nav .nav-link button');
let currentIndex = 0;
function setFocus(index) {
menuItems[index].focus();
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

// Функция для получения сохраненных товаров в вишлисте из localStorage
function getWishlistItems() {
    return JSON.parse(localStorage.getItem('wishlistItems')) || [];
}

// Функция для сохранения товаров в вишлисте в localStorage
function saveWishlistItems(items) {
    localStorage.setItem('wishlistItems', JSON.stringify(items));
}

// Применение сохраненного стиля для товаров в вишлисте
function applyWishlistStyles() {
    const wishlistItems = getWishlistItems();
    document.querySelectorAll('.product-item').forEach(card => {
        const productTitle = card.querySelector('.product-title').textContent;
        if (wishlistItems.includes(productTitle)) {
            // Изменяем фон, если товар сохранен в вишлисте
            card.style.backgroundColor = '#f8d7da';
        }
    });
}

// Добавляем товар в вишлист и сохраняем состояние
document.querySelectorAll('.add-to-wishlist button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-item');
        const productTitle = card.querySelector('.product-title').textContent;
        
        // Сохраняем товар в localStorage
        let wishlistItems = getWishlistItems();
        if (!wishlistItems.includes(productTitle)) {
            wishlistItems.push(productTitle);
            saveWishlistItems(wishlistItems);
        }

        // Изменяем стиль карточки
        card.style.backgroundColor = '#f8d7da';
        alert(`You added ${productTitle} to the wishlist!`);
    });
});

// Применяем стили для товаров в вишлисте при загрузке страницы
document.addEventListener('DOMContentLoaded', applyWishlistStyles);


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

/*// Функция выхода из аккаунта
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    alert('You have been logged out.');
    window.location.href = 'index.html';
}

// Выполнение проверки авторизации при загрузке страницы
window.addEventListener('load', checkAuth);
document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('selectedMode') || 'dark'; // По умолчанию темный режим
    if (savedMode === 'light') {
        document.body.classList.add('light-mode');
    }
});
document.getElementById('moon-light').addEventListener('click', toggleMode);
function toggleMode() {
    document.body.classList.toggle('light-mode'); // Переключаем светлый режим
    const mode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('selectedMode', mode); // Сохраняем выбранный режим
}*/

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("input[type='search']");
    const searchButton = document.querySelector("button[type='submit']");
    
    searchButton.addEventListener("click", (event) => {
        event.preventDefault();
        const searchText = searchInput.value.toLowerCase();
        const products = document.querySelectorAll(".product-item");
        const categories = document.querySelectorAll(".category-item");
        
        // Скрываем или показываем продукты по совпадению текста
        products.forEach((product) => {
            const title = product.querySelector(".product-title").textContent.toLowerCase();
            product.style.display = title.includes(searchText) ? "block" : "none";
        });

        // Скрываем или показываем категории по совпадению текста
        categories.forEach((category) => {
            const title = category.querySelector("h3").textContent.toLowerCase();
            category.style.display = title.includes(searchText) ? "block" : "none";
        });
    });
});


// Обработчик открытия и закрытия модального окна
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    const closeModalBtn = modal.querySelector('.close');
    const closeBtn = modal.querySelector('.close-btn');

    // Функция для открытия модального окна с деталями товара
    function openModal(title, imageSrc, price, description) {
        modal.style.display = 'block';
        document.getElementById('product-title').innerText = title;
        document.getElementById('product-image').src = imageSrc;
        document.getElementById('product-price').innerText = `Price: ${price}`;
        document.getElementById('product-description').innerText = description;
    }

    // Обработчики закрытия модального окна
    closeModalBtn.onclick = () => { modal.style.display = 'none'; };
    closeBtn.onclick = () => { modal.style.display = 'none'; };
    window.onclick = (event) => { if (event.target === modal) modal.style.display = 'none'; };

    // Добавление обработчиков событий к кнопкам "View Details"
    document.querySelectorAll('.product-item .btn-danger').forEach(button => {
        button.addEventListener('click', (e) => {
            const productItem = e.target.closest('.product-item');
            const title = productItem.querySelector('.product-title').innerText;
            const imageSrc = productItem.querySelector('img').src;
            const price = productItem.querySelector('p').innerText;
            const description = `Detailed description of ${title}.`; // Добавьте описание по вашему желанию

            openModal(title, imageSrc, price, description);
        });
    });
});


