// slack関連の定義
var slack = {
  postUrl: 'https://slack.com/api/chat.postMessage', //slackのpostToke
  token: 'slackのTokenをここに入力',//slackのtoken
  channelId: "投稿先を指定。#generalなど", //channelの名前
  userName: "投稿するslack botの名前を指定",
  icon_url: "投稿botのサムネイルを指定",
}

// slack投稿のapiを叩く
var postMessage = function(text) {
  UrlFetchApp.fetch(slack["postUrl"], {
    "method" : "post",
    "payload" : {
      token: slack["token"],
      channel: slack["channelId"],
      username: slack["userName"],
      icon_url: slack["icon_url"],
      text: text
    }
  });
}

// spreadsheetのデータを取得
function postKpiToSlack() {
 var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("取得したい値のあるタブ名を指定(ex.直近1ヶ月の指標)");
 var sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("取得したい値のあるタブ名を指定(ex.デイリーの指標)");

 /*
 直近31日のKPIを取得してSlackにPost
*/
  var lastRow = sheet.getRange("A:A").getValues(); //特定列を指定
  var row_last_num = lastRow.filter(String).length; // 特定列の最終行を取得
  var fix_last_num = row_last_num + 1; //最終行の判定を調整するため
  var cvr = sheet.getRange(fix_last_num,1).getValue().toFixed(5)*100; //%表記に修正
  var beforecvr = sheet.getRange(fix_last_num,1).getValue().toFixed(3)*100;

  // 本日までの着地予想を取得するため、今月のここまでの日数を取得
  var date = new Date();
  var date_cnt = date.getDate();
  var date_cnt_fix = date_cnt - 1; //前日までの日数を取得するため

  /*
  着地予想をお知らせする
  */

  var forecastLastRow = sheet2.getRange("AK:AK").getValues();
  var forecast_last = forecastLastRow.filter(String).length;
  var fix_forecast = forecast_last;
  var latestDailyCvr = sheet2.getRange(fix_forecast,1).getValue();
  var sumCvr = sheet2.getRange(fix_forecast,1).getValue(); //最新の1日を取得
  var forecast = (sumCvr/date_cnt_fix).toFixed(5)*100;


  // Slackへ送る
 postMessage("```" + "\n" + "KPIをお知らせします！" + "\n" + "CVR：" + cvr + "%" + "\n" + "前日比：" + beforecvr + "%" +"\n" + "\n" + "今月の着地予想:" + forecast + "%" + "\n" + "```"
  );
}
