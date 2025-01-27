(function() {
    const Index = {
        startButton: null,

        init() {

            this.startButton = document.getElementById('start-button');

            this.startButton.onclick = function() {
                sessionStorage.setItem('startClick', true);
            }
        }
    }

    Index.init();
})();