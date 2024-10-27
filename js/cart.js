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