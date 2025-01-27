(function () {
    const Stat = {
        quiz: null,
        questionTitleElements: null,
        userResult: null,

        init() {

            this.userResult = JSON.parse(sessionStorage.getItem('results'));

            const testId = sessionStorage.getItem('data-id');

            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://testologia.ru/get-quiz?id=' + testId, false);
            xhr.send();

            if (xhr.status === 200 && xhr.responseText) {
                try {
                    this.quiz = JSON.parse(xhr.responseText); // Присваивание запарсенного ответа с бэкенда в свойство quiz объекта Test
                } catch (e) {
                    location.href = 'index.html';
                }
                this.showPage(); // Инициализация метода startQuiz при условии корректных получении данных с бэкенда
            }

        },

        showPage() {

            // Присвоение названия проходимого теста в самом верху серыми буквами
            document.getElementById('stat-pre-title').innerText = this.quiz.name;

            // Проходим циклом по всем вопросам
            for (let i = 0; i < this.quiz.questions.length; i++) {
                const questionsBlock = document.getElementById('stat-questions');
                const questionBlock = document.createElement('div');
                questionBlock.className = 'stat-question common-question';

                const questionTitle = document.createElement('div');
                questionTitle.className = 'stat-question-title common-question-title';
                questionTitle.innerHTML = '<span>Вопрос ' + (i + 1) + ':</span> ' + this.quiz.questions[i].question;

                const questionOptions = document.createElement('div');
                questionOptions.className = 'stat-question-options';

                // Проходим циклом по всем ответам на каждый вопрос
                for (let j = 0; j < this.quiz.questions[i].answers.length; j++) {
                    const questionOption = document.createElement('div');
                    questionOption.className = 'stat-question-option common-question-option';

                    const questionOptionInput = document.createElement('input');
                    questionOptionInput.className = 'stat-question-option-input';
                    questionOptionInput.setAttribute('type', 'radio');
                    questionOptionInput.setAttribute('id', this.quiz.questions[i].answers[j].id);
                    questionOptionInput.setAttribute('name', 'question-' + this.quiz.questions[i].id);

                    const questionOptionLabel = document.createElement('label');
                    questionOptionLabel.setAttribute('for', this.quiz.questions[i].answers[j].id);
                    questionOptionLabel.className = 'stat-question-option-label';
                    questionOptionLabel.innerText = this.quiz.questions[i].answers[j].answer;

                    questionOption.appendChild(questionOptionInput);
                    questionOption.appendChild(questionOptionLabel);
                    questionOptions.appendChild(questionOption);
                }

                questionBlock.appendChild(questionTitle);
                questionBlock.appendChild(questionOptions);
                questionsBlock.appendChild(questionBlock);
            }


        }

    }

    Stat.init();
})();