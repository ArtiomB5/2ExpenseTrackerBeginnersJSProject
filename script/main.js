let inputBtn = document.querySelector('.inputButton');
inputBtn.addEventListener('click', inputDataCheck);
//получения элемента кнопки и вызов функции при клике на кнопку

var rowsCount = [];
//массив ид строк таблицы

//функция обработки введенных данных, запускается по нажатию кнопки
function inputDataCheck() {
    let nameInputData = document.getElementById('nameInput').value;
    let dateInputData = document.getElementById('dateInput').value;
    let amountInputData = document.getElementById('amountInput').value;
    //получение данных полей названия, даты, суммы

    //условие проверки заполненности полей с обработкой пустых полей
    if (nameInputData !== "" && dateInputData !== "" && amountInputData !== "") {
        addNewRow(nameInputData, dateInputData, amountInputData);
        //запуск функции добавляющей строки таблицы, если все поля заполнены
        clearInputField();
        //вызов функции очищающей поля ввода
    } else if (nameInputData === "" && dateInputData === "" && amountInputData === "") {
        alert('Please input data in the empty fields');
        return 0;
    } else if (nameInputData === "") {
        alert('Please input name');
        return 0;
    } else if (dateInputData === "") {
        alert('Please input date');
        return 0;
    } else if (amountInputData === "") {
        alert('Please input amount');
        return 0;
    };

    //вызов функции определяющих необходимость сообщения пользователю,когда таблица пуста
    userMsgDisplay(rowsCount);
}

//функция добавления строки
function addNewRow(nameInputData, dateInputData, amountInputData) {
    let amountTable = document.getElementById('expenseTable');
    //получение элемента - таблицы

    let newRow = document.createElement('tr');
    //создания элемента - строки таблицы

    let cell1 = String(nameInputData);
    let cell2 = String(dateInputData);
    let cell3 = '$' + amountInputData;
    //присвоение переменным данных: название, дата, стоимость

    let newId = idGenerator();
    //создание id - вызывается функция генерации уникального id

    let cell4 = '<button ' + 'onclick="onClickDelete(' + newId + ')">X</button>';
    //присвоение переменной данных для создания кнопки удаления, с передачей в качестве параметра функции уникального id строки
    
    let newRowInnerHTML = '<td>' + cell1 + '</td><td>' + cell2 + '</td><td>' + cell3 + '</td><td>' + cell4 + '</td>';
    //создание переменной с html разметкой строки

    newRow.id = newId;
    //присвоение id ранее созданной строки таблицы
    rowsCount.push(newId);
    //добавление id строки в массив id строк 
    newRow.innerHTML = newRowInnerHTML;
    //"заполнение" HTML разметкой строки таблицы данными из переменной newRowInnerHTML

    amountTable.append(newRow);
    //добавление элемента newRow в таблицу
}

//функция очистки поля ввода
function clearInputField() {
    document.getElementById('nameInput').value = "";
    document.getElementById('dateInput').value = "";
    document.getElementById('amountInput').value = "";
    //получение данных полей ввода по id и очистка полей ввода
}

//функция генератор уникальных id
function idGenerator() {
    let now = new Date();
    let month = now.getMonth();
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let milliseconds = now.getMilliseconds();
    //получение  текущего месяца, даты, часа, минут, секунд, милисекунд
    let uniqId = '' + month + date + hours + minutes + seconds + milliseconds;
    return uniqId;
}

//функция проверяющая количество строк в таблице и изменяющая переметры отображения сообщения пользователю
function userMsgDisplay(idsArray) {
    if (idsArray.length >= 1) {
        document.getElementById('bottom').style.display = 'none';
    } 
        
    if (idsArray.length == 0) {
        document.getElementById('bottom').style.display  = 'block';
    } 
}

//функция удаления задачи из списка
function onClickDelete(divId) {
    document.getElementById(divId).remove();
    let rowIdIndex = rowsCount.indexOf(String(divId));
    rowsCount.splice(rowIdIndex, 1);
    userMsgDisplay(rowsCount);
    //получение данных строки таблицы по id (передается при нажатии кнопки удаления) и последующее удаление задачи
}