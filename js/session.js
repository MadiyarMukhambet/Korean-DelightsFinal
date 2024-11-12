document.addEventListener("DOMContentLoaded", () => {
    const profileLink = document.getElementById("profile-link");

    if (profileLink) { // Проверка существования элемента
        // Проверяем, если пользователь вошел в систему
        if (localStorage.getItem("isLoggedIn")) {
            // Если пользователь вошел, направляем на страницу с данными
            profileLink.setAttribute("href", "account.html");
        } else {
            // Если пользователь не вошел, направляем на страницу регистрации
            profileLink.setAttribute("href", "login.html");
        }
    } else {
        console.error("Элемент с id 'profile-link' не найден.");
    }
});

