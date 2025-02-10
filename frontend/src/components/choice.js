import {UrlManager} from "../utils/url-manager.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Choice {

    constructor() {
        this.quizzes = [];
        this.routeParams = UrlManager.getQueryParams();

        this.init();
    }

    async init() {

        try {
            const result = await CustomHttp.request(config.host + '/tests')

            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }

                this.quizzes = result;
                this.processQuizzes();
            }
        } catch (error) {
            console.log(error);
        }
    }

    processQuizzes() {

        const choiceOptionsElement = document.getElementById('choice-options');

        // Проверка, что в свойстве quizzes у объекта Choice что-то есть из метода init и длина массива больше 0
        if (this.quizzes && this.quizzes.length > 0) {

            this.quizzes.forEach(quiz => {
                const that = this;

                // Создание родблока с классом choice-option
                const choiceOptionElement = document.createElement('div')
                choiceOptionElement.className = 'choice-option';
                choiceOptionElement.setAttribute('data-id', quiz.id); // Присвоение id блокам с тестом для возможности отработки метода chooseQuiz

                // Инициализация метода chooseQuiz с использование id теста при клике на блок choiceOptionElement
                choiceOptionElement.onclick = function () {
                    that.chooseQuiz(this);
                };

                // Создание инпута с классом choice-option-text и придание ему текста равным свойства name
                // у объекта quiz из всего массива quizzes, пришедших с бэкенда
                const choiceOptionTextElement = document.createElement('div')
                choiceOptionTextElement.className = 'choice-option-text';
                choiceOptionTextElement.innerText = quiz.name;

                // Создание родблока с классом choice-option-arrow для картинки стрелки
                const choiceOptionArrowElement = document.createElement('div')
                choiceOptionArrowElement.className = 'choice-option-arrow common-image';

                // Создание картинки стрелки
                const choiceOptionImageElement = document.createElement('img')
                choiceOptionImageElement.setAttribute('src', '/images/arrow.png');
                choiceOptionImageElement.setAttribute('alt', 'Стрелка');

                // Вкладывание элементов согласно правильной вёрстке
                choiceOptionArrowElement.appendChild(choiceOptionImageElement);
                choiceOptionElement.appendChild(choiceOptionTextElement);
                choiceOptionElement.appendChild(choiceOptionArrowElement);
                choiceOptionsElement.appendChild(choiceOptionElement);
            });
        }
    }

    chooseQuiz(element) {
        const dataId = element.getAttribute('data-id');

        if (dataId) {
            location.href = '#/test?id=' + dataId;
        }
    }
}