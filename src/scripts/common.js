// Парсинг данных name, lastName и email в sessionStorage, иначе переадресация на index.html
function checkUserData() {
    const name = sessionStorage.getItem('name');
    const lastName = sessionStorage.getItem('lastName');
    const email = sessionStorage.getItem('email');

    if (!name || !lastName || !email) {
        location.href = 'index.html';
    }
}

function checkStart() {
    const startClick = sessionStorage.getItem('startClick');

    if (!startClick) {
        location.href = 'index.html';
    }
}

function deleteSessionStorage() {
    const logoBtn = document.getElementById('logo');

    logoBtn.onclick = function () {
        sessionStorage.clear();
    }
}

function getTrueYear() {
    let today  = new Date();
    let todayYear = today.getFullYear();

    const footerDate = document.querySelector('.footer > span').innerText = todayYear;
}