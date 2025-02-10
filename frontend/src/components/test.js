import {UrlManager} from "../utils/url-manager.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";

export class Test {

    constructor() {

        // Присвоение элементов текущего вопроса в переменные для избежания постоянного нахождения их по коду
        this.progressbarElement = null;
        this.prevButtonElement = null;
        this.nextButtonElement = null;
        this.passButtonElement = null;
        this.questionTitleElement = null;
        this.optionsElement = null;
        this.quiz = null;
        this.currentQuestionIndex = 1;
        this.userResult = [];
        this.routeParams = UrlManager.getQueryParams();

        this.init();
    }

    async init() {

        // Отправка XMLHttp запроса на бэкенд при условии получения testId c пред страницы choice.html
        if (this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id)
                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }

                    this.quiz = result;
                    this.startQuiz();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    startQuiz() {
        // Нахождение и присвоение в свойство progressbarElement прогресс-бара у объекта Test,
        // заголовка вопроса (с бэкенда) в свойство questionTitleElement и вариантов ответов (с бэкенда)
        // в свойство optionsElement
        this.progressbarElement = document.getElementById('test-progress');
        this.questionTitleElement = document.getElementById('test-question-title');
        this.optionsElement = document.getElementById('test-question-options');

        // Нахождение и присвоение в свойство nextButtonElement кнопки Далее у объекта Test
        this.nextButtonElement = document.getElementById('next-answer');
        this.nextButtonElement.onclick = this.move.bind(this, 'next');

        // Нахождение и присвоение в свойство passButtonElement кнопки Пропустить вопрос у объекта Test
        this.passButtonElement = document.getElementById('pass-answer');
        this.passButtonElement.onclick = this.move.bind(this, 'pass');

        // Нахождение и присвоение в свойство prevButtonElement кнопки Назад у объекта Test
        this.prevButtonElement = document.getElementById('prev-answer');
        this.prevButtonElement.onclick = this.move.bind(this, 'prev');

        // Присвоение названия проходимого теста в самом верху серыми буквами
        document.getElementById('test-pre-title').innerText = this.quiz.name;

        // Генерация прогресс-бара и показ вопросов (с сервера)
        this.prepareProgressBar();
        this.showQuestion();

        // Таймер теста
        const timerElement = document.getElementById('test-timer-clock');
        let seconds = 60;
        const interval = setInterval(function () {
            seconds--;
            timerElement.innerText = seconds;
            if (seconds === 0) {
                clearInterval(interval);
                this.complete();
            }
        }.bind(this), 1000)
    }

    prepareProgressBar() {
        for (let i = 0; i < this.quiz.questions.length; i++) {
            // Генерация кружков и номеров вопросов прогресс-бара
            const itemElement = document.createElement('div');
            itemElement.className = 'test-progress-item ' + (i === 0 ? 'question-active' : '');

            const itemCircleElement = document.createElement('div');
            itemCircleElement.className = 'test-progress-item-circle';

            const itemTextElement = document.createElement('div');
            itemTextElement.className = 'test-progress-item-text';
            itemTextElement.innerText = 'Вопрос ' + (i + 1);

            itemElement.appendChild(itemCircleElement);
            itemElement.appendChild(itemTextElement);

            this.progressbarElement.appendChild(itemElement);
        }
    }

