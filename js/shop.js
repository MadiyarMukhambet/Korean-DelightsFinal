//Selecting and Manipulating
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

document.querySelectorAll('.rating').forEach(rating => {
    const stars = rating.querySelectorAll('.bi-star, .bi-star-fill');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            setRating(stars, index + 1); 
        });
    });
});

document.querySelectorAll('.add-to-wishlist button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const productTitle = card.querySelector('.card-title').textContent;
        alert(`You added ${productTitle} to the wishlist!`);
        card.style.backgroundColor = '#f8d7da';
    });
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