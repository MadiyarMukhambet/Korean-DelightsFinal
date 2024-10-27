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