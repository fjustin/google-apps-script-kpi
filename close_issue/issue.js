// slack関連の定義
var slack = {
  postUrl: 'https://slack.com/api/chat.postMessage',
  token: 'slackのtoken',//slackのtoken
  channelId: "投稿するチャンネルの名前", //channelの名前
  userName: "二見のissue管理するマン",
  icon_url: "icon画像のURL",
}

var postMessage = function(text) {
  UrlFetchApp.fetch(slack["postUrl"], {
    "method" : "post",
    "payload" : {
      token: slack["token"],
      channel: slack["channelId"],
      username: slack["userName"],
      icon_url: slack["icon_url"],
      text: text,
    }
  });
}

// spreadsheetのデータを取得
function timesFutami() {
 var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シートのタブ名");

 /*
 今月closeしたissueを投げる
*/
  var lastRow = sheet.getRange("A:A").getValues();
  var row_last_num = lastRow.filter(String).length;
  var b0 = sheet.getRange(row_last_num,2).getValue();
  var b1 = sheet.getRange(row_last_num,3).getValue();
  var b3 = sheet.getRange(row_last_num,4).getValue();
  var b10 = sheet.getRange(row_last_num,5).getValue();


  var date = Utilities.formatDate(new Date(),"JST","yyyy/MM/dd");

  var sum = function(arr) {
    return arr.reduce(function(prev, current, i, arr) {
      return prev + current;
    });
  };


  /*
  ここまでのcloseしたissueを累計でお知らせ
  */

  var b0row = sheet.getRange("B3:B").getValues();
  var strToInt0 = b0row.map(function (element) {
    return Number(element);
  });
  var sumb0 = sum(strToInt0);

  var b1row = sheet.getRange("C3:C").getValues();
  var strToInt1 = b1row.map(function (element) {
    return Number(element);
  });
  var sumb1 = sum(strToInt1);

  var b3row = sheet.getRange("D3:D").getValues();
  var strToInt3 = b3row.map(function (element) {
    return Number(element);
  });
  var sumb3 = sum(strToInt3);

  var b10row = sheet.getRange("E3:E").getValues();
  var strToInt10 = b10row.map(function (element) {
    return Number(element);
  });
  var sumb10 = sum(strToInt10);

  // Slackへ送る
  postMessage(date + "までfutamiがiOS関連でcloseしたissue情報" + "\n" + "```" + "\n" + "今月のB0の個数:" + b0 + "\n" + "今月のB1の個数：" + b1 + "\n" + "今月のB3の個数：" + b3 + "\n" + "今月のB10の個数：" + b10 + "\n" + "```");
  postMessage("```" + "\n" + "closeしたB0累計:" + sumb0 + "\n" + "closeしたB1累計：" + sumb1 + "\n" + "closeしたB3累計：" + sumb3 + "\n" + "closeしたB10累計：" + sumb10 + "\n" + "```");
}
