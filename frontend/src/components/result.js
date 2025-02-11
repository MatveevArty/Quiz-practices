import {UrlManager} from "../utils/url-manager.js";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";

export class Result {

    constructor() {

        this.routeParams = UrlManager.getQueryParams();
        this.statBtn = document.getElementById('pass-answer');

        this.init();
    }

    async init() {

        // Объявляем переменную для использования при потере контекста
        const that = this;

        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/';
        }

        if (this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id
                    + '/result?userId=' + userInfo.userId);

                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }

                    document.getElementById('result-score').innerText = result.score + '/' + result.total;

                    // Направляем на страницу красивого выделения правильных и неправильных вопросов
                    that.statBtn.onclick = function () {
                        location.href = '#/stat?id=' + that.routeParams.id;
                    }
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }

        location.href = '#/';
    }
}