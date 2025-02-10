import {Form} from "./components/form.js";
import {Choice} from "./components/choice.js";
import {Test} from "./components/test.js";
import {Result} from "./components/result.js";


export class Router {

    constructor() {
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'templates/#/',
                styles: 'styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                styles: 'styles/form.css',
                load: () => {
                    new Form('signup');
                }
            },
            {
                route: '#/login',
                title: 'Вход в систему',
                template: 'templates/login.html',
                styles: 'styles/form.css',
                load: () => {
                    new Form('login');
                }
            },
            {
                route: '#/choice',
                title: 'Выбор теста',
                template: 'templates/choice.html',
                styles: 'styles/choice.css',
                load: () => {
                    new Choice();
                }
            },
            {
                route: '#/test',
                title: 'Прохождение теста',
                template: 'templates/test.html',
                styles: 'styles/test.css',
                load: () => {
                    new Test();
                }
            },
            {
                route: '#/result',
                title: 'Результаты теста',
                template: 'templates/result.html',
                styles: 'styles/result.css',
                load: () => {
                    new Result();
                }
            },
        ]
    }

    async openRoute() {
        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash.split('?')[0];
        });

        if (!newRoute) {
            window.location.href = '#/';
            return;
        }

        // Задание html элементов конкретной страницы
        document.getElementById('content').innerHTML =
            await fetch(newRoute.template).then(response => response.text());

        // Задание css стилей конкретной страницы
        document.getElementById('styles').setAttribute('href', newRoute.styles);

        // Задание заголовка страницы в ссылке браузера
        document.getElementById('page-title').innerText = newRoute.title;

        // Запуск функции load со скриптами для конкретной страницы
        newRoute.load();
    }
}