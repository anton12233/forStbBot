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
              send ('/quest &lt;Название предмета&gt; - Получить список актуальных мероприятий(если указывать без предмета, то будет только ближайшее событие(что-бы вывести все события нужно написать вместо названия предмета слово "Всё"\n(/list - Получить список предметов\n/github - репозиторий с кодом бота и скриптами таблицы',chat_id)
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

function entryOnLesson(chat_id)
{
sendImg('https://cs5.pikabu.ru/post_img/big/2015/11/26/11/1448564914_1773679175.PNG',chat_id ,'Когда-нибудь я сделаю этот раздел')
}


function getSomethingFromContact(lesson, chat_id)
{
sendImg('https://cs5.pikabu.ru/post_img/big/2015/11/26/11/1448564914_1773679175.PNG',chat_id ,'Когда-нибудь я сделаю этот раздел')
}



function getSomethingFromQuest(str)
{
  var DOC = SpreadsheetApp.openById("1f8L_4mzNSFiH7dQF4OH8jIJbF-wbvh33Lgwt31jBrVY");
  var sheetLocal = tableID.getSheetByName('Квесты');
  var positionYStart = 3, positionXStart = 4
  var iventData
  var check = 0
  var checkItem;
  var what, where, when, link;
  var regex = new RegExp(/Intrusion signature\(s\)\:\n\n(.*)/);
  var dateOpt = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  while(sheetLocal.getRange(positionYStart,positionXStart).getValues() != '')
  {
      if (((sheetLocal.getRange(positionYStart,positionXStart).getValues() == str)||(str == undefined)||(str=='Всё')) && String(sheetLocal.getRange(positionYStart,positionXStart-3).getValues()) == 'false')
      {
        what = 'Что: ' + String(sheetLocal.getRange(positionYStart,positionXStart+1).getValues())
        where = '\nГде: ' + String(sheetLocal.getRange(positionYStart,positionXStart+2).getValues())
        when = '\nКогда: ' + sheetLocal.getRange(positionYStart,positionXStart-2).getValues().toLocaleString("ru", dateOpt)

        if ((sheetLocal.getRange(positionYStart,positionXStart+2).getFormula())[1] != null)
            {
            link = '\nCсылка: '+'[Тут]('+ /"(.*?)"/.exec(sheetLocal.getRange(positionYStart,positionXStart+2).getFormula())[1]+')'
            }
        else 
            {
            link = ''
            }

         iventData = what + where + when + link
         
         return iventData
         check++;
      }
      if (str == undefined && check == 1)
        break;
    positionYStart++;
  }
  if (check == 0)
    return 'Ничего не нашел'
}





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