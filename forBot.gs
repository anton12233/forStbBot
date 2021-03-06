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
                send (
                '/quest <Название предмета> - Получить список актуальных мероприятий (Если написать команду без предмета, то будет только ближайшее событие)'+
                  '(что-бы вывести все события нужно написать вместо названия предмета слово "Всё")\n'+
                '/lesson - Получить информацию по рассписанию (Без добавочных команд выдаст расписание на сегодня;' +
                  '\nЕсли после команды дописать "Скоро", то бот выдаст все пары на ближайший день;' +
                  '\nЕсли после команды дописать "Всё", то бот выдаст расписание на всю неделю;' +
                  '\nЕсли после команды дописать "Осталось", то бот выдаст только оставшиеся пары этой недели)'+
                  '(Обновление дат переодических пар будет происходить каждую субботу после пар)\n'+
                '/list - Получить список предметов\n'+
                '/github - репозиторий с кодом бота и скриптами таблицы',chat_id)
                break;
            case '/entry':
                entryOnLesson(chat_id)
                break;
            case '/teacher':
                getSomethingFromContact(msg_array[1], chat_id)
                break;
            case '/lesson':
                send(getSomethingFromLesson(msg_array[1]),chat_id)
                break;
        }
    }
    else
        {
            //send('lalala',chat_id)
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

//Функция для получения информации о ближайших парах
function getSomethingFromLesson(lesson)
{
  var tableID = SpreadsheetApp.openById("1f8L_4mzNSFiH7dQF4OH8jIJbF-wbvh33Lgwt31jBrVY");
  var sheetLocal = tableID.getSheetByName('Пары');
  var positionYStart = 4, positionXStart = 2
  var toDay = new Date(), inTable, nextInTable
  var cheak = 0
  var lessonData = '', what, where, when, link, date = "cfsdfds";
  // Словарь для команд
  const lessonVse = ["всё","все","all"]
  const lessonCkoro = ["скоро","soon"]
  const lessonOstalos = ["remaining","осталось","будет"]
  
  
  var dateOpt = 
  { //Форма для вывода даты
      hour: 'numeric',
      minute: 'numeric'
  }
  
  //Обработчик выбора чётных и нечётных недель
  if (sheetLocal.getRange(1,1).getValues()[0][0] == "Чёт")
  {
      positionXStart = 6
  }

  
  if (lesson != undefined)
  {
      lesson = lesson.toLowerCase()
  }
  Logger.log(lesson)
  while(positionYStart <= 31)
  {
      inTable = new Date(sheetLocal.getRange(positionYStart,positionXStart).getValues()[0][0])
      nextInTable = new Date(sheetLocal.getRange(positionYStart+1,positionXStart).getValues()[0][0])
  
      if (((lesson == undefined) && (inTable.getDate()+'/'+inTable.getMonth() == toDay.getDate()+'/'+toDay.getMonth())) //Обработка отсудствующего сообщения для вывода пар, которые есть сегодня
      || ((lessonVse.includes(lesson)) && (sheetLocal.getRange(positionYStart,positionXStart+1).getValues()[0][0] != ''))  //Обработка команды 'Всё' для вывода всех пар
      || ((lessonCkoro.includes(lesson)) && (inTable > toDay)) //Обработка команды 'Скоро' для вывода всех пар в ближайщей учебный день
      || ((lessonOstalos.includes(lesson)) && (inTable > toDay)) //Обработка команды 'Осталось' для вывода всех оставшися пар этой недели
      )
      {   //Сбор информации с строки в таблице
          
          
          if (sheetLocal.getRange(positionYStart,1).getValues() != '')
          {
              date = 'День недели: ' + sheetLocal.getRange(positionYStart,1).getValues()
          }
          when = '\nВремя: ' + sheetLocal.getRange(positionYStart,positionXStart).getValues().toLocaleString("ru", dateOpt)
          what = '\nПредмет: ' + String(sheetLocal.getRange(positionYStart,positionXStart+1).getValues()[0][0])
          
          if ((sheetLocal.getRange(positionYStart,positionXStart+2).getFormula())[1] != null)
          {//И формирование ссылки по стандарту Markdown для отправки в telegram
              link = '\nCсылка в тимс: '+'[Тык]('+ /"(.*?)"/.exec(sheetLocal.getRange(positionYStart,positionXStart+2).getFormula())[1]+')'
          }
          else 
          {
              link = ''
          }
          lessonData = lessonData + date + when + what + link + '\n----------\n'
          cheak++
          //Дополнительная обработка для команды 'Скоро' что бы вывести только один день
          if ((lesson == 'Скоро')&&(inTable.getDate()+'/'+inTable.getMonth() != nextInTable.getDate()+'/'+nextInTable.getMonth()))
          {
            break
          }   
       }
  positionYStart++
  }
  
  lessonData = '\n----------\n'+ lessonData
  Logger.log(lessonData)
  if(cheak == 0)
  {
      lessonData = 'Сегодня пар нету'
  }
  Logger.log(lessonData)
  return lessonData
}


//Функция для вывода будущих ивентов
function getSomethingFromQuest(str)
{
  var tableID = SpreadsheetApp.openById("1f8L_4mzNSFiH7dQF4OH8jIJbF-wbvh33Lgwt31jBrVY");
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
  
  while((sheetLocal.getRange(positionYStart,positionXStart).getValues() != '') //Выход при остуствии событий
  && (!(str == undefined && check == 1)) //Условие для выхода после вывода ближайшего события
  )
  {
      if (((sheetLocal.getRange(positionYStart,positionXStart).getValues() == str)||(str == undefined)||(str=='Всё'))  //Условия для вывода событий по предмету, ближайшего события или всех событий
      && String(sheetLocal.getRange(positionYStart,positionXStart-3).getValues()) == 'false') //Условия для вывода только будущих событий
      {//Сбор информации с строки в таблице
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
         //Счётчик для того что бы вывести только ближайщее событие. Цикл остановится при получение одной записи из таблицы и отсутвие имени предмета 
         check ++ 
      }
      positionYStart++;
  }
  iventData = '\n----------\n'+ iventData
  
  if (check == 0)
  {//Cообщение о том что ничего не нашел
      iventData = 'Ничего не нашел'
  }
  
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
    'parse_mode': 'Markdown',
    'reply_to_message' : false,
    'disable_web_page_preview' : true
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