import { DescribeInstanceStatusCommand, DescribeInstancesCommand, EC2Client, StartInstancesCommand, StopInstancesCommand } from "@aws-sdk/client-ec2";
import { SSMClient, SendCommandCommand } from "@aws-sdk/client-ssm";


const ec2Client = new EC2Client({region: process.env.REGION});
const ssmClient = new SSMClient({region: process.env.REGION});

const instanceCommand = { 
    InstanceIds: [process.env.INSTANCE_ID]! as string[], // InstanceIdStringList // required
  };
export const sleep = ((ms:number)=>{return new Promise((resolve)=>setTimeout(resolve,ms))})
  

export const startInstance = async()=>{
    const stopCommand = new StartInstancesCommand(instanceCommand)
    const { StartingInstances } = await ec2Client.send(stopCommand);
    const instanceIdList = StartingInstances?.map(
      (instance) => ` ${instance.InstanceId}`
    );
    return `Started instances: ${instanceIdList} \n`
}

export const stopInstance = async()=>{
    const stopCommand = new StopInstancesCommand(instanceCommand)
    const { StoppingInstances } = await ec2Client.send(stopCommand);
    const instanceIdList = StoppingInstances?.map(
      (instance) => ` ${instance.InstanceId}`
    );
    return `Stopping instances: ${instanceIdList} \n`
}

export const runServer = async()=>{
    const runServerCommand = new SendCommandCommand({
        DocumentName: "AWS-RunShellScript",
        /* required */
        InstanceIds: [process.env.INSTANCE_ID]! as string[],
        Parameters: {
          "commands": [`runuser -l ${process.env.USER_NAME} -c "cd /home/ec2-user/Steam/steamapps/common/PalServer && ls && ./PalServer.sh"`]
        },
        CloudWatchOutputConfig: {
          CloudWatchLogGroupName: "SSMLogs",
          CloudWatchOutputEnabled: true
        },
        TimeoutSeconds: 3600
        // 1 hour
      });
      await ssmClient.send(runServerCommand);
}

export const checkIp = async() => {
    const checkIpCommand = new DescribeInstancesCommand(instanceCommand);
    let publicIp
    for( let i=0;i<10;i++){
        const checkIpResponse = await ec2Client.send(checkIpCommand)
        sleep(4000) // sleep 4 second for waiting response
        console.log(checkIpResponse.Reservations![0].Instances![0])
        if(checkIpResponse.Reservations![0]){
            publicIp = checkIpResponse.Reservations![0].Instances![0].PublicIpAddress;
            break
        }
    }
    return publicIp
}

export const checkInstanceStatus = async()=>{
    const describeInstanceCommand = new DescribeInstanceStatusCommand(instanceCommand);
    let status:string|undefined = 'stopped'
    for( let i=0;i<10;i++){
        const {InstanceStatuses} = await ec2Client.send(describeInstanceCommand)
        sleep(4000) // sleep 4 second for waiting response
        console.log(InstanceStatuses)
        if(InstanceStatuses && InstanceStatuses.length>0){
            const InstanceStatus = InstanceStatuses[0].InstanceState?.Name
            if(InstanceStatus ==='running'){
                status = 'running'
                break
            }
        }
    }
    return status
}
