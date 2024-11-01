// Функция для получения товаров в корзине из localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

// Функция для сохранения товаров в корзине в localStorage
function saveCartItems(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
}

// Функция для применения стиля к товарам, уже добавленным в корзину
function applyCartStyles() {
    const cartItems = getCartItems();
    document.querySelectorAll('.card-body').forEach(card => {
        const productTitle = card.querySelector('.card-title').textContent;
        if (cartItems.includes(productTitle)) {
            card.style.backgroundColor = '#f8d7da';
        } else {
            card.style.backgroundColor = '#ffffff';
        }
    });
}

// Добавление товара в корзину и изменение стиля карточки
document.querySelectorAll('.add-to-card button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card-body');
        const productTitle = card.querySelector('.card-title').textContent;
        
        alert(`You added ${productTitle} to the cart!`);
        card.style.backgroundColor = '#f8d7da';

        // Сохраняем товар в localStorage
        let cartItems = getCartItems();
        if (!cartItems.includes(productTitle)) {
            cartItems.push(productTitle);
            saveCartItems(cartItems);
        }
    });
});

// Удаление товара из корзины и изменение стиля карточки
document.querySelectorAll('.remove-from-card button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card-body');
        const productTitle = card.querySelector('.card-title').textContent;

        alert(`You removed ${productTitle} from the cart!`);
        card.style.backgroundColor = '#ffffff';

        // Удаляем товар из localStorage
        let cartItems = getCartItems();
        cartItems = cartItems.filter(item => item !== productTitle); // Удаляем товар по названию
        saveCartItems(cartItems);
    });
});

// Применяем сохраненные стили при загрузке страницы
document.addEventListener('DOMContentLoaded', applyCartStyles);


const menuItems = document.querySelectorAll('.navbar-nav .nav-link button');
let currentIndex = 3;
function setFocus(wishlist) {
menuItems[wishlist].focus();
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