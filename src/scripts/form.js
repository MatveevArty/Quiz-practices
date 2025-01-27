(function () {
    // Создание объекта Form со свойствами и функциями для страницы form.html, пример хорошей практики от Романа
    const Form = {
        agreeElement: null, // Запись чекбокса в свойство Form, т.к. он используется в методах init и validateForm
        processElement: null, // аналогично с agreeElement
        fields: [
            {
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
            },
            {
                name: 'email',
                id: 'email',
                element: null,
                // Регулярка для почты
                regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                valid: false,
            },
        ],
        init () {
            checkStart(); // Проверяем клик на первой странице
            deleteSessionStorage(); // Обнуляем sessionStorage при клике на лого и возращении на главную

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

            // Нахождение чекбокса по id и присвоение его в переменную, которое есть свойство agreeElement у всего объекта Form
            this.agreeElement = document.getElementById('agree');
            // Обработчик события изменения значения чекбокса и инициализация метода validateForm
            this.agreeElement.onchange = function () {
                that.validateForm();
            }
        },

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
        },

        validateForm() {
            // Присовение в переменную результата функции every на проверку свойства valid у каждого элемента массива fields
            const validForm = this.fields.every(item => item.valid);

            // Присвоение в переменную результата валидности чекбокса и валидности всех инпутов
            const isValid = this.agreeElement.checked && validForm;
            if (isValid) {
                this.processElement.removeAttribute('disabled'); // Раздизейбл кнопки
            } else {
                this.processElement.setAttribute('disabled', 'disabled'); // Дизейбл кнопки
            }
            return isValid; // Возвращение true/false для его использования в методе processForm
        },

        processForm() {
            if (this.validateForm()) {

                let paramString = '';
                // Добавление в строку paramString значения свойства name и value каждого элемента массива fields
                this.fields.forEach(item => {
                    // Сохранение в sessionStorage данных пользователя без лишних пробелов: name, lastName, email
                    sessionStorage.setItem(item.name, item.element.value.trim());
                });

                location.href = 'choice.html';
            }
        }
    };

    Form.init();
})();