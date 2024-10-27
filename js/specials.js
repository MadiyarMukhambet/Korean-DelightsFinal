document.querySelectorAll('.add-to-card button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.offer-item');
        const productTitle = card.querySelector('.offer-title').textContent;
        alert(`You added ${productTitle} to the card!`);
        card.style.backgroundColor = '#f8d7da';
    });
});

//Event Listeners on Buttons
const showTimeBtn = document.getElementById('showTimeBtn');
const displayTime = document.getElementById('displayTime');

showTimeBtn.addEventListener('click', () => {
const currentTime = new Date().toLocaleTimeString();

displayTime.innerHTML = `<span style="color: black;">Current time: ${currentTime}</span>`;
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

