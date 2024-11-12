document.getElementById('cart-sound').addEventListener('click', function() {
    document.getElementById('checkoutSound').play();
});

const menuItems = document.querySelectorAll('.navbar-nav .nav-link button');
let currentIndex = 4;
function setFocus(cart) {
menuItems[cart].focus();
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


document.addEventListener('DOMContentLoaded', () => {
    const currencySelector = document.getElementById('currency-selector');
    const subtotalPriceElement = document.getElementById('subtotalPrice');
    const shippingPriceElement = document.getElementById('shippingPrice');
    const totalPriceElement = document.getElementById('totalPrice');
    const subtotalCurrencySymbolElement = document.getElementById('subtotalCurrencySymbol');
    const shippingCurrencySymbolElement = document.getElementById('shippingCurrencySymbol');
    const currencySymbolElement = document.getElementById('currencySymbol');

    const apiKey = '5a2de736608a9d17013464d7'; // Замените на ваш ключ

    const currencySymbols = {
        'USD': '$',
        'KRW': '₩',
        'EUR': '€',
        'KZT': '₸'
    };

    // Функция для сохранения корзины в localStorage
    function saveCartToLocalStorage() {
        const cartItems = [];
        const itemCards = document.querySelectorAll('.cart-items .card');

        itemCards.forEach(card => {
            const id = card.getAttribute('data-id');
            const title = card.querySelector('.card-title').textContent;
            // Убираем "Price: $" и конвертируем строку в число
            const priceText = card.querySelector('.price').textContent.replace('Price: ', '').replace('$', '').trim();
            const price = parseFloat(priceText); // Преобразуем в число
            const quantity = parseInt(card.querySelector('.quantity').value, 10); // Количество товаров
            if (!isNaN(price) && !isNaN(quantity)) {
                cartItems.push({ id, title, price, quantity });
            }
        });

        const cartData = {
            items: cartItems,
            currency: currencySelector.value
        };

        localStorage.setItem('cart', JSON.stringify(cartData));
    }

    // Функция для загрузки корзины из localStorage
    function loadCartFromLocalStorage() {
        const cartData = JSON.parse(localStorage.getItem('cart'));
        if (cartData) {
            const cartItems = cartData.items;
            cartItems.forEach(item => {
                const card = document.querySelector(`.cart-items .card[data-id="${item.id}"]`);
                if (card) {
                    card.querySelector('.quantity').value = item.quantity; // Восстанавливаем количество
                }
            });
            currencySelector.value = cartData.currency;
            updatePrices(); // Обновляем цены после восстановления
        }
    }

    // Анимация изменения цены
    async function animatePriceChange(element, startValue, endValue, duration = 1000) {
        const startTime = Date.now();
        const step = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = startValue + (endValue - startValue) * progress;
            element.textContent = currentValue.toFixed(2);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }

    // Обновление цен в корзине
    async function updatePrices() {
        const selectedCurrency = currencySelector.value;
        const baseCurrency = 'USD';

        const conversionRate = await fetchExchangeRate(baseCurrency, selectedCurrency);

        const itemCards = document.querySelectorAll('.cart-items .card');
        let subtotal = 0;

        itemCards.forEach(card => {
            const priceText = card.querySelector('.price').textContent.replace('Price: ', '').replace('$', '').trim();
            const price = parseFloat(priceText);
            const quantity = parseInt(card.querySelector('.quantity').value, 10);

            // Проверяем, что цена и количество корректны
            if (!isNaN(price) && !isNaN(quantity)) {
                subtotal += price * quantity;
            }
        });

        const shipping = 5.00; // Стоимость доставки
        const total = (subtotal + shipping) * conversionRate;

        // Обновляем символы валюты
        subtotalCurrencySymbolElement.textContent = currencySymbols[selectedCurrency] || selectedCurrency;
        shippingCurrencySymbolElement.textContent = currencySymbols[selectedCurrency] || selectedCurrency;
        currencySymbolElement.textContent = currencySymbols[selectedCurrency] || selectedCurrency;

        // Анимируем изменения
        animatePriceChange(subtotalPriceElement, parseFloat(subtotalPriceElement.textContent), subtotal * conversionRate);
        animatePriceChange(shippingPriceElement, parseFloat(shippingPriceElement.textContent), shipping * conversionRate);
        animatePriceChange(totalPriceElement, parseFloat(totalPriceElement.textContent), total.toFixed(2));

        // Сохраняем корзину
        saveCartToLocalStorage();
    }

    // Получение курса обмена
    async function fetchExchangeRate(baseCurrency, targetCurrency) {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${targetCurrency}`);
            const data = await response.json();
            return data.conversion_rate;
        } catch (error) {
            console.error('Ошибка получения курса обмена:', error);
            return 1; // В случае ошибки возвращаем курс 1 (что эквивалентно не изменять цену)
        }
    }

    // Обработчик клика на кнопку "Proceed to Checkout"
    document.getElementById('cart-sound').addEventListener('click', () => {
        updatePrices(); // Пересчитываем цену при нажатии на кнопку
        document.getElementById('checkoutSound').play(); // Воспроизводим звук
    });

    currencySelector.addEventListener('change', updatePrices);

    // Инициализация при загрузке
    loadCartFromLocalStorage();
});



