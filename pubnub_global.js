/**
 * Written for UTSC New Media in Theory
 * Parts of this code is adapted from Nick Puckett & Kate Hartman's Creation & Computation PubNub Code
 * 
 * This file sets up the publish and subscribe events for the all of the pubnub pages on this website.  
*/

let dataServer;
let pubKey = "pub-c-51bf5645-7c92-4231-bf1d-a80fc287115a";
let subKey = "sub-c-36a2a088-a35c-48a4-982b-a12412fa987f";
let secretKey = "sec-c-MTUyNjIyOTMtNzlhYi00Y2Y2LWJlMWEtMDM5NzY2NDc1ODMy";

let occupancy = 0;

function createServer(user) {

  dataServer = new PubNub({
    subscribeKey: subKey,
    publishKey: pubKey,
    uuid: user,
    secretKey: secretKey,
    heartbeatInterval: 0,
  });

}

