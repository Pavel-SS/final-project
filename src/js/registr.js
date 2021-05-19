// Переход между  Login  и  Registration
let cardBox = document.getElementById('card-box');

function openRegister() {
    cardBox.style.transform = 'rotateY(-180deg)';
}

function openLogin() {
    cardBox.style.transform = 'rotateY(0deg)';
}

//Registration
function inscription(event) {
    // блокировать отправку формы 
    event.preventDefault();

    // Получение значений, введенных пользователем
    let name = document.getElementById("name").value,
        surename = document.getElementById("surename").value,
        emailReg = document.getElementById("email-registr").value,
        passwordReg = document.getElementById("password-registr").value,
        passwordConf = document.getElementById("password-confirm").value;

    // Валидация полей ввода
    let errors = 0;
    if (name === "") {
        document.getElementById("name").classList.remove('is-valid');
        document.getElementById("name").classList.add('is-invalid');
        errors++;
        // отображать текст ошибки
        document.getElementById("name-error").innerText = "Name is required.";
    } else {
        document.getElementById("name").classList.remove('is-invalid');
        document.getElementById("name").classList.add('is-valid');
        // очистить сообщение об ошибке
        document.getElementById("name-error").innerText = "";
    }
    if (surename === "") {
        document.getElementById("surename").classList.remove('is-valid');
        document.getElementById("surename").classList.add('is-invalid');
        errors++;
        // отображать текст ошибки
        document.getElementById("surename-error").innerText = "Surname is required.";
    } else {
        document.getElementById("surename").classList.remove('is-invalid');
        document.getElementById("surename").classList.add('is-valid');
        // очистить сообщение об ошибке
        document.getElementById("surename-error").innerText = "";
    }
    if (emailReg.indexOf('@') == -1) {
        document.getElementById("email-registr").classList.remove('is-valid');
        document.getElementById("email-registr").classList.add('is-invalid');
        errors++;
        // отображать текст ошибки
        document.getElementById("email-registr-error").innerText = "The email address is invalid.";
    } else {
        document.getElementById("email-registr").classList.remove('is-invalid');
        document.getElementById("email-registr").classList.add('is-valid');
        // очистить сообщение об ошибке
        document.getElementById("email-registr-error").innerText = "";
    }
    if (passwordReg === "") {
        document.getElementById("password-registr").classList.remove('is-valid');
        document.getElementById("password-registr").classList.add('is-invalid');
        errors++;
        // отображать текст ошибки
        document.getElementById("password-registr-error").innerText = "Password is required.";
    } else {
        document.getElementById("password-registr").classList.remove('is-invalid');
        document.getElementById("password-registr").classList.add('is-valid');
        // очистить сообщение об ошибке
        document.getElementById("password-registr-error").innerText = "";
    }
    if (passwordConf === "" || passwordReg !== passwordConf) {
        document.getElementById("password-confirm").classList.remove('is-valid');
        document.getElementById("password-confirm").classList.add('is-invalid');
        errors++;
        // отображать текст ошибки
        document.getElementById("password-confirm-error").innerText = "Confirmation is required, or confirmation is invalid.";
    } else {
        document.getElementById("password-confirm").classList.remove('is-invalid');
        document.getElementById("password-confirm").classList.add('is-valid');
        // очистить сообщение об ошибке
        document.getElementById("password-confirm-error").innerText = "";
    }

    if (errors > 0) {
        return;
    }

    // Create an object user
    let user = {
        name: name,
        surename: surename,
        email: emailReg,
        password: passwordReg
    };

    // Получение старых пользователей (если они есть) или пустой массив
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Пушим  user  в  users
    users.push(user);

    // Cохраняем пользователей в localStorage
    localStorage.setItem('users', JSON.stringify(users));


    // Очистка полей
    document.getElementById("name").value = "";
    document.getElementById("surename").value = "";
    document.getElementById("email-registr").value = "";
    document.getElementById("password-registr").value = "";
    document.getElementById("password-confirm").value = "";

    // Проверка пустого класса 
    document.getElementById("name").classList.remove('is-valid');
    document.getElementById("surename").classList.remove('is-valid');
    document.getElementById("email-registr").classList.remove('is-valid');
    document.getElementById("password-registr").classList.remove('is-valid');
    document.getElementById("password-confirm").classList.remove('is-valid');
}


//Login
function login(event) {
    //блокировать отправку формы 
    event.preventDefault();
    // Получение значений, от пользователя
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    const signLogBtn = document.getElementById("sign-btn").value;
    // Проверка поля
    let errors = 0;
    if (email.indexOf('@') == -1) {
        document.getElementById("email").classList.remove('is-valid');
        document.getElementById("email").classList.add('is-invalid');
        errors++;
        // текст ошибки
        document.getElementById("email-error").innerText = "The email address is invalid.";
    } else {
        document.getElementById("email").classList.remove('is-invalid');
        document.getElementById("email").classList.add('is-valid');
        //Если поле заполненно верно, очистить сообщение об ошибке
        document.getElementById("email-error").innerText = "";
    }
    if (password === "") {
        document.getElementById("password").classList.remove('is-valid');
        document.getElementById("password").classList.add('is-invalid');
        errors++;
        //текст ошибки
        document.getElementById("password-error").innerText = "Need password";
    } else {
        document.getElementById("password").classList.remove('is-invalid');
        document.getElementById("password").classList.add('is-valid');
        // vider le message d'erreur
        document.getElementById("password-error").innerText = "";
    }

    if (errors > 0) {
        return;
    }

    // Получение старых пользователей (если они есть) или пустой массив
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Проверяем зарегистрированн ли данный пользователь на сайте или нет
    let userFound = users.find(user => user.email === email && user.password === password);

    // Если пользователь определен(т.е. !=undefined),
    // тогда сохраняем его в localStorage
    // и возвращаемся на главную страницу
    if (userFound !== undefined) {
        localStorage.setItem('connected-user', JSON.stringify(userFound));
        window.location.href = "index.html";
    }
    //Если же нет говорим, что такого пользователя не существует
    else {
        alert("Check your email or password.");
    }
}