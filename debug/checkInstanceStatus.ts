import { checkInstanceStatus } from "../src/ec2Action"

const main = async()=>{
    const status = await checkInstanceStatus()
}

main()