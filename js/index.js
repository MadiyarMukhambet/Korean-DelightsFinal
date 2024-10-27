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


    document.querySelectorAll('.categories .read-more').forEach(button => {
    button.addEventListener('click', () => {
        const additionalContent = button.nextElementSibling;
        if (additionalContent.style.display === 'none') {
            additionalContent.style.display = 'block'; 
            button.textContent = 'Read Less'; 
        } else {
            additionalContent.style.display = 'none'; 
            button.textContent = 'Read More'; 
        }
    });
});

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

document.querySelectorAll('.add-to-wishlist button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-item');
        const productTitle = card.querySelector('.product-title').textContent;
        alert(`You added ${productTitle} to the wishlist!`);
        card.style.backgroundColor = '#f8d7da';
    });
});