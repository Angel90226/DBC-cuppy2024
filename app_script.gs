const SHEET_ID = '1WYznja9yQmBqhXeJZ58EwiK0iaFSiVPC_MPHjxmTLNU';
const SHEET_NAME_LOGIN = 'user-login';
const SHEET_NAME_RECORD = 'drink-records';

function doPost(e) {
  if (e.parameter.username && e.parameter.shop && e.parameter.drink && e.parameter.sugarIce) {
    // 呼叫處理飲料日記的函式
    return handleDrinkJournal(e.parameter);
  } else if (e.parameter.username) {
    // 呼叫處理登入的函式
    return handleLogin(e.parameter);
  }
  
  // 如果請求不符合任一條件，返回錯誤訊息
  return ContentService.createTextOutput("Invalid request.");
}

// 處理登入請求的函式
function handleLogin(params) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('LoginSheet'); // 登入資料的工作表
  const formattedDate = Utilities.formatDate(new Date(), "GMT+8", "yyyy-MM-dd HH:mm:ss");
  const username = params.username;


  // 將登入資料新增到登入工作表
  sheet.appendRow([formattedDate, username]);
  
  return ContentService.createTextOutput("Login data saved successfully!");
}

// 處理飲料日記的函式
function handleDrinkJournal(params) {
  const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getSheetByName('JournalSheet'); // 飲料日記的工作表
  const formattedDate = Utilities.formatDate(new Date(), "GMT+8", "yyyy-MM-dd HH:mm:ss");
  const username = params.username;
  const shop = params.shop;
  const drink = params.drink;
  const sugarIce = params.sugarIce;

  // 將飲料日記資料新增到日記工作表
  sheet.appendRow([formattedDate, username, shop, drink, sugarIce]);
  
  return ContentService.createTextOutput("Journal entry saved successfully!");
}
