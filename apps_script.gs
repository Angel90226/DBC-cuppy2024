const SHEET_ID = '1WYznja9yQmBqhXeJZ58EwiK0iaFSiVPC_MPHjxmTLNU';
const SHEET_NAME_LOGIN = 'user-login';
const SHEET_NAME_RECORD = 'drink-records';

function doPost(e) {
  if (e.parameter.username && e.parameter.shop && e.parameter.address && e.parameter.lat && e.parameter.lng 
  && e.parameter.drink && e.parameter.sugarIce) {
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
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_LOGIN); // 登入資料的工作表
  const formattedDate = Utilities.formatDate(new Date(), "GMT+8", "yyyy-MM-dd HH:mm:ss");
  const username = params.username;


  // 將登入資料新增到登入工作表
  sheet.appendRow([formattedDate, username]);
  
  return ContentService.createTextOutput("Login data saved successfully!");
}

// 處理飲料日記的函式
function handleDrinkJournal(params) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_RECORD); // 飲料日記的工作表
  const formattedDate = Utilities.formatDate(new Date(), "GMT+8", "yyyy-MM-dd HH:mm:ss");

  // 從參數中獲取數據
  const username = params.username || 'Guest'; // 用戶名
  const shop = params.shop || '未知店家'; // 店家名稱
  const address = params.address || '未知地址'; // 店家地址
  const lat = params.lat || '未知'; // 店家緯度
  const lng = params.lng || '未知'; // 店家經度
  const drink = params.drink || '未知飲料'; // 飲料名稱
  const sugarIce = params.sugarIce || '未知甜度冰塊'; // 甜度冰塊

  // 將飲料日記資料新增到日記工作表
  sheet.appendRow([formattedDate, username, shop, address, lat, lng, drink, sugarIce]);
  
  return ContentService.createTextOutput("Journal entry saved successfully!");
}

function doGet(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_RECORD);
  const data = sheet.getDataRange().getValues(); // 獲取整個資料表的所有數據
  const headers = data.shift(); // 將表頭與數據分開
  const records = data.map(row => {
    return {
      date: row[0],
      username: row[1],
      shop: row[2],
      address: row[3],
      lat: row[4],
      lng: row[5],
      drink: row[6],
      sugarIce: row[7]
    };
  });
  return ContentService.createTextOutput(JSON.stringify(records))
    .setMimeType(ContentService.MimeType.JSON);
}
