const express = require('express');
const {google} = require('googleapis');
const app = express();
// req.body가 undefined로 출력되는 것을 막기위한것.
app.use(express.json())
require('dotenv').config()
require("dotenv-json")();
let today = new Date();   
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜

// 오늘날짜 로그 읽기, 날짜별 쿼리 기능 추가 예정
app.get("/log", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: ".env.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })
    
    // Auth를 위한 client 생성
    const client = await auth.getClient();

    const spreadsheetId = process.env.SPREAD_SHEET_ID;
    // GoogleSheets API 인스턴스
    const googleSheets = google.sheets({version: "v4", auth: client});
    
    // Get metadata about spreadsheet
    const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    // Row 읽기
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: `${year}${month}${date}`,
    });

    res.send(getRows.data);
})

app.post("/log", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: ".env.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })
    
    // Auth를 위한 client 생성
    const client = await auth.getClient();

    const spreadsheetId = process.env.SPREAD_SHEET_ID;
    // GoogleSheets API 인스턴스
    const googleSheets = google.sheets({version: "v4", auth: client});
    
    // Get metadata about spreadsheet
    const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    // Row 쓰기
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: `${year}${month}${date}`,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [req.body.client, req.body.method, req.body.status, req.body.url, req.body.referer, req.body.sessionId, req.body.email, req.body.responseTime]
            ]
        }
    })
    
    
    console.log("posted");
    console.log(req.body);
    res.send(req.body);
})

app.get ("health", (req, res) => {
    res.send("this app is healthy!")
})
app.listen(1337, (req, res) => console.log("app is running on 1337"));