#!/bin/bash

scp -i "~/Documents/mason.pem" "./Capp/index.js" ec2-user@ec2-54-180-136-194.ap-northeast-2.compute.amazonaws.com:~/monitoring_app/Capp
scp -i "~/Documents/mason.pem" "./Capp/package.json" ec2-user@ec2-54-180-136-194.ap-northeast-2.compute.amazonaws.com:~/monitoring_app/Capp
scp -i "~/Documents/mason.pem" "./Capp/.env.json" ec2-user@ec2-54-180-136-194.ap-northeast-2.compute.amazonaws.com:~/monitoring_app/Capp
scp -i "~/Documents/mason.pem" "./Capp/.env" ec2-user@ec2-54-180-136-194.ap-northeast-2.compute.amazonaws.com:~/monitoring_app/Capp

scp -i "~/Documents/mason.pem" "./Bapp/watchFile.js" ec2-user@ec2-54-180-136-194.ap-northeast-2.compute.amazonaws.com:~/monitoring_app/Bapp
scp -i "~/Documents/mason.pem" "./Bapp/package.json" ec2-user@ec2-54-180-136-194.ap-northeast-2.compute.amazonaws.com:~/monitoring_app/Bapp
scp -i "~/Documents/mason.pem" "./Bapp/.env" ec2-user@ec2-54-180-136-194.ap-northeast-2.compute.amazonaws.com:~/monitoring_app/Bapp