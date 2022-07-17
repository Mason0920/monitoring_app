const fs = require('fs')
const request = require('request')
const restana = require('restana')
const service = restana()
const accessLogFile = "/var/log/httpd/access_log"
require('dotenv').config()

//accesslog 파일 감시 및 전송 기능(B 애플리케이션)
fs.watchFile(accessLogFile, (curr, prev) => {
  const rawData = fs.readFileSync(accessLogFile, "utf-8")
  const arrData = rawData.split("\n")
  const data = JSON.parse(arrData[arrData.length-2]);
  // JSON 로그 데이터를 전송하는 옵션
  const options = {
    uri: "http://localhost:1337/log", 
    method: 'POST',
    body: data,
    json: true,
  }
  
  request.post(options, function(err,httpResponse,body){console.log(httpResponse.body);});
});

service
  .get('/health', (req, res) => res.send('Bapp is health!'))

service.start(3000);
console.log("Bapp is running on 3000");