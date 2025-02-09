export class UrlManager {

    // Обработка параметров url-строки регуляркой
    static getQueryParams() {
        const qs = document.location.hash.split('+').join(' ');

        let params = {},
            tokens,
            re = /[?&]([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }

        return params;
    }

    // Парсинг свойств name, lastName и email в адресной строке, иначе переадресация на #/
    static checkUserData(params) {

        if (!params.name || !params.lastName || !params.email) {
            location.href = '#/';
        }
    }
}