const nacl = require('tweetnacl');
import { Context, APIGatewayEvent } from 'aws-lambda';
import { checkInstanceStatus, checkIp, runServer, startInstance, stopInstance } from './ec2Action';

// reference
// https://betterprogramming.pub/build-a-discord-bot-with-aws-lambda-api-gateway-cc1cff750292
// https://medium.com/@mattquiba/great-article-841450475303

export const handler = async (event: APIGatewayEvent, context: Context) => {
  // Checking signature (requirement 1.)
  // Your public key can be found on your application in the Developer Portal
  console.log('event', JSON.stringify(event,null,2))
  console.log('context', JSON.stringify(context,null,2))
  const PUBLIC_KEY = process.env.PUBLIC_KEY;
  const signature = event.headers['x-signature-ed25519']
  const timestamp = event.headers['x-signature-timestamp'];
  const strBody = event.body? event.body:''; // should be string, for successful sign
  const body = JSON.parse(strBody)

  let isVerified
  if (signature && timestamp && PUBLIC_KEY){
    isVerified = nacl.sign.detached.verify(
      Buffer.from(timestamp + strBody),
      Buffer.from(signature, 'hex'),
      Buffer.from(PUBLIC_KEY, 'hex')
    );
  }else {
    return {
      statusCode: 404,
      body: JSON.stringify('missing request signature/timestamp/PUBLIC_KEY')
    }
  }
  console.log('isVerified',isVerified)

  if (!isVerified) {
    return {
      statusCode: 401,
      body: JSON.stringify('invalid request signature'),
    };
  }

  // Handle /start-server Command
  if (body.data.name == 'start-instance') {
    console.log('body is start-instance')
    console.log('starting instance')
    const message = await startInstance()
    const result = {
      "type": 4,
      "data":{
        "content": `${message}`
      }
    }
    return JSON.stringify(result)
  }

    // Handle /run-palserver Command
    if (body.data.name == 'run-palserver') {
      console.log('body is run-palserver')
      const status = await checkInstanceStatus()
      let result
      // only start server if instance is running
      if(status==='running'){
        console.log("checking public IP");
        const publicIp = await checkIp()
        await runServer()
        result = {
          "type": 4,
          "data":{
            "content": ` Server is running on ip: ${publicIp}:8211`
          }
        }
      }else{
        return result = {
          "type": 4,
          "data":{
            "content": ` Server is not in running state`
          }
        }
      }
      return JSON.stringify(result)
    }

  // Handle /check-server-status Command
  if (body.data.name == 'check-instance-status') {
    console.log('body is check-server-status')
    console.log('checking instance state')
    const status = await checkInstanceStatus()
    const result = {
      "type": 4,
      "data":{
        "content": `server status: ${status}`
      }
    }
    return JSON.stringify(result)
  }

  // Handle /stop-server Command
  if (body.data.name == 'stop-instance') {
    console.log('body is stop-server')
    const message = await stopInstance()
    const result = {
      "type": 4,
      "data":{
        "content": `${message}`
      }
    }
    return JSON.stringify(result)
  }

  // END OF FILE
  return {
    statusCode: 404, // If no handler implemented for Discord's request
    body: JSON.stringify('Not Found'),
  };
};