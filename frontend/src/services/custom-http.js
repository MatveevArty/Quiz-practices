import {Auth} from "./auth.js";

export class CustomHttp {

    static async request(url, method = 'GET', body = null) {

        // Параметры по умолчанию
        const params = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
        };

        // Проверка, есть ли что-то в localStorage и если да, то добавить в header
        let token = localStorage.getItem(Auth.accessTokenKey);
        if (token) {
            params.headers['x-access-token'] = token;
        }

        // Добавляем body для params запроса, если оно есть
        if (body) {
            params.body = JSON.stringify(body);
        }

        const response = await fetch(url, params);

        // Обработка ошибки
        if (response.status < 200 || response.status >= 300) {

            // Проверка, истёк ли accessToken
            if (response.status === 401) {
                const result = await Auth.processUnauthorizedResponse();
                if (result) {
                    return await this.request(url, method, body); // Рекурсия этой функции, но уже с обновлёнными данными (парой токенов)
                } else {
                    return null;
                }
            }
            throw new Error(response.message);
        }

        return await response.json();
    }
}