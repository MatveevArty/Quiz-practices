/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router.js */ \"./src/router.js\");\n\nclass App {\n  constructor() {\n    this.router = new _router_js__WEBPACK_IMPORTED_MODULE_0__.Router();\n    window.addEventListener('DOMContendLoaded', this.handleRouteChanging.bind(this));\n    window.addEventListener('popstate', this.handleRouteChanging.bind(this));\n  }\n  handleRouteChanging() {\n    this.router.openRoute();\n  }\n}\nnew App();\n\n//# sourceURL=webpack://practice9-8/./src/app.js?");

/***/ }),

/***/ "./src/components/choice.js":
/*!**********************************!*\
  !*** ./src/components/choice.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Choice: () => (/* binding */ Choice)\n/* harmony export */ });\n/* harmony import */ var _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/url-manager.js */ \"./src/utils/url-manager.js\");\n\nclass Choice {\n  constructor() {\n    this.quizzes = [];\n    this.routeParams = _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__.UrlManager.getQueryParams();\n\n    // Проверка ввода личных данных на странице form\n    _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__.UrlManager.checkUserData(this.routeParams);\n\n    // Отправка XMLHttp запроса на бэкенд для получения списка квизов\n    const xhr = new XMLHttpRequest();\n    xhr.open('GET', 'https://testologia.ru/get-quizzes', false);\n    xhr.send();\n\n    // Если статус запроса успех и есть responseText, то инициализация метода processQuizzes с доп парсингом\n    if (xhr.status === 200 && xhr.responseText) {\n      try {\n        this.quizzes = JSON.parse(xhr.responseText);\n      } catch (e) {\n        location.href = '#/';\n      }\n      this.processQuizzes();\n    } else {\n      location.href = '#/'; // иначе возврат на первую страницу\n    }\n  }\n  processQuizzes() {\n    const choiceOptionsElement = document.getElementById('choice-options');\n\n    // Проверка, что в свойстве quizzes у объекта Choice что-то есть из метода init и длина массива больше 0\n    if (this.quizzes && this.quizzes.length > 0) {\n      this.quizzes.forEach(quiz => {\n        const that = this;\n\n        // Создание родблока с классом choice-option\n        const choiceOptionElement = document.createElement('div');\n        choiceOptionElement.className = 'choice-option';\n        choiceOptionElement.setAttribute('data-id', quiz.id); // Присвоение id блокам с тестом для возможности отработки метода chooseQuiz\n\n        // Инициализация метода chooseQuiz с использование id теста при клике на блок choiceOptionElement\n        choiceOptionElement.onclick = function () {\n          that.chooseQuiz(this);\n        };\n\n        // Создание инпута с классом choice-option-text и придание ему текста равным свойства name\n        // у объекта quiz из всего массива quizzes, пришедших с бэкенда\n        const choiceOptionTextElement = document.createElement('div');\n        choiceOptionTextElement.className = 'choice-option-text';\n        choiceOptionTextElement.innerText = quiz.name;\n\n        // Создание родблока с классом choice-option-arrow для картинки стрелки\n        const choiceOptionArrowElement = document.createElement('div');\n        choiceOptionArrowElement.className = 'choice-option-arrow common-image';\n\n        // Создание картинки стрелки\n        const choiceOptionImageElement = document.createElement('img');\n        choiceOptionImageElement.setAttribute('src', '/images/arrow.png');\n        choiceOptionImageElement.setAttribute('alt', 'Стрелка');\n\n        // Вкладывание элементов согласно правильной вёрстке\n        choiceOptionArrowElement.appendChild(choiceOptionImageElement);\n        choiceOptionElement.appendChild(choiceOptionTextElement);\n        choiceOptionElement.appendChild(choiceOptionArrowElement);\n        choiceOptionsElement.appendChild(choiceOptionElement);\n      });\n    }\n  }\n  chooseQuiz(element) {\n    const dataId = element.getAttribute('data-id');\n    if (dataId) {\n      location.href = '#/test?name=' + this.routeParams.name + '&lastName=' + this.routeParams.lastName + '&email=' + this.routeParams.email + '&id=' + dataId;\n    }\n  }\n}\n\n//# sourceURL=webpack://practice9-8/./src/components/choice.js?");

/***/ }),

