import config from "../../config/config";

export class Auth {

    // Создание переменных для недопущения банальных потенциальных ошибок при написании названий значений в localStorage
    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';

    // Обработка просроченного accessToken
    static async processUnauthorizedResponse() {
        const refreshToken = localStorage.getItem(this.refreshTokenKey);
        if (refreshToken) {
            const response = await fetch(config.host + '/refresh', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({refreshToken: refreshToken})
            });

            // Проверка на получение ответа от запроса по обновлению accessToken с последующим переназначением пары токенов
            if (response && response.status === 200) {
                const result = await response.json();
                if (result && !result.error) {
                    this.setTokens(result.accessToken, result.refreshToken);
                    return true;
                }
            }
        }

        this.removeTokens();
        location.href = '#/';
        // Перенаправление юзера на главную в случае ошибки обновления токена
        return false;
    }

    static setTokens(accessToken, refreshToken) {
        // Присваивание значений accessToken и refreshToken для соответствующих значений в localStorage
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    }

    static removeTokens(accessToken, refreshToken) {
        // Удаление значений accessToken и refreshToken для соответствующих значений в localStorage
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }
}