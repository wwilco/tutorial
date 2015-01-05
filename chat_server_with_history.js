//chat_server_with_history.js

var WebSocketServer = require("ws").Server
var server = new WebSocketServer({port:3000});
console.log("listening");

var connections = []; //for clients
var history = [];


server.on("connection", function(ws) { //while my server is listening, what is it doing?

  connections.push(ws); //pushing clients into connections array.
  console.log(connections.length + " client(s) are in the room");
  //only the server will get this.
  ws.send(JSON.stringify(history)); //sending all clients the history.

  ws.on("message", function(msg){
   //console.log(msg);

    var parsed = JSON.parse(msg);//whenever the user gets a message we are parsing it because thus is JSON. Also it is a hash. We just parsed our message.
    console.log(parsed);

    //banned words
    var baddies = ["like", "super", "totally", "jelly"];
    var kick = false; //we set this to false first so it jumps down and realizes that no bad word was used.

    baddies.forEach(function(badword){
      if (parsed.msg.indexOf(badword) !== -1) { //if our parsed message has a bad word we set kick to true - else if.
        kick = true;
      }
    })

    if (kick) {//then we kick them out.
      var serverMessage = {name: "server", msg: "Sorry, you used a banned word!"}
      var toSend = [serverMessage];
      var j_serverMessage = JSON.stringify(toSend);
      ws.send(j_serverMessage);
      console.log("Client used a banned word");
      ws.close();
    }
    else { //this is the history part. This happens right away if there is no bad word. That's why we have false set initially.

      history.push(parsed);//the history is a hash that's gonna hold your username, color, and messages. Also this wont hold bad words.
      var out = [parsed]; //we are throwing parsed into an array. parsed we defined as parsing the message.

      connections.forEach(function(elem){
        if (elem !== ws) { //this is limiting it so you do not get your own message. You only see everyone else's.
          elem.send(JSON.stringify(out)); //here we are stringifying any parsed message that came through + sending it out.
        }
      })
    }
  });



  ws.on("close", function(){
    var x = connections.indexOf(ws); //this is making sure to safetly take the client out of the server. To take them out of the array properly.
    connections.splice(x,1); //otherwise we would be sending messages to someone who isn't there and it would break.
    console.log(connections.length + " clients are  still in the room");
  });

});