const fs = require('fs')
const request = require('request')
const restana = require('restana')
const service = restana()
const accessLogFile = process.env.ACCESS_LOG_FILE_LOCATION
require('dotenv').config()

//accesslog 파일 감시 및 전송 기능(B 애플리케이션)
fs.watchFile(accessLogFile, (curr, prev) => {
  const rawData = fs.readFileSync(accessLogFile, "utf-8")
  const arrData = rawData.split("\n")
  const data = JSON.parse(arrData[arrData.length-1])

  // JSON 로그 데이터를 전송하는 옵션
  const options = {
    uri: `${process.env.C_APP_ENDPOINT}/log`, 
    method: 'POST',
    body: data,
    json: true,
  }
  
  request.post(options, function(err,httpResponse,body){console.log(httpResponse.body);});
});

service
  .get('/health', (req, res) => res.send('Hello World!'))

service.start(process.env.B_APP_PORT);


// test