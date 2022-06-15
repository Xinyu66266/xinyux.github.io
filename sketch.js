

let dataServer;
let pubKey = "pub-c-51bf5645-7c92-4231-bf1d-a80fc287115a";
let subKey = "sub-c-36a2a088-a35c-48a4-982b-a12412fa987f";
let secretKey = "sec-c-MTUyNjIyOTMtNzlhYi00Y2Y2LWJlMWEtMDM5NzY2NDc1ODMy";

let occupancy = 0; 

let channelName = "presenceTest";

let allowMessage = false;

  
function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: "Xinyu",
      secretKey: secretKey,
      heartbeatInterval: 0,
    });

     // listen for messages coming through the subcription feed on this specific channel. 

    dataServer.subscribe({ channels: [channelName],   withPresence: true });
    dataServer.addListener({ message: readIncoming, presence: whoisconnected });
   
  
  }
  
function draw() {
 
 // make something visible for more people 


 if (occupancy > 10) {
  background(255);
  text("wait for someone to leave", windowWidth/2, windowHeight/2);

  allowMessage = false;

 } else if (occupancy > 1) {

  sendTheMessage();
  allowMessage = true;
  
 } else {
  background(255);
  text("wait for someone else to join", windowWidth/2, windowHeight/2); 
  allowmessage = false;

  }



  //textSize(80);
  //textAlign(center);
  //fill(255,0,255);

 if (occupancy > 0) {

  text("There are " +  occupancy + " people online", windowWidth/2, windowHeight/3);

 } else {

  text("There is no one online", windowWidth/2, windowHeight/3);

 }
}

function mousePressed() {

  sendTheMessage();
}

  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      x: mouseX,
      y: mouseY,
      test: "test"
    },
  });
}

function readIncoming(inMessage) {

  if (allowMessage == true) { // if there is less than 10 people on the page draw circles then show the messages that are sent. 
 
    if (inMessage.channel == channelName) {
        console.log(inMessage);
    }

    noStroke();
    fill(random(0,255), random(0,255), random(0,255));
    ellipse(inMessage.message.x, inMessage.message.y, 50, 50);

  } 
}

function whoisconnected(connectionInfo) {
  console.log(connectionInfo);

  occupancy = connectionInfo.occupancy;

  console.log(occupancy);

}







