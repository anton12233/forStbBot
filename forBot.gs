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
    
    switch (msg_array[0])
    {
      case '/quest':
        if (chat_id != -1.001254244125E12)      
        {
          getSomhingFromQuest(msg_array[1],chat_id)
        }
        else
        {
          sendImg('https://imageshost.ru/images/2020/09/08/01.png',chat_id)
        }
        break;
      case '/list':
        if (chat_id != -1.001254244125E12)
        {
          send("Физика\nИностранный_язык\nФилософия\nМатематика\nТЦП\nОП(Ф)\nОП(П)\nАСД(Ф)\nАСД(П)\nВПД\nОРПО\nПрочее",chat_id)
        }
        else
        {
          sendImg('https://imageshost.ru/images/2020/09/08/01.png',chat_id)
        }
        break;
       case '/github':
        if (chat_id != -1.001254244125E12)
        {
          send("https://github.com/anton12233/forStdBot/",chat_id)
        }
        else
        {
          sendImg('https://imageshost.ru/images/2020/09/08/01.png',chat_id)
        }
        break;
      case '/help':
        if (chat_id != -1.001254244125E12)      
        {
          send ('/quest &lt;Название предмета&gt; - Получить список актуальных мероприятий\n/list - Получить список предметов\n/github - репозиторий с кодом бота и скриптами таблицы',chat_id)
        }
        else
        {
          sendImg('https://imageshost.ru/images/2020/09/08/01.png',chat_id)
        }
        break;
        
      case '/entry':
        if (chat_id != -1.001254244125E12)      
        {
          entryOnLesson(chat_id)
        }
        else
        {
          sendImg('https://imageshost.ru/images/2020/09/08/01.png',chat_id)
        }
        break;
        
       case '/teacher':
        if (chat_id != -1.001254244125E12)      
        {
          entryOnLesson(chat_id)
        }
        else
        {
          sendImg('https://imageshost.ru/images/2020/09/08/01.png',chat_id)
        }
        break;
    }
  }
}

function entryOnLesson(chat_id)
{
sendImg('https://cs5.pikabu.ru/post_img/big/2015/11/26/11/1448564914_1773679175.PNG',chat_id ,'Когда-нибудь я сделаю этот раздел')
}


function getSomhingFromQuest(str, chat_id)
{
  var DOC = SpreadsheetApp.openById("1f8L_4mzNSFiH7dQF4OH8jIJbF-wbvh33Lgwt31jBrVY");
  var sheetLocal = tableID.getSheetByName('Квесты');
  var positionYStart = 3, positionXStart = 4
  var iventData
  var check = 0
  var checkItem;
  
  var dateOpt = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  
  while(sheetLocal.getRange(positionYStart,positionXStart).getValues() != '')
  {
      if ((sheetLocal.getRange(positionYStart,positionXStart).getValues() == str)||(str == undefined) && String(sheetLocal.getRange(positionYStart,positionXStart-3).getValues()) == 'false')
      {
         iventData = 'Что: ' + String(sheetLocal.getRange(positionYStart,positionXStart+1).getValues()) +'\nГде: ' + String(sheetLocal.getRange(positionYStart,positionXStart+2).getValues()) + '\nКогда: ' + sheetLocal.getRange(positionYStart,positionXStart-2).getValues().toLocaleString("ru", dateOpt)
         send (iventData, chat_id)
         check++;
      }
    positionYStart++;
  }
  if (check == 0)
    send('Ничего не нашел(', chat_id)
}


function send (msg, chat_id)
{
  var payload =
  {
    'method': 'sendMessage',
    'chat_id': String(chat_id),
    'text': msg,
    'parse_mode': 'HTML'
  }
  var data =
  {
    "method": "post",
    "payload": payload
  }
  var API_TOKEN = '1347046493:AAGXCVAKAUqRirc_vLUVw94ncxiiTI5QPtc'
  UrlFetchApp.fetch('https://api.telegram.org/bot' + API_TOKEN + '/', data);
}


function sendImg (imgStr,chat_id, caption)
{
  var payload =
  {
    'method': 'sendPhoto',
    'chat_id': String(chat_id),
    'photo': imgStr,
    'caption': caption
  }
  var data =
  {
    "method": "post",
    "payload": payload
  }
  var API_TOKEN = '1347046493:AAGXCVAKAUqRirc_vLUVw94ncxiiTI5QPtc'
  UrlFetchApp.fetch('https://api.telegram.org/bot' + getToken() + '/', data);
}