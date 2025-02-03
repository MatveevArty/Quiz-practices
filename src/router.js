import {Form} from "./components/form.js";

export class Router {

    constructor() {
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'templates/index.html',
                styles: 'styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/form',
                title: 'Регистрация',
                template: 'templates/form.html',
                styles: 'styles/form.css',
                load: () => {
                    new Form();
                }
            },

        ]
    }

    async openRoute() {
        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash;
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

        // Запуск функции load со скриптами для конкретной страницы
        newRoute.load();

        // Задание заголовка страницы в ссылке браузера
        document.getElementById('page-title').innerText = newRoute.title;
    }
}