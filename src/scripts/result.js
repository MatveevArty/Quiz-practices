(function() {
    const Result = {
        init() {

            checkStart(); // Проверяем клик на первой странице
            checkUserData(); // Проверяем введение данных пользователем на form.html
            deleteSessionStorage(); // Обнуляем sessionStorage при клике на лого и возращении на главную

            const score = sessionStorage.getItem("score");
            const total = sessionStorage.getItem("total");

            document.getElementById('result-score').innerText = score + '/' + total;
        }
    }

    Result.init();
})();