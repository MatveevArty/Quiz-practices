import {CustomHttp} from "../services/custom-http.js";
import {Auth} from "../services/auth.js";
import config from "../../config/config.js";

export class Form {

    constructor(page) {

        this.agreeElement = null; // Запись чекбокса в свойство Form, т.к. он используется в методах init и validateForm
        this.processElement = null; // аналогично с agreeElement
        this.page = page; // сохраняем параметр page в свойство объекта page

        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                // Регулярка для почты
                regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                // Регулярка для почты
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            }
        ];

        // Проверка, если это страница регистрации, то присвоение свойств name и lastName для главного объекта
        if (this.page === 'signup') {
            this.fields.unshift({
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /^[А-ЯЁ][а-яё]+\s*$/, // Регулярка для имени
                    valid: false,
                },
                {
                    name: 'lastName',
                    id: 'lastname',
                    element: null,
                    regex: /^[А-ЯЁ][а-яе]+\s*$/, // Регулярка для фамилии
                    valid: false,
                }
            )
        }

        const that = this; // Объявление константы для использования её ниже с целью "замыкания через другую переменную"

        // Нахождение каждого text инпута страницы на по id из свойства fields и их валидация по методу validateField
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            // Обработчик события при каждом изменении значения и валидация сразу же
            item.element.onchange = function () {
                // Инициализация функции, которое есть свойство у объекта Form, применение метода call(thisContext, arg1, arg2),
                // где thisContext - объект Form, arg1 - объект массива fields, arg2 - текущий элемент this
                that.validateField.call(that, item, this);
            }
        });

        // Нахождение кнопки по id и присвоение её в переменную, которая есть свойства processElement у всего объекта Form
        this.processElement = document.getElementById('process');
        // Обработчик события клика на кнопку
        this.processElement.onclick = function () {
            that.processForm();
        }

        // Валидация чекбокса для страница регистрации
        if (this.page === 'signup') {
            // Нахождение чекбокса по id и присвоение его в переменную, которое есть свойство agreeElement у всего объекта Form
            this.agreeElement = document.getElementById('agree');
            // Обработчик события изменения значения чекбокса и инициализация метода validateForm
            this.agreeElement.onchange = function () {
                that.validateForm();
            }
        }
    }

    validateField(field, element) {
        // Проверка, если значение инпута пустое или не соответствует регулярке, то
        if (!element.value || !element.value.match(field.regex)) {
            element.parentNode.style.borderColor = 'red'; // окрашивание рамки род блока в красный цвет
            field.valid = false; // присвоение значения false для свойства valid у объекта массива fields
        } else {
            element.parentNode.removeAttribute('style');
            field.valid = true;
        }
        // Инициализация функции validateForm после валидации инпутов для полноценной валидации формы
        this.validateForm();
    }

    validateForm() {
        // Присовение в переменную результата функции every на проверку свойства valid у каждого элемента массива fields
        const validForm = this.fields.every(item => item.valid);

        // Присвоение в переменную результата валидности чекбокса и валидности всех инпутов, если это страница регистрации
        // и присовение результата валидности всех инпутов, если это страница логина
        const isValid = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
        if (isValid) {
            this.processElement.removeAttribute('disabled'); // Раздизейбл кнопки
        } else {
            this.processElement.setAttribute('disabled', 'disabled'); // Дизейбл кнопки
        }
        return isValid; // Возвращение true/false для его использования в методе processForm
    }

    async processForm() {
        if (this.validateForm()) {

            // Вынесение используемых не раз переменных, чтобы не искать их много раз
            const email = this.fields.find(item => item.name === 'email').element.value;
            const password = this.fields.find(item => item.name === 'password').element.value;

            // Если страница регистрации
            if (this.page === 'signup') {
                try {
                    const result = await CustomHttp.request(config.host + '/signup', 'POST', {
                        name: this.fields.find(item => item.name === 'name').element.value,
                        lastName: this.fields.find(item => item.name === 'lastName').element.value,
                        email: email,
                        password: password,
                    })

                    if (result) {
                        if (result.error || !result.user) {
                            throw new Error(result.message);
                        }
                    }
                } catch (error) {
                    return console.log(error); // Завершение этой функции, т.к. юзер не может логиниться, если он даже не зарегистрировался
                }
            }

            // Если страница не ргеистрации, а логин
            try {
                const result = await CustomHttp.request(config.host + '/login', 'POST', {
                    email: email,
                    password: password
                });

                if (result) {
                    if (result.error || !result.accessToken || !result.refreshToken
                        || !result.fullName || !result.userId) {
                        throw new Error(result.message);
                    }

                    Auth.setTokens(result.accessToken, result.refreshToken);
                    Auth.setUserInfo({
                        fullName: result.fullName,
                        userId: result.userId
                    });
                    location.href = '#/choice';
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}