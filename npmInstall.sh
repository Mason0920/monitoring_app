#!/bin/bash

scp -i "~/Documents/mason.pem" "./ec2install.sh" ec2-user@ec2-54-180-136-194.ap-northeast-2.compute.amazonaws.com:~/
ssh -i "~/Documents/mason.pem" ec2-user@ec2-54-180-136-194.ap-northeast-2.compute.amazonaws.com sh ec2install.sh