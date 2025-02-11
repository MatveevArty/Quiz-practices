import {UrlManager} from "../utils/url-manager.js";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";

export class Stat {

    constructor() {

        this.quiz = null; // Здесь вся инфа о тесте
        this.userFullname = null;
        this.userEmail = null;
        this.resultBtn = document.getElementById('back-to-circle-number');
        this.routeParams = UrlManager.getQueryParams();
        this.init();
    }

    async init() {

        // Объявляем переменную для использования при потере контекста
        const that = this;

        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/';
        }

        this.userFullname = userInfo.fullName;
        this.userEmail = userInfo.email;

        if (this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id
                    + '/result/details?userId=' + userInfo.userId);

                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }

                    // Присваиваем весь ответ по запросу /api/tests/:id/result/details?userId=:userId в переменную quiz
                    this.quiz = result.test;

                    // Возвращение на страницу кружка с результатом
                    this.resultBtn.onclick = function () {
                        location.href = '#/result?id=' + that.routeParams.id;
                    }

                    // Инициализация метода показа всех правильных и неправильных ответов
                    this.showPage();

                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }

        location.href = '#/';

    }

    async showPage() {

        document.getElementById('stat-user').innerHTML = 'Тест выполнил <span>' + this.userFullname + ', ' + this.userEmail + '</span>';

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

                // Проверка на верный/неверный ответ и присвоение соответствующего цвета инпуту и лейблу
                if (this.quiz.questions[i].answers[j].correct === true) {
                    questionOptionInput.setAttribute('checked', 'checked');
                    questionOptionInput.className = 'stat-question-option-input right-answer';
                    questionOptionLabel.className = 'stat-question-option-label right-answer-label';
                }
                if (this.quiz.questions[i].answers[j].correct === false) {
                    questionOptionInput.setAttribute('checked', 'checked');
                    questionOptionInput.className = 'stat-question-option-input wrong-answer';
                    questionOptionLabel.className = 'stat-question-option-label wrong-answer-label';
                }

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