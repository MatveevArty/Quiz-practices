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

        // Добавляем body для params запроса, если оно есть
        if (body) {
            params.body = JSON.stringify(body);
        }

        const response = await fetch(url, params);

        // Обработка ошибки
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.message);
        }

        return await response.json();
    }
}