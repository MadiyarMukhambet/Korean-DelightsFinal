function validateEmail(uemail) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(uemail);
} 
let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let username = document.querySelector('#username');
let email = document.querySelector('#uemail');
let password = document.querySelector('#password');

let users = JSON.parse(localStorage.getItem('users')) || {};

function User(firstName, email, password, username) {
    this.firstName = firstName;
    this.email = email;
    this.password = password;
    }
    function createId(users) {
    return Object.keys(users).length;
    }

const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // Останавливаем отправку формы по умолчанию

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('uemail').value.trim();
    const password = document.getElementById('password').value.trim();
    const username = document.getElementById('username').value.trim();

    if (!validateEmail(email)) {
        alert('Некорректный email');
        return;
    }

    // Загружаем или инициализируем объект users из localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userId = 'User' + (Object.keys(users).length + 1); // Уникальный ID для нового пользователя

    // Создаем объект нового пользователя
    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        username: username
    };

    // Сохраняем пользователя в объекте users
    users[userId] = user;

    // Обновляем объект users и текущего пользователя в localStorage
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', userId); // Сохраняем текущего пользователя

    alert('Регистрация успешна!');
    window.location.href = 'login.html';

});




const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');

const nextStep1 = document.getElementById('nextStep1');
const nextStep2 = document.getElementById('nextStep2');
const prevStep2 = document.getElementById('prevStep2');
const prevStep3 = document.getElementById('prevStep3');

const form = document.getElementById('multiStepForm');
const errorMessages = document.getElementById('errorMessages');

// Переходы между шагами
nextStep1.addEventListener('click', () => {
  let email = document.getElementById('uemail').value.trim();
  let username = document.getElementById('username').value.trim();

  errorMessages.innerHTML = '';
  if (username === '') {
      errorMessages.innerHTML += 'Username is required.<br>';
  }
  if (email === '') {
      errorMessages.innerHTML += 'Email is required.<br>';
  } else if (!validateEmail(email)) {
      errorMessages.innerHTML += 'Invalid email.<br>';
  }

  if (errorMessages.innerHTML === '') {
      step1.style.display = 'none';
      step2.style.display = 'block';
  }
});

nextStep2.addEventListener('click', () => {
  let firstName = document.getElementById('firstName').value.trim();
  let lastName = document.getElementById('lastName').value.trim();

  errorMessages.innerHTML = '';
  if (firstName === '') {
      errorMessages.innerHTML += 'First name is required.<br>';
  }
  if (lastName === '') {
      errorMessages.innerHTML += 'Last name is required.<br>';
  }

  if (errorMessages.innerHTML === '') {
      step2.style.display = 'none';
      step3.style.display = 'block';
  }
});

prevStep2.addEventListener('click', () => {
  step2.style.display = 'none';
  step1.style.display = 'block';
});

prevStep3.addEventListener('click', () => {
  step3.style.display = 'none';
  step2.style.display = 'block';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  let password = document.getElementById('password').value.trim();
  let confirmPassword = document.getElementById('confirmPassword').value.trim();

  errorMessages.innerHTML = '';

  if (password === '') {
      errorMessages.innerHTML += 'Password is required.<br>';
  } else if (password.length < 6) {
      errorMessages.innerHTML += 'Password must be at least 6 characters.<br>';
  }

  if (confirmPassword === '') {
      errorMessages.innerHTML += 'Confirm password is required.<br>';
  } else if (password !== confirmPassword) {
      errorMessages.innerHTML += 'Passwords do not match.<br>';
  }

  if (errorMessages.innerHTML === '') {
      alert('Form successfully submitted!');
      form.reset();
      step1.style.display = 'block';
      step3.style.display = 'none';
  }
});


// Функция выхода из аккаунта
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    alert('You have been logged out.');
    window.location.href = 'index.html';
}

// Выполнение проверки авторизации при загрузке страницы