    showQuestion() {
        // Определение индекса текущего вопроса и назначение это в переменную
        const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        // Вписание текста вопроса с бэкенда в элемент заголовка
        this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex
            + ':</span> ' + activeQuestion.question;

        // Очищение блока с вариантами ответов
        this.optionsElement.innerHTML = '';

        const that = this;

        const chosenOption = this.userResult.find(item => item.questionId === activeQuestion.id);

        // Вёрстка родблока, радио-инпута и лейбла для каждого варианта ответа
        activeQuestion.answers.forEach(answer => {
            const optionElement = document.createElement('div');
            optionElement.className = 'test-question-option'

            // Добавляем id ответа в переменную во избежание ошибок, т.к. это значение используется не раз далее
            const inputId = 'answer-' + answer.id;

            const inputElement = document.createElement('input');
            inputElement.className = 'option-answer'; // Назначение этого класса для корректного поиска кликнутых радио-инпутов
            inputElement.setAttribute('id', inputId);
            inputElement.setAttribute('type', 'radio');
            // Задаём один и тот же name для радио-инпутов ответов, т.к. на странице всегда один вопрос
            inputElement.setAttribute('name', 'answer');
            inputElement.setAttribute('value', answer.id);

            // Отображаем возможно выбранный ранее радио-инпут ответа
            if (chosenOption && chosenOption.chosenAnswerId === answer.id) {
                inputElement.setAttribute('checked', 'checked');
            }

            // Раздизейбл кнопки Далее при выборе радио-инпута
            inputElement.onchange = function () {
                that.chooseAnswer();
            }

            const labelElement = document.createElement('label');
            labelElement.setAttribute('for', inputId);
            labelElement.innerText = answer.answer;

            // Вкладываем радио-инпут и лейбл в общий род блок optionElement, а его уже в optionsElement
            optionElement.appendChild(inputElement);
            optionElement.appendChild(labelElement);
            this.optionsElement.appendChild(optionElement);
        })

        // Раздизейбл кнопки Далее при возвращении к предыдущим вопросам с выбранным радио-инпутом ответа
        if (chosenOption && chosenOption.chosenAnswerId) {
            this.nextButtonElement.removeAttribute('disabled');
        } else {
            this.nextButtonElement.setAttribute('disabled', 'disabled');
        }

        // Присвоение текста "Завершить" для кнопки Далее, если вопрос последний
        if (this.currentQuestionIndex === this.quiz.questions.length) {
            this.nextButtonElement.innerText = 'Завершить';
        } else {
            // Возвращаем текст кнопки на "Далее" при переходе с последней страницы на предыдущие
            this.nextButtonElement.innerText = 'Далее';
        }

        // Проверка, если текущий вопрос не 1, то кнопка Назад раздизейблится
        if (this.currentQuestionIndex > 1) {
            this.prevButtonElement.removeAttribute('disabled');
        } else {
            this.prevButtonElement.setAttribute('disabled', 'disabled');
        }
    }

    chooseAnswer() {
        this.nextButtonElement.removeAttribute('disabled');
    }

    move(action) {
        const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        // Нахождение выбранного радио-инпута с ответом
        const chosenAnswer =
            Array.from(document.getElementsByClassName('option-answer')).find(element => {
                return element.checked;
            });

        let chosenAnswerId = null;
        // Проверка, что выбранный ответ есть и есть в нём значение
        if (chosenAnswer && chosenAnswer.value) {
            chosenAnswerId = Number(chosenAnswer.value);
        }

        // Проверка, есть ли для данного вопроса уже выбранный ответ при возможных переходах "Пропустить вопрос"
        const existingResult = this.userResult.find(item => {
            return item.questionId === activeQuestion.id
        });
        if (existingResult) {
            existingResult.chosenAnswerId = chosenAnswerId;
        } else {
            this.userResult.push({
                questionId: activeQuestion.id,
                chosenAnswerId: chosenAnswerId
            })
        }

        // Переход по вопросам вперёд и назад исходя из приходящего значения строки action
        if (action === 'next' || action === 'pass') {
            this.currentQuestionIndex++;
        } else {
            this.currentQuestionIndex--;
        }

        // Завершение выполнения кода ниже при достижении последнего вопроса
        if (this.currentQuestionIndex > this.quiz.questions.length) {
            this.complete();
            return;
        }

        // Верное отображение прогресс-бара при переходе по вопросам
        Array.from(this.progressbarElement.children).forEach((item, index) => {
            const currentItemIndex = index + 1;
            item.classList.remove('question-complete');
            item.classList.remove('question-active');

            if (currentItemIndex === this.currentQuestionIndex) {
                item.classList.add('question-active');
            } else if (currentItemIndex < this.currentQuestionIndex) {
                item.classList.add('question-complete');
            }
        })

        this.showQuestion();
    }

    async complete() {

        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/';
        }

        try {
            const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/pass',
                'POST', {
                    userId: userInfo.userId,
                    results: this.userResult
                })

            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }
                location.href = '#/result?id=' + this.routeParams.id;
            }
        } catch (error) {
            console.log(error);
        }
    }
}