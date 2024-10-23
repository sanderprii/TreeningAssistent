// Loome muutujad kasutajate ja treeningute haldamiseks
let users = JSON.parse(localStorage.getItem('users')) || [];
let loggedInUser = null;


// Kuva autentimise vorm
document.getElementById('register-btn').addEventListener('click', function() {
    showAuthForm('register');
});



document.getElementById('to-register-btn').addEventListener('click', function() {
    showAuthForm('register');
});

function showAuthForm(mode) {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('auth-container').style.display = 'block';

    if (mode === 'register') {
        document.getElementById('form-title').textContent = 'Kasutaja loomine';
        document.getElementById('submit-btn').textContent = 'Loo kasutaja';
        document.getElementById('to-register-btn').style.display = 'none';
        document.getElementById('to-login-btn').style.display = 'block';

    }
}

document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (document.getElementById('submit-btn').textContent === 'Loo kasutaja') {
        createUser(username, password);

    }

    document.getElementById('user-form').reset();
});

function createUser(username, password) {
    if (users.find(user => user.username === username)) {
        alert('Kasutajanimi on juba olemas. Palun vali teine.');
        document.getElementById('username').classList.add('error');
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Kasutaja loodud!');
    showAuthForm('login');
}



