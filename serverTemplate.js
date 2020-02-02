const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 9000 })

wss.on('connection', ws => {
        ws.on('message', message => {
                if(message.droneLog){
                
		}
                if(message.droneImage){

                }
                if(message.droneInstructions){

                }

                //ws.clientResponse();
        })

})

