## About this repository
このリポジトリはfutamiが作成したGAS(google apps script)を管理しています。

```
test(repo)
| - kpi_manage - kpiをデイリーでslackに投稿してくれる(下記参照)
| - close_issue - githubでcloseしたissueをslackに投稿してくれる
```

## English
### Manage KPI on Slack
![Imgur](https://i.imgur.com/ARkx8Rg.png)

Scripts post kpi you manage on spreadsheet daily on slack

### A place on GAS
When you need link spreadsheet, you must edit scripts from tool on spreadsheet.<br>
![gast](https://i.imgur.com/4tvpUVF.png)<br>

```
1. Move to GAS editor from script editor
2. copy and past kpi.js from this repository
3. full any black to get slack tokes and so on..
4. fix any columns if you need
5. set up completely when you get any trigger
```

## Japanese
### デイリーKPIをslackで確認する
![Imgur](https://i.imgur.com/ARkx8Rg.png)

日々spreadsheetで管理しているKPIをデイリーでSlackに投稿することができるスクリプトです。

### GASを記述する場所
GASとスプレッドシートを連携する場合には、KPIが管理されているSpreadSheetのツールから編集する必要がある。<br>
![gast](https://i.imgur.com/4tvpUVF.png)<br>

```
1. スクリプトエディタからGASのエディタに遷移
2. このリポジトリのkpi.jsをコピペ
3. slackのTokenなどを取得し、空白を埋めていく
4. KPIが管理されている列などを調整する
5. トリガーを設定して利用
```