/***/ "./src/components/form.js":
/*!********************************!*\
  !*** ./src/components/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Form: () => (/* binding */ Form)\n/* harmony export */ });\nclass Form {\n  constructor() {\n    this.agreeElement = null; // Запись чекбокса в свойство Form, т.к. он используется в методах init и validateForm\n    this.processElement = null; // аналогично с agreeElement\n    this.fields = [{\n      name: 'name',\n      id: 'name',\n      element: null,\n      regex: /^[А-ЯЁ][а-яё]+\\s*$/,\n      // Регулярка для имени\n      valid: false\n    }, {\n      name: 'lastName',\n      id: 'lastname',\n      element: null,\n      regex: /^[А-ЯЁ][а-яе]+\\s*$/,\n      // Регулярка для фамилии\n      valid: false\n    }, {\n      name: 'email',\n      id: 'email',\n      element: null,\n      // Регулярка для почты\n      regex: /^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|.(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/,\n      valid: false\n    }];\n    const that = this; // Объявление константы для использования её ниже с целью \"замыкания через другую переменную\"\n\n    // Нахождение каждого text инпута страницы на по id из свойства fields и их валидация по методу validateField\n    this.fields.forEach(item => {\n      item.element = document.getElementById(item.id);\n      // Обработчик события при каждом изменении значения и валидация сразу же\n      item.element.onchange = function () {\n        // Инициализация функции, которое есть свойство у объекта Form, применение метода call(thisContext, arg1, arg2),\n        // где thisContext - объект Form, arg1 - объект массива fields, arg2 - текущий элемент this\n        that.validateField.call(that, item, this);\n      };\n    });\n\n    // Нахождение кнопки по id и присвоение её в переменную, которая есть свойства processElement у всего объекта Form\n    this.processElement = document.getElementById('process');\n    // Обработчик события клика на кнопку\n    this.processElement.onclick = function () {\n      that.processForm();\n    };\n\n    // Нахождение чекбокса по id и присвоение его в переменную, которое есть свойство agreeElement у всего объекта Form\n    this.agreeElement = document.getElementById('agree');\n    // Обработчик события изменения значения чекбокса и инициализация метода validateForm\n    this.agreeElement.onchange = function () {\n      that.validateForm();\n    };\n  }\n  validateField(field, element) {\n    // Проверка, если значение инпута пустое или не соответствует регулярке, то\n    if (!element.value || !element.value.match(field.regex)) {\n      element.parentNode.style.borderColor = 'red'; // окрашивание рамки род блока в красный цвет\n      field.valid = false; // присвоение значения false для свойства valid у объекта массива fields\n    } else {\n      element.parentNode.removeAttribute('style');\n      field.valid = true;\n    }\n    // Инициализация функции validateForm после валидации инпутов для полноценной валидации формы\n    this.validateForm();\n  }\n  validateForm() {\n    // Присовение в переменную результата функции every на проверку свойства valid у каждого элемента массива fields\n    const validForm = this.fields.every(item => item.valid);\n\n    // Присвоение в переменную результата валидности чекбокса и валидности всех инпутов\n    const isValid = this.agreeElement.checked && validForm;\n    if (isValid) {\n      this.processElement.removeAttribute('disabled'); // Раздизейбл кнопки\n    } else {\n      this.processElement.setAttribute('disabled', 'disabled'); // Дизейбл кнопки\n    }\n    return isValid; // Возвращение true/false для его использования в методе processForm\n  }\n  processForm() {\n    if (this.validateForm()) {\n      let paramString = '';\n      // Добавление в строку paramString значения свойства name и value каждого элемента массива fields\n      this.fields.forEach(item => {\n        // Применение тернарного оператора для проверки на первый это элемент цикла или нет\n        paramString += (!paramString ? '?' : '&') + item.name + '=' + item.element.value;\n      });\n      location.href = '#/choice' + paramString;\n    }\n  }\n}\n\n//# sourceURL=webpack://practice9-8/./src/components/form.js?");

/***/ }),

/***/ "./src/components/result.js":
/*!**********************************!*\
  !*** ./src/components/result.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Result: () => (/* binding */ Result)\n/* harmony export */ });\n/* harmony import */ var _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/url-manager.js */ \"./src/utils/url-manager.js\");\n\nclass Result {\n  constructor() {\n    this.routeParams = _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__.UrlManager.getQueryParams();\n    document.getElementById('result-score').innerText = this.routeParams.score + '/' + this.routeParams.total;\n  }\n}\n\n//# sourceURL=webpack://practice9-8/./src/components/result.js?");

/***/ }),

