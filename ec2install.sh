#!/bin/bash

cd ~/monitoring_app/Bapp
npm i
nohup node watchFile.js &
cd ~/monitoring_app/Capp
npm i
nohup node index.js &