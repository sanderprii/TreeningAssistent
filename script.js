// Loome muutujad kasutajate ja treeningute haldamiseks
let users = JSON.parse(localStorage.getItem('users')) || [];
let loggedInUser = null;


// Kuva autentimise vorm
document.getElementById('register-btn').addEventListener('click', function() {
    showAuthForm('register');
});

document.getElementById('login-btn').addEventListener('click', function() {
    showAuthForm('login');
});

document.getElementById('to-login-btn').addEventListener('click', function() {
    showAuthForm('login');
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
    } else {
        document.getElementById('form-title').textContent = 'Sisselogimine';
        document.getElementById('submit-btn').textContent = 'Logi sisse';
        document.getElementById('to-register-btn').style.display = 'block';
        document.getElementById('to-login-btn').style.display = 'none';
    }
}

document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (document.getElementById('submit-btn').textContent === 'Loo kasutaja') {
        createUser(username, password);
    } else {
        loginUser(username, password);
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

function loginUser(username, password) {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        loggedInUser = user;
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('user-name').textContent = username;
    } else {
        alert('Vale kasutajanimi või parool.');
        document.getElementById('username').classList.add('error');
    }
}

// Ristkülikute klikkimine
document.getElementById('workout-page').addEventListener('click', function() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('workout-container').style.display = 'block';
});

document.getElementById('timeline-page').addEventListener('click', function() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('timeline-container').style.display = 'block';

});

document.getElementById('ai-suggestions-page').addEventListener('click', function() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('ai-container').style.display = 'block';

});

document.getElementById('profile-page').addEventListener('click', function() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('profile-container').style.display = 'block';
});

// Tagasi nupud
const backButtons = document.querySelectorAll('.back-btn');
backButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.parentElement.style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    });
});

// Profiililehe avamine ja algseadistamine
document.getElementById('profile-page').addEventListener('click', function() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('profile-container').style.display = 'block';

    // Kontrollime, kas profiilipilt on vaikimisi või mitte
    const profilePicture = document.getElementById('profile-picture').src;
    if (profilePicture.includes('default-profile.png')) {
        document.getElementById('add-profile-picture-btn').style.display = 'block';
        document.getElementById('change-profile-picture-btn').style.display = 'none';
        document.getElementById('profile-picture-form').style.display = 'none';
    } else {
        document.getElementById('add-profile-picture-btn').style.display = 'none';
        document.getElementById('change-profile-picture-btn').style.display = 'block';
        document.getElementById('profile-picture-form').style.display = 'none';
    }
});

// Nupp profiilipildi lisamiseks - näitab üleslaadimisvormi
document.getElementById('add-profile-picture-btn').addEventListener('click', function() {
    document.getElementById('profile-picture-form').style.display = 'block';
    this.style.display = 'none'; // Peidame nupu pärast klikkimist
});

// Nupp profiilipildi muutmiseks - näitab üleslaadimisvormi
document.getElementById('change-profile-picture-btn').addEventListener('click', function() {
    document.getElementById('profile-picture-form').style.display = 'block';
    this.style.display = 'none'; // Peidame nupu pärast klikkimist
});

// Profiilipildi üleslaadimine serverisse
document.getElementById('profile-picture-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData();
    const fileField = document.querySelector('input[name="profilePicture"]');

    if (fileField.files.length === 0) {
        alert('Palun valige pilt.');
        return;
    }

    formData.append('profilePicture', fileField.files[0]);

    try {
        const response = await fetch('/upload-profile-picture', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (response.ok) {
            alert('Profiilipilt üles laaditud!');
            // Kuvame üleslaaditud profiilipildi
            document.getElementById('profile-picture').src = '/uploads/' + result.profilePicture;
            document.getElementById('profile-picture-form').style.display = 'none';
            document.getElementById('add-profile-picture-btn').style.display = 'none'; // Peidame lisamisnupu
            document.getElementById('change-profile-picture-btn').style.display = 'block'; // Kuvame muutmisnupu
        } else {
            alert('Viga: ' + result.error);
        }
    } catch (error) {
        console.error('Viga profiilipildi üleslaadimisel:', error);
    }
});

// Tagasi nupu funktsioon (minna tagasi juhtpaneelile)
document.querySelector('.back-btn').addEventListener('click', function() {
    document.getElementById('profile-container').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
});