/***/ "./src/components/test.js":
/*!********************************!*\
  !*** ./src/components/test.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Test: () => (/* binding */ Test)\n/* harmony export */ });\n/* harmony import */ var _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/url-manager.js */ \"./src/utils/url-manager.js\");\n\nclass Test {\n  constructor() {\n    // Присвоение элементов текущего вопроса в переменные для избежания постоянного нахождения их по коду\n    this.progressbarElement = null;\n    this.prevButtonElement = null;\n    this.nextButtonElement = null;\n    this.passButtonElement = null;\n    this.questionTitleElement = null;\n    this.optionsElement = null;\n    this.quiz = null;\n    this.currentQuestionIndex = 1;\n    this.userResult = [];\n    this.routeParams = _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__.UrlManager.getQueryParams();\n\n    // Проверка ввода личных данных на странице form\n    _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__.UrlManager.checkUserData(this.routeParams);\n\n    // Отправка XMLHttp запроса на бэкенд при условии получения testId c пред страницы choice.html\n    if (this.routeParams.id) {\n      const xhr = new XMLHttpRequest();\n      xhr.open('GET', 'https://testologia.ru/get-quiz?id=' + this.routeParams.id, false);\n      xhr.send();\n      if (xhr.status === 200 && xhr.responseText) {\n        try {\n          this.quiz = JSON.parse(xhr.responseText); // Присваивание запарсенного ответа с бэкенда в свойство quiz объекта Test\n        } catch (e) {\n          location.href = '#/';\n        }\n        this.startQuiz(); // Инициализация метода startQuiz при условии корректных получении данных с бэкенда\n      } else {\n        location.href = '#/';\n      }\n    } else {\n      location.href = '#/';\n    }\n  }\n  startQuiz() {\n    // Нахождение и присвоение в свойство progressbarElement прогресс-бара у объекта Test,\n    // заголовка вопроса (с бэкенда) в свойство questionTitleElement и вариантов ответов (с бэкенда)\n    // в свойство optionsElement\n    this.progressbarElement = document.getElementById('test-progress');\n    this.questionTitleElement = document.getElementById('test-question-title');\n    this.optionsElement = document.getElementById('test-question-options');\n\n    // Нахождение и присвоение в свойство nextButtonElement кнопки Далее у объекта Test\n    this.nextButtonElement = document.getElementById('next-answer');\n    this.nextButtonElement.onclick = this.move.bind(this, 'next');\n\n    // Нахождение и присвоение в свойство passButtonElement кнопки Пропустить вопрос у объекта Test\n    this.passButtonElement = document.getElementById('pass-answer');\n    this.passButtonElement.onclick = this.move.bind(this, 'pass');\n\n    // Нахождение и присвоение в свойство prevButtonElement кнопки Назад у объекта Test\n    this.prevButtonElement = document.getElementById('prev-answer');\n    this.prevButtonElement.onclick = this.move.bind(this, 'prev');\n\n    // Присвоение названия проходимого теста в самом верху серыми буквами\n    document.getElementById('test-pre-title').innerText = this.quiz.name;\n\n    // Генерация прогресс-бара и показ вопросов (с сервера)\n    this.prepareProgressBar();\n    this.showQuestion();\n\n    // Таймер теста\n    const timerElement = document.getElementById('test-timer-clock');\n    let seconds = 60;\n    const interval = setInterval(function () {\n      seconds--;\n      timerElement.innerText = seconds;\n      if (seconds === 0) {\n        clearInterval(interval);\n        this.complete();\n      }\n    }.bind(this), 1000);\n  }\n  prepareProgressBar() {\n    for (let i = 0; i < this.quiz.questions.length; i++) {\n      // Генерация кружков и номеров вопросов прогресс-бара\n      const itemElement = document.createElement('div');\n      itemElement.className = 'test-progress-item ' + (i === 0 ? 'question-active' : '');\n      const itemCircleElement = document.createElement('div');\n      itemCircleElement.className = 'test-progress-item-circle';\n      const itemTextElement = document.createElement('div');\n      itemTextElement.className = 'test-progress-item-text';\n      itemTextElement.innerText = 'Вопрос ' + (i + 1);\n      itemElement.appendChild(itemCircleElement);\n      itemElement.appendChild(itemTextElement);\n      this.progressbarElement.appendChild(itemElement);\n    }\n  }\n  showQuestion() {\n    // Определение индекса текущего вопроса и назначение это в переменную\n    const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];\n    // Вписание текста вопроса с бэкенда в элемент заголовка\n    this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex + ':</span> ' + activeQuestion.question;\n\n    // Очищение блока с вариантами ответов\n    this.optionsElement.innerHTML = '';\n    const that = this;\n    const chosenOption = this.userResult.find(item => item.questionId === activeQuestion.id);\n\n    // Вёрстка родблока, радио-инпута и лейбла для каждого варианта ответа\n    activeQuestion.answers.forEach(answer => {\n      const optionElement = document.createElement('div');\n      optionElement.className = 'test-question-option';\n\n      // Добавляем id ответа в переменную во избежание ошибок, т.к. это значение используется не раз далее\n      const inputId = 'answer-' + answer.id;\n      const inputElement = document.createElement('input');\n      inputElement.className = 'option-answer'; // Назначение этого класса для корректного поиска кликнутых радио-инпутов\n      inputElement.setAttribute('id', inputId);\n      inputElement.setAttribute('type', 'radio');\n      // Задаём один и тот же name для радио-инпутов ответов, т.к. на странице всегда один вопрос\n      inputElement.setAttribute('name', 'answer');\n      inputElement.setAttribute('value', answer.id);\n\n      // Отображаем возможно выбранный ранее радио-инпут ответа\n      if (chosenOption && chosenOption.chosenAnswerId === answer.id) {\n        inputElement.setAttribute('checked', 'checked');\n      }\n\n      // Раздизейбл кнопки Далее при выборе радио-инпута\n      inputElement.onchange = function () {\n        that.chooseAnswer();\n      };\n      const labelElement = document.createElement('label');\n      labelElement.setAttribute('for', inputId);\n      labelElement.innerText = answer.answer;\n\n      // Вкладываем радио-инпут и лейбл в общий род блок optionElement, а его уже в optionsElement\n      optionElement.appendChild(inputElement);\n      optionElement.appendChild(labelElement);\n      this.optionsElement.appendChild(optionElement);\n    });\n\n    // Раздизейбл кнопки Далее при возвращении к предыдущим вопросам с выбранным радио-инпутом ответа\n    if (chosenOption && chosenOption.chosenAnswerId) {\n      this.nextButtonElement.removeAttribute('disabled');\n    } else {\n      this.nextButtonElement.setAttribute('disabled', 'disabled');\n    }\n\n    // Присвоение текста \"Завершить\" для кнопки Далее, если вопрос последний\n    if (this.currentQuestionIndex === this.quiz.questions.length) {\n      this.nextButtonElement.innerText = 'Завершить';\n    } else {\n      // Возвращаем текст кнопки на \"Далее\" при переходе с последней страницы на предыдущие\n      this.nextButtonElement.innerText = 'Далее';\n    }\n\n    // Проверка, если текущий вопрос не 1, то кнопка Назад раздизейблится\n    if (this.currentQuestionIndex > 1) {\n      this.prevButtonElement.removeAttribute('disabled');\n    } else {\n      this.prevButtonElement.setAttribute('disabled', 'disabled');\n    }\n  }\n  chooseAnswer() {\n    this.nextButtonElement.removeAttribute('disabled');\n  }\n  move(action) {\n    const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];\n    // Нахождение выбранного радио-инпута с ответом\n    const chosenAnswer = Array.from(document.getElementsByClassName('option-answer')).find(element => {\n      return element.checked;\n    });\n    let chosenAnswerId = null;\n    // Проверка, что выбранный ответ есть и есть в нём значение\n    if (chosenAnswer && chosenAnswer.value) {\n      chosenAnswerId = Number(chosenAnswer.value);\n    }\n\n    // Проверка, есть ли для данного вопроса уже выбранный ответ при возможных переходах \"Пропустить вопрос\"\n    const existingResult = this.userResult.find(item => {\n      return item.questionId === activeQuestion.id;\n    });\n    if (existingResult) {\n      existingResult.chosenAnswerId = chosenAnswerId;\n    } else {\n      this.userResult.push({\n        questionId: activeQuestion.id,\n        chosenAnswerId: chosenAnswerId\n      });\n    }\n\n    // Переход по вопросам вперёд и назад исходя из приходящего значения строки action\n    if (action === 'next' || action === 'pass') {\n      this.currentQuestionIndex++;\n    } else {\n      this.currentQuestionIndex--;\n    }\n\n    // Завершение выполнения кода ниже при достижении последнего вопроса\n    if (this.currentQuestionIndex > this.quiz.questions.length) {\n      this.complete();\n      return;\n    }\n\n    // Верное отображение прогресс-бара при переходе по вопросам\n    Array.from(this.progressbarElement.children).forEach((item, index) => {\n      const currentItemIndex = index + 1;\n      item.classList.remove('question-complete');\n      item.classList.remove('question-active');\n      if (currentItemIndex === this.currentQuestionIndex) {\n        item.classList.add('question-active');\n      } else if (currentItemIndex < this.currentQuestionIndex) {\n        item.classList.add('question-complete');\n      }\n    });\n    this.showQuestion();\n  }\n  complete() {\n    const xhr = new XMLHttpRequest();\n    xhr.open('POST', 'https://testologia.ru/pass-quiz?id=' + this.routeParams.id, false);\n\n    // Отправляем данные в формате JSON\n    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');\n    xhr.send(JSON.stringify({\n      name: this.routeParams.name,\n      lastName: this.routeParams.lastName,\n      email: this.routeParams.email,\n      results: this.userResult\n    }));\n    if (xhr.status === 200 && xhr.responseText) {\n      let result = null;\n      try {\n        result = JSON.parse(xhr.responseText);\n      } catch (e) {\n        location.href = '#/';\n      }\n      if (result) {\n        location.href = '#/result?score=' + result.score + '&total=' + result.total;\n      }\n    } else {\n      location.href = '#/';\n    }\n  }\n}\n\n//# sourceURL=webpack://practice9-8/./src/components/test.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: () => (/* binding */ Router)\n/* harmony export */ });\n/* harmony import */ var _components_form_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/form.js */ \"./src/components/form.js\");\n/* harmony import */ var _components_choice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/choice.js */ \"./src/components/choice.js\");\n/* harmony import */ var _components_test_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/test.js */ \"./src/components/test.js\");\n/* harmony import */ var _components_result_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/result.js */ \"./src/components/result.js\");\n\n\n\n\nclass Router {\n  constructor() {\n    this.routes = [{\n      route: '#/',\n      title: 'Главная',\n      template: 'templates/#/',\n      styles: 'styles/index.css',\n      load: () => {}\n    }, {\n      route: '#/form',\n      title: 'Регистрация',\n      template: 'templates/form.html',\n      styles: 'styles/form.css',\n      load: () => {\n        new _components_form_js__WEBPACK_IMPORTED_MODULE_0__.Form();\n      }\n    }, {\n      route: '#/choice',\n      title: 'Выбор теста',\n      template: 'templates/choice.html',\n      styles: 'styles/choice.css',\n      load: () => {\n        new _components_choice_js__WEBPACK_IMPORTED_MODULE_1__.Choice();\n      }\n    }, {\n      route: '#/test',\n      title: 'Прохождение теста',\n      template: 'templates/test.html',\n      styles: 'styles/test.css',\n      load: () => {\n        new _components_test_js__WEBPACK_IMPORTED_MODULE_2__.Test();\n      }\n    }, {\n      route: '#/result',\n      title: 'Результаты теста',\n      template: 'templates/result.html',\n      styles: 'styles/result.css',\n      load: () => {\n        new _components_result_js__WEBPACK_IMPORTED_MODULE_3__.Result();\n      }\n    }];\n  }\n  async openRoute() {\n    const newRoute = this.routes.find(item => {\n      return item.route === window.location.hash.split('?')[0];\n    });\n    if (!newRoute) {\n      window.location.href = '#/';\n      return;\n    }\n\n    // Задание html элементов конкретной страницы\n    document.getElementById('content').innerHTML = await fetch(newRoute.template).then(response => response.text());\n\n    // Задание css стилей конкретной страницы\n    document.getElementById('styles').setAttribute('href', newRoute.styles);\n\n    // Задание заголовка страницы в ссылке браузера\n    document.getElementById('page-title').innerText = newRoute.title;\n\n    // Запуск функции load со скриптами для конкретной страницы\n    newRoute.load();\n  }\n}\n\n//# sourceURL=webpack://practice9-8/./src/router.js?");

/***/ }),

/***/ "./src/utils/url-manager.js":
/*!**********************************!*\
  !*** ./src/utils/url-manager.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UrlManager: () => (/* binding */ UrlManager)\n/* harmony export */ });\nclass UrlManager {\n  // Обработка параметров url-строки регуляркой\n  static getQueryParams() {\n    const qs = document.location.hash.split('+').join(' ');\n    let params = {},\n      tokens,\n      re = /[?&]([^=]+)=([^&]*)/g;\n    while (tokens = re.exec(qs)) {\n      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);\n    }\n    return params;\n  }\n\n  // Парсинг свойств name, lastName и email в адресной строке, иначе переадресация на #/\n  static checkUserData(params) {\n    if (!params.name || !params.lastName || !params.email) {\n      location.href = '#/';\n    }\n  }\n}\n\n//# sourceURL=webpack://practice9-8/./src/utils/url-manager.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;