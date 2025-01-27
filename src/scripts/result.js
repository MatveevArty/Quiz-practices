(function() {
    const Result = {
        init() {

            checkStart(); // Проверяем клик на первой странице
            checkUserData(); // Проверяем введение данных пользователем на form.html

            const score = sessionStorage.getItem("score");
            const total = sessionStorage.getItem("total");

            document.getElementById('result-score').innerText = score + '/' + total;
        }
    }

    Result.init();
})();