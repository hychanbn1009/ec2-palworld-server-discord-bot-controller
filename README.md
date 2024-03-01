# EC2-Palworld-server-Discord-bot-controller
This repository using discord bot with slash command to control EC2 Instance to run Palworld through AWS Lambda.

## Project Description
1. User send slash commands to discord bot 
2. Discord bot send POST event to AWS API Gateway
3. API Gateway invoke AWS Lambda
4. Lambda send command to EC2 Instance through System manager client
5. Get Response and reply by Discord Bot
![concept drawio](https://github.com/hychanbn1009/ec2-palworld-server-discord-bot-controller/assets/51984388/116b5d09-2873-48e1-9a6a-8445029a895f)

## Table of Contents
- [EC2-Palworld-server-Discord-bot-controller](#EC2-Palworld-server-Discord-bot-controller)
  - [Project Description](#project-discription)
  - [Table of Contents](#table-of-contents)
  - Requirements
  - AWS Setup
  - Discord Bot Setup
  - Usage
  - Reference

## Requirements
- NodeJS
- Typescript
- ESBuild
- AWS account with permission (For Lambda and EC2 deployment)
- Discord Developer Account (For Discord Bot deployment)

## AWS Setup
### EC2 Setup
- Search EC2 in AWS console
- Launch an EC2 instance with Amazon Linux (AMI: Amazon Linux 2 AMI)
- Architecture: 64-bit (x86) 
- Instance type: depends on your budget and user. [On-Demand Pricing Reference](https://aws.amazon.com/ec2/pricing/on-demand/)
- create a new key pair / use your own key pair 
- setup security group rules (ssh in port 22 for your IP & Customer UDP in port 8211 for 0.0.0.0/0)
- Storage: 20GiB for gp3
- Launch Instance


## Discord Bot Setup
Preparing

## Usage
```git clone https://github.com/hychanbn1009/ec2-palworld-server-discord-bot-controller.git```

## Reference
Preparing
