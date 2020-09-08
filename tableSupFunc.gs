//Основное меню для ручного вызова функций
function menu() 
{
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var menuEntries = [];
    
    menuEntries.push({name: "Закрасить темы", functionName: "topicColorize"});//Добавить функцию
    menuEntries.push(null); // Добавить разделяющую линию
    menuEntries.push({name: "Закрасить даты", functionName: "dateColorize"});
    menuEntries.push(null); 
    menuEntries.push({name: "Закрасить места", functionName: "placeColorize"});
    menuEntries.push(null); 
    menuEntries.push({name: "Отчислить", functionName: "numeratic"});
    ss.addMenu("А я меню с фунциями", menuEntries);
  }

//Создание и определение глобальных переменных цветов для красящих функций  
var tableID = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1f8L_4mzNSFiH7dQF4OH8jIJbF-wbvh33Lgwt31jBrVY/edit#gid=0');
var sheetForColor = tableID.getSheetByName('Главная_страница');
var colorPast = sheetForColor.getRange(2,2).getBackground();
var colorNow = sheetForColor.getRange(3,2).getBackground();
var colorFuture =  sheetForColor.getRange(4,2).getBackground();
var colorNoPlace = sheetForColor.getRange(5,2).getBackground();
var colorFreePlace = sheetForColor.getRange(6,2).getBackground();
var iventColor = sheetForColor.getRange(7,2).getBackground();
var deadColor = sheetForColor.getRange(8,2).getBackground();

//Функция покраски прошлых, нынешней и будущих дат
function dateColorize() {
  var tableID = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1f8L_4mzNSFiH7dQF4OH8jIJbF-wbvh33Lgwt31jBrVY/edit#gid=0');
  var sheetLocal = tableID.getSheetByName('Домашние задания и прочее');
  var dataLocalYXDisBD = [['Список_студентов',4,7,5]]
  var dateInTable;
  var dateNow = new Date().setHours(0,0,0,0);
  var positionYStart = 0, positionXStart = 0, positionDisplacement = 0, i = 0;
  while(dataLocalYXDisBD[i] != undefined)
  {
     sheetLocal = tableID.getSheetByName(dataLocalYXDisBD[i][0]);
     positionYStart = dataLocalYXDisBD[i][1];
     positionXStart = dataLocalYXDisBD[i][2];
     positionDisplacement = dataLocalYXDisBD[i][3];
     while(sheetLocal.getRange(positionYStart,positionXStart).getValues() != '')
     {
       while(sheetLocal.getRange(positionYStart,positionXStart).getValues() != '')
       {
         dateInTable = Date.parse(sheetLocal.getRange(positionYStart,positionXStart).getValues());
         if (dateInTable>dateNow)
         {
           sheetLocal.getRange(positionYStart,positionXStart).setBackground(colorFuture)
         }
           else 
           {
              if (dateInTable<dateNow)
              {
                sheetLocal.getRange(positionYStart,positionXStart).setBackground(colorPast)
              }
                else
                {
                  if (dateInTable==dateNow)
                  {
                    sheetLocal.getRange(positionYStart,positionXStart).setBackground(colorNow)
                  }
                }
           }
          positionYStart = positionYStart + 1;
       }
       positionYStart = dataLocalYXDisBD[i][1];
       positionXStart = positionXStart + positionDisplacement;
     }
  i++;
  }
};

//Функция покраски мест
function placeColorize() {
  var tableID = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1f8L_4mzNSFiH7dQF4OH8jIJbF-wbvh33Lgwt31jBrVY/edit#gid=0');
  var sheetLocal = tableID.getSheetByName('Список_студентов');
  var dataLocalYXDisBD = [['Список_студентов',4,8,5]]
  var positionYStart = 0, positionXStart = 0, positionDisplacement = 0, i = 0;
  
  while(dataLocalYXDisBD[i] != undefined)
  {
    sheetLocal = tableID.getSheetByName(dataLocalYXDisBD[i][0]);
    positionYStart = dataLocalYXDisBD[i][1];
    positionXStart = dataLocalYXDisBD[i][2];
    positionDisplacement = dataLocalYXDisBD[i][3];
    while(sheetLocal.getRange(positionYStart,positionXStart).getValues() != '')
    {
      while(sheetLocal.getRange(positionYStart,positionXStart).getValues() != '')
      {
        if (sheetLocal.getRange(positionYStart,positionXStart).getValues() == 0)
        {
          sheetLocal.getRange(positionYStart,positionXStart).setBackground(colorNoPlace)
        }
          else
          {
            if ((sheetLocal.getRange(positionYStart,positionXStart).getValues() == "Кр")||(sheetLocal.getRange(positionYStart,positionXStart).getValues() == "П")||(sheetLocal.getRange(positionYStart,positionXStart).getValues() == 'Пер')||(sheetLocal.getRange(positionYStart,positionXStart).getValues() == 'Задач'))
            {
              sheetLocal.getRange(positionYStart,positionXStart).setBackground(iventColor)
                if (sheetLocal.getRange(positionYStart,positionXStart).getValues() == "П")
                {
                  sheetLocal.getRange(positionYStart,positionXStart).setBackground(deadColor)
                }
            }
                else
                {
                  sheetLocal.getRange(positionYStart,positionXStart).setBackground(colorFreePlace)
                }
          }
        positionYStart = positionYStart + 1;
      }
      positionXStart = positionXStart + positionDisplacement;
      positionYStart = dataLocalYXDisBD[i][1];
    }
  i++;
  }
};

//Функция присвоение номера в общем списке
function numeratic(){
  var tableID = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1f8L_4mzNSFiH7dQF4OH8jIJbF-wbvh33Lgwt31jBrVY/edit#gid=0');
  var sheetLocal = tableID.getSheetByName('Список_студентов');
  var i = 3, numOf = 1, number = 0;
 
  while(sheetLocal.getRange(i, 1).getValues() != '')
    {number++;
    i++}
    
  var dataNum = sheetLocal.getRange(3, 1,number).getValues()
  var dataNameFont = sheetLocal.getRange(3, 2,number).getFontLines()
  
  for(i=0;i<number;i++){
    if (dataNameFont[i] == "line-through")
      {dataNum[i][0] = "Exp"}
      else
      {dataNum[i][0] = numOf
      numOf++} 
  }
  
  sheetLocal.getRange(3, 1, number).setValues(dataNum) 
}

//Функция покраски занятых тем и подсчёт колличества свободных
function topicColorize() {
  var tableID = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1f8L_4mzNSFiH7dQF4OH8jIJbF-wbvh33Lgwt31jBrVY/edit#gid=0');
  var sheetIn = tableID.getSheetByName('Список_студентов');
  var sheetOut = tableID.getSheetByName('Физика_II_семестр');
  var dataLocalYXInBD = [['Физика_II_семестр',3,5,1,1,'C2']]
  var positionYStart = 0, positionXStart = 0, i = 0, numOfNoThrough = 0, numOfTopic = 0, numOfNoRed = 0;
  
  //Покрас занятые темы
  while (dataLocalYXInBD[i] != undefined)
  {
    while(sheetOut.getRange(numOfTopic+1, 1).getValue() != '')
    {
      numOfTopic++;
    }
    sheetOut.getRange(1, 1, numOfTopic, 1).setBackground(colorFreePlace);
    
    sheetOut = tableID.getSheetByName(dataLocalYXInBD[i][0]);
    positionYStart = dataLocalYXInBD[i][1];
    positionXStart = dataLocalYXInBD[i][2];
    while (sheetIn.getRange(positionYStart, positionXStart-2).getValues() != '')
    {
      if (sheetIn.getRange(positionYStart, positionXStart).getValues() != '')
      {
        if (isNaN(sheetIn.getRange(positionYStart, positionXStart).getValues()) == false)         
        {
          sheetOut.getRange(sheetIn.getRange(positionYStart, positionXStart).getValues(), 1).setBackground(colorNoPlace)
        }
      }
      positionYStart++;
    }
  i++;
  }
  
  i = 0;
  //Подчсёт свободных тем
  while (dataLocalYXInBD[i] != undefined)
  {
    sheetOut = tableID.getSheetByName(dataLocalYXInBD[i][0]);
    positionYStart = dataLocalYXInBD[i][3];
    positionXStart = dataLocalYXInBD[i][4];
    while (sheetOut.getRange(positionYStart, positionXStart).getValues() != '')
      {
      if (sheetOut.getRange(positionYStart, positionXStart).getBackground() != colorNoPlace)
        {
        numOfNoRed++;
        }
       positionYStart++;
      }
  sheetOut.getRange(dataLocalYXInBD[i][5]).setValue(numOfNoRed);
  i++;
  }
};
