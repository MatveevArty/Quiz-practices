(function() {
    const Index = {
        startButton: null,

        init() {

            getTrueYear(); // Текущий год в футере
            deleteSessionStorage(); // Обнуляем sessionStorage при клике на лого и возращении на главную

            this.startButton = document.getElementById('start-button');

            this.startButton.onclick = function() {
                sessionStorage.setItem('startClick', true);
            }
        }
    }

    Index.init();
})();