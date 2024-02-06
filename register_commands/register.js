const axios = require('axios')

let url = `https://discord.com/api/v8/applications/${process.env.APP_ID}/commands`

const headers = {
    "Authorization": `Bot ${process.env.TOKEN}`,
    "Content-Type": "application/json"
}

let commands = [
  {
    "name": "start-instance",
    "type": 1,
    "description": "start Palworld Server Instance",
  },
  {
    "name": "run-palserver",
    "type": 1,
    "description": "run Palworld Server",
  },
  {
    "name": "check-instance-status",
    "type": 1,
    "description": "check Palworld Server Instance status",
  },
  {
    "name": "stop-instance",
    "type": 1,
    "description": "stop Palworld Server Instance",
  },
]

commands.map((command)=>{
  axios.post(url, JSON.stringify(command), {
    headers: headers,
  }).then((res)=>{
    console.log(res.status)
  }).catch((err)=>{
    console.log(err)
  })
})
