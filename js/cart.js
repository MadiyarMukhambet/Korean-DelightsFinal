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