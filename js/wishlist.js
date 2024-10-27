document.querySelectorAll('.add-to-card button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card-body');
        const productTitle = card.querySelector('.card-title').textContent;
        alert(`You added ${productTitle} to the card!`);
        card.style.backgroundColor = '#f8d7da';
    });
});

document.querySelectorAll('.remove-from-card button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card-body');
        const productTitle = card.querySelector('.card-title').textContent;
        alert(`You removed ${productTitle} from the card!`);
        card.style.backgroundColor = '#ffffff';
    });
});

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