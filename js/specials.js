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
    document.querySelectorAll('.offer-item').forEach(card => {
        const productTitle = card.querySelector('.offer-title').textContent;
        if (cartItems.includes(productTitle)) {
            card.style.backgroundColor = '#f8d7da';
        }
    });
}

// Добавление товара в корзину и изменение стиля карточки
document.querySelectorAll('.add-to-card button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.offer-item');
        const productTitle = card.querySelector('.offer-title').textContent;
        
        alert(`You added ${productTitle} to the cart!`);
        card.style.backgroundColor = '#f8d7da';

        // Сохраняем продукт в localStorage для корзины
        let cartItems = getCartItems();
        if (!cartItems.includes(productTitle)) {
            cartItems.push(productTitle);
            saveCartItems(cartItems);
        }
    });
});

// Применение сохраненных стилей при загрузке страницы
document.addEventListener('DOMContentLoaded', applyCartStyles);


//Event Listeners on Buttons
const showTimeBtn = document.getElementById('showTimeBtn');
const displayTime = document.getElementById('displayTime');

showTimeBtn.addEventListener('click', () => {
const currentTime = new Date().toLocaleTimeString();

displayTime.innerHTML = `<span>Current time: ${currentTime}</span>`;
});


//Keyboard Event Handling
const menuItems = document.querySelectorAll('.navbar-nav .nav-link button');
let currentIndex = 2;
function setFocus(specials) {
menuItems[specials].focus();
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

