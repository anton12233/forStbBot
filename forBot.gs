//Функция обработки входящих команд
function doPost(e) 
{
  var update = JSON.parse(e.postData.contents);
  var DOC = SpreadsheetApp.openById("1f8L_4mzNSFiH7dQF4OH8jIJbF-wbvh33Lgwt31jBrVY");
  if (update.hasOwnProperty('message')) 
  {
    var msg = update.message;
    var chat_id = msg.chat.id;
    var text = msg.text;
    var msg_array = msg.text.split(" ");
    var date = (msg.date/86400)+25569.125;
    var user = msg.from.id;
    //Обработка команд
    if ((chat_id != -1.001254244125E12) || (user == 3.36726766E8))      
    {
        switch (msg_array[0])
        {
            case '/quest':
                send(getSomethingFromQuest(msg_array[1]), chat_id)
                break;
            case '/list':
                send("Физика\nИностранный_язык\nФилософия\nМатематика\nТЦП\nОП(Ф)\nОП(П)\nАСД(Ф)\nАСД(П)\nВПД\nОРПО\nПрочее",chat_id)
                break;
            case '/github':
                send("https://github.com/anton12233/forStbBot/",chat_id)
                break;
            case '/help':
                send ('/quest <Название предмета> - Получить список актуальных мероприятий(если указывать без предмета, то будет только ближайшее событие)(что-бы вывести все события нужно написать вместо названия предмета слово "Всё")\n/list - Получить список предметов\n/github - репозиторий с кодом бота и скриптами таблицы',chat_id)
                break;
            case '/entry':
                entryOnLesson(chat_id)
                break;
            case '/teacher':
                getSomethingFromContact(msg_array[1], chat_id)
                break;
        }
    }
    else
        {
            sendImg('https://imageshost.ru/images/2020/09/08/01.png',chat_id)
        }
  }
}
//Будущая функция для записи на сдачу предмета
function entryOnLesson(chat_id)
{
    sendImg('https://cs5.pikabu.ru/post_img/big/2015/11/26/11/1448564914_1773679175.PNG',chat_id ,'Когда-нибудь я сделаю этот раздел')
}

//Будущая функция для поиски контактной информации по названию предмета
function getSomethingFromContact(lesson, chat_id)
{
    sendImg('https://cs5.pikabu.ru/post_img/big/2015/11/26/11/1448564914_1773679175.PNG',chat_id ,'Когда-нибудь я сделаю этот раздел')
}
//Функция для вывода будущих ивентов
function getSomethingFromQuest(str)
{
  var DOC = SpreadsheetApp.openById("1f8L_4mzNSFiH7dQF4OH8jIJbF-wbvh33Lgwt31jBrVY");
  var sheetLocal = tableID.getSheetByName('Квесты');
  var positionYStart = 3, positionXStart = 4 
  var check = 0
  var iventData = '', what, where, when, link;
  var dateOpt = 
  { //Форма для вывода даты
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
  }
  //str = 'Физика'
  while((sheetLocal.getRange(positionYStart,positionXStart).getValues() != '') || (str == undefined && check == 1))
  {         //Выборка по предмету среди будущих событий (в случа отсутствия названия предмета цикл выполняется один раз и выводит только ближайшее событие)
      if (((sheetLocal.getRange(positionYStart,positionXStart).getValues() == str)||(str == undefined)||(str=='Всё')) && String(sheetLocal.getRange(positionYStart,positionXStart-3).getValues()) == 'false')
      { //Сбор информации со строки   
        what = 'Что: ' + String(sheetLocal.getRange(positionYStart,positionXStart+1).getValues())
        where = '\nГде: ' + String(sheetLocal.getRange(positionYStart,positionXStart+2).getValues())
        when = '\nКогда: ' + sheetLocal.getRange(positionYStart,positionXStart-2).getValues().toLocaleString("ru", dateOpt)
        //Проверка на присутствие ссылки в формуле в таблице
        if ((sheetLocal.getRange(positionYStart,positionXStart+2).getFormula())[1] != null)
            {//И формирование ссылки по стандарту Markdown для отправки в telegram
            link = '\nCсылка: '+'[Тут]('+ /"(.*?)"/.exec(sheetLocal.getRange(positionYStart,positionXStart+2).getFormula())[1]+')'
            }
        else 
            {
            link = ''
            }
         //Формирование текста со всеми данными
         iventData = what + where + when + link + '\n----------\n' + iventData
         
         //Счётчик для того что бы вывести только ближайщее событие. Он используеться что бы выбрать только актуальное событие 
         check ++ 
      }
      
      positionYStart++;
  }
  Logger.log(iventData)
  if (check == 0)
  {//Cообщение о том что ничего нет
      iventData = 'Ничего не нашел'
  }
  iventData = '\n----------\n'+ iventData
  return iventData
}


//Функция отправки текстового письма
function send (msg, chat_id)
{
  var payload =
  {
    'method': 'sendMessage',
    'chat_id': String(chat_id),
    'text': msg,
    'disable_notification': true,
    'parse_mode': 'Markdown'
  }
  var data =
  {
    "method": "post",
    "payload": payload
  }
  UrlFetchApp.fetch('https://api.telegram.org/bot' + getToken() + '/', data);
}
//Функция отправки изображения
function sendImg (imgStr, chat_id, caption)
{
  var payload =
  {
    'method': 'sendPhoto',
    'chat_id': String(chat_id),
    'photo': imgStr,
    'caption': caption,
    'disable_notification': true
  }
  var data =
  {
    "method": "post",
    "payload": payload
  }
  UrlFetchApp.fetch('https://api.telegram.org/bot' + getToken() + '/', data);
}