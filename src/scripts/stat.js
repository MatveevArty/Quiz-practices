(function () {
    const Stat = {
        name: null,
        lastName: null,
        email: null,
        quiz: null,
        rightAnswers: null,
        questionTitleElements: null,
        userResult: null,

        init() {

            getTrueYear(); // Текущий год в футере
            checkStart(); // Проверяем клик на первой странице
            checkUserData(); // Проверяем введение данных пользователем на form.html
            deleteSessionStorage(); // Обнуляем sessionStorage при клике на лого и возращении на главную

            this.userResult = JSON.parse(sessionStorage.getItem('results'));
            this.name = JSON.stringify(sessionStorage.getItem('name')).replace(/"/g, "");
            this.lastName = JSON.stringify(sessionStorage.getItem('lastName')).replace(/"/g, "");
            this.email = JSON.stringify(sessionStorage.getItem('email')).replace(/"/g, "");

            const testId = sessionStorage.getItem('data-id');

            const xhr1= new XMLHttpRequest();
            xhr1.open('GET', 'https://testologia.ru/get-quiz-right?id=' + testId, false);
            xhr1.send();
            if (xhr1.status === 200 && xhr1.responseText) {
                try {
                    this.rightAnswers = JSON.parse(xhr1.responseText);
                } catch (e) {
                    location.href = 'index.html';
                }
            }

            const xhr2 = new XMLHttpRequest();
            xhr2.open('GET', 'https://testologia.ru/get-quiz?id=' + testId, false);
            xhr2.send();

            if (xhr2.status === 200 && xhr2.responseText) {
                try {
                    this.quiz = JSON.parse(xhr2.responseText); // Присваивание запарсенного ответа с бэкенда в свойство quiz объекта Test
                } catch (e) {
                    location.href = 'index.html';
                }
                this.showPage(); // Инициализация метода startQuiz при условии корректных получении данных с бэкенда
            }

        },

        showPage() {

            document.getElementById('stat-user').innerHTML = 'Тест выполнил <span>' + this.name + ' '
                + this.lastName + ', ' + this.email + '</span>';

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
                    // Верстаем блок каждого варианта ответа для каждого вопроса и делаем верную вложенность
                    const questionOption = document.createElement('div');
                    questionOption.className = 'stat-question-option common-question-option';

                    const questionOptionInput = document.createElement('input');
                    questionOptionInput.className = 'stat-question-option-input';
                    questionOptionInput.setAttribute('type', 'radio');
                    questionOptionInput.setAttribute('id', this.quiz.questions[i].answers[j].id);
                    questionOptionInput.setAttribute('name', 'question-' + this.quiz.questions[i].id);
                    questionOptionInput.disabled = true;

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

            this.checkAnswers();
        },

        checkAnswers() {

            // Находим все радио-инпуты всего теста
            let allInputs = document.getElementsByClassName('stat-question-option-input');

            // Помещаем id ответов пользователя в массив
            const userAnswers = this.userResult.map(item => item.chosenAnswerId);

            // Проходим по массиву всех инпутов с проверкой на их равенство id выбранного радио-инпута пользователем
            // и определяем верность овтета
            for (let i = 0; i < allInputs.length; i++) {
                const inputId = +allInputs[i].getAttribute('id');
                const isChosen = userAnswers.some(userAnswer => userAnswer === inputId);

                if (isChosen) {
                    allInputs[i].setAttribute('checked', 'checked');

                    const isRight = this.rightAnswers.find(rightAnswer => rightAnswer === inputId);

                    if (isRight) {
                        allInputs[i].className = 'stat-question-option-input right-answer';
                    } else {
                        allInputs[i].className = 'stat-question-option-input wrong-answer';
                    }
                }
            }
        }
    }

    Stat.init();
})();