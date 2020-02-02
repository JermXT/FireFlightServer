var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

/*
var dbUrl = 'mongodb://Jeremy:fireflight@localhost:27017/fireflight?authMechanism=SCRAM-SHA-1'
mongoose.connect(dbUrl, (err) => {
   console.log('mongodb connected',err);
})*/

mongoose.connect('mongodb://localhost/fireflight', {useNewUrlParser: true});



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected")
});

/*
var webserver = 7000;
var nanoComms = 9000;

var app = express();
var nano = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })

var web = app.listen(webserver, () => {
 console.log('server is running on port', web.address().port);
});

nano.get('/oi', (req, res) => res.send('Hello World!'))
var droneComms = nano.listen(nanoComms, () => console.log(`Example app listening on port ${nanoComms}!`))
*/

var gpsSchema = new mongoose.Schema({
    name:  String,
    log: [{ time: {year: Number, month: Number, day: Number, hour: Number, minute: Number, second: Number}, x: mongoose.Schema.Types.Decimal128, y: mongoose.Schema.Types.Decimal128 }],
  });
//time may be type date instead

var gpsData = mongoose.model('gpsData',gpsSchema)


/*
var spitfire = new gpsData({"name" : "spitfire1", "log" : [ { "time" : {year:"2019",month:"7",day:"20",hour:"23",minute:"59",second:"59"}, "x" : "37.649313", "y" : "-121.871232" } ]});
spitfire.save(function (err, spitfire) {
    if (err) return console.error(err);
  });
*/

/*
app.get('/gps', (req, res) => {
  gpsData.find({},(err, messages)=> {
    res.send(messages);
  })
})*/
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 9000 })


function sendDroneGps(ws, droneName){
	gpsData.find({name:`${droneName}`},function (err,docs){
                log = docs[0].log;
                console.log(log);
                //ws.send([log[log.length-1].time, log[log.length-1].x, log[log.length-1].y])
               	ws.send({data: "gps",time:log[log.length-1].time, x:parseFloat(log[log.length-1].x), y:parseFloat(log[log.length-1].y))
	});

}

function nanoResponse(ws){

}


droneInstructions = {}

wss.on('connection', ws => { 
	ws.on('message', message => {
		if(message.droneLog){
			sendDroneGps(ws, message.droneLog);
		}
		if(message.droneImage){
		
		}
		if(message.droneInstructions){
		
		}

    		ws.clientResponse();
  	})
  
})


const drones = new WebSocket.Server({ port: 8000 })
drone.on('connection', ws => {
	
	ws.on('message', message => {
   		droneName = message.name	
		if(message.image){
			//Image data
		}
		if(message.gps){
			//Image data
		}
		if(droneInstructions.droneName){
			ws.send(droneInstructions.droneName)
			droneInstructions.droneName = undefined
		}
		ws.send({gps:true})
		
   	}); 

})



