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
(Reference: thomas2013(https://forum.gamer.com.tw/C.php?bsn=71458&snA=881)
- Search EC2 in AWS console
 ![pal1](https://github.com/hychanbn1009/ec2-palworld-server-discord-bot-controller/assets/51984388/3b1f2239-f568-4d45-b8f8-ee99be6f0115)

- Launch an EC2 instance with Amazon Linux (AMI: Amazon Linux 2 AMI)
 ![image](https://github.com/hychanbn1009/ec2-palworld-server-discord-bot-controller/assets/51984388/a81d90bb-39d5-4800-b85d-d609c0e0568d)

- Architecture: 64-bit (x86) 
 Instance type: depends on your budget and user. [On-Demand Pricing Reference](https://aws.amazon.com/ec2/pricing/on-demand/)
- create a new key pair / use your own key pair
 ![image](https://github.com/hychanbn1009/ec2-palworld-server-discord-bot-controller/assets/51984388/8f1e119b-f5fb-4445-9dc6-761b20975576)

- setup security group rules (ssh in port 22 for your IP & Customer UDP in port 8211 for 0.0.0.0/0)
 ![image](https://github.com/hychanbn1009/ec2-palworld-server-discord-bot-controller/assets/51984388/0fee14c7-521e-40fb-8c40-ee65c0019530)

- Storage: 20GiB for gp3
 ![image](https://github.com/hychanbn1009/ec2-palworld-server-discord-bot-controller/assets/51984388/d9be9413-7cb3-4892-929f-274fb3a53566)

- Launch Instance
 ![image](https://github.com/hychanbn1009/ec2-palworld-server-discord-bot-controller/assets/51984388/28ea793f-c38f-422d-81be-89c64959adaf)

- SSH to the instance by using the public IPv4 address in EC2 console in AWS
![palpost2](https://github.com/user-attachments/assets/6aabdc13-a3a1-427b-9f15-ba2a0c4a1ca5)

Using Window power shell and input command `ssh -i <your key path> ec2-user@<public IPv4 address>`
![palpost1](https://github.com/user-attachments/assets/e02c19fc-4969-4a49-a6fd-7c653ca85c62)

- Install Steam CMD and Palworld using command
  1. Install SteamCMD

  ```
  sudo yum install glibc.i686 libstdc++.i686
  sudo -iu ec2-user
  mkdir ~/Steam && cd ~/Steam
  curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf -
  cd ~/Steam
  ./steamcmd.sh
  ```
  
  2. Install Palworld

  ```
  login anonymous
  app_update 2394010 validate
  exit
  ```

  3. Install Firewall for EC2
  ```
  sudo yum install firewalld
  sudo service firewalld start
  sudo firewall-cmd --zone=public --add-port=8211/udp --permanent
  sudo firewall-cmd --reload
  ```

- Install SSM Agent on EC2 instances for command control
  
`sudo yum install -y https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/linux_amd64/amazon-ssm-agent.rpm`
  
- Setup IAM roles to EC2
  1. Create a IAM roles for EC2 to use SSM Agent
  ![palpost3](https://github.com/user-attachments/assets/002d098e-19e1-4d13-b04c-0b4d0a8ae113)
  ![palpost6](https://github.com/user-attachments/assets/8ef4b9aa-18fe-485c-9814-56b26c82618e)
  2. Modify IAM role to allow EC2 use the IAM role
  ![palpost4](https://github.com/user-attachments/assets/d8b03f30-2e1f-4185-a10c-cf11a3cf4a59)
  ![palpost5](https://github.com/user-attachments/assets/89396075-415c-4b8e-8fd8-d1b780e8ad64)

- Finish Set up games and EC2

## Discord Bot Setup
Preparing

## Usage
```git clone https://github.com/hychanbn1009/ec2-palworld-server-discord-bot-controller.git```

## Reference
Preparing
