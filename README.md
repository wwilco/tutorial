# What Is This Project?
Together, we will be looking at how to build your very own chat app. In this tutorial, you will be using JavaScript, HTML, and CSS. Together we will be learning about WebSockets, GitHub, and hosting. 


Installation:
=============
* NPM is a package manager for open source coding. What this means is that programmers can share their projects and code with the public via installable packages. For example. WebSockets, which we will be using to build our chat app.
* Using NPM and Node in the terminal, install WebSockets (ws):
    * run `npm init` in order to connect to NPM
    * Type `node npm install ws --save` and it should install.
        * depending on system preferences, may need to use sudo command into terminal.
        * `ws` is the NPM WebSocket package name: `https://www.npmjs.com/package/ws`
        * `-- save` is used to permanently save the package to your computer. Therefore, you will not need to run `npm install` again.

What are WebSockets?
A WebSocket is an open interactive communication between a user's browser and a server.
They allow for a client to send information to a server, that information gets processed by that server then sent out to a new client. Starting to sounds familiar? Maybe like a way to communicate or chat?
 Imagine a love triangle, minus the jealousy!
This is the package that we will be using in order to create our chat app. Think of this as the foundation. 

Client-Server Architecture
==========================
Let’s think about this project before we fully delve in. What is a chat app? On the simplest level it is exactly what we explained above with WebSockets. A means for more than one client to connect to each other through a server. We are going to use the “ws” package we installed to build a program that can contain unlimited clients that connect to a server. We will walk you through step by step on how to write both sides. We will even give you some challenges for how to create special functions within your app. Ready to go?


Client Side
=========== 
Double check to make sure all the right packages are installed before you start any actual coding. Revisit the “Installation” section for more information.

We start by declaring a host which will connect us to the server. 

    var ws = new WebSocket(insert url here)

This will be used for hosting your chat app live. Or:

    var ws = new WebSocket(‘ws://localhost:3000) 

This will allow you to locally host the chat app. Being able to host locally is important in order to test out our app.

Create an event listener which will listen for when the page is open or connected to a server. 

    ws.addEventListener(‘open’, function(evt){
        // Almost all of your code will go in here
    })

Link your html elements to the javascript to utilize further. You can do this by using `document.querySelector`.
What information are you storing about your client? Here we will be using *objects* to store multiple key/value pairs. Lets keep it simple and just transfer a name and text between the users.

    var object = {
        name: name,
        text: yourInputBoxElement.value,
    }

Since you cannot send objects the way they are formatted you must use JSON. JSON(JavaScript Object Notation) is a method of processing data between the server and the client. Because clients can only send data in the form of strings, JSON is able to break code down and represent it in the form of objects with key/value pairs, hashes or arrays.The two main commands for the sending and receiving of data through JSON are:
  
Stringify
---------
JSON.stringify(object), sending data
 this method alters objects from their original format so that they can be transmitted to and received by the server, this is 
 because clients can only send data in the form of strings, this method must be used
 once object has been stringified, it still must be sent to the server, using ws.send. !!!! necessary here?... or go to section on “Sending Information”
Parse
-----
JSON.parse(objectReceived), receiving data
 once data is sent via the stringify method, the server uses the parse method to put the string of data back into its original form, in this instance, an object
 the parse method must be done on the server side
For further clarification on the utilization of JSON please visit here: blah blah

Sending Information
-------------------
 create an event listener that will listen for an action such as clicking a submit button. When this event is triggered you will run a function that will include the “send” method.

    ws.send(userMessage)

 userMessage in this case will be the object that has been stringified. The values within the object will be the text that is grabbed from the input boxes at the moment the submit button is clicked.
Receiving Information
---------------------
 The event listener in this scenario will be “message.” Whenever a message is received the client.js will run the function that you write in here.

    ws.addEventListener(‘message’, function(){
        // What do you do with the received message?
    })

 The goal is to use stringify and parse in both your client and server JS files. This is because the server should be parsing and storing some of the information that is sent, such as keeping a history of the chat, to share to new users. The server should then stringify and send the information back out to the targeted clients. 
 You will need to parse the receiving message. Once parsed you can now determine what to do with the values in the object. 
Here you should create and append the elements that will hold the data.

    var parsedMessage = JSON.parse(receivingMessage);
    var paragraph = document.createElement(‘p’);
    paragraph.innerText = parsedMessage.Text;
    chatBoxDiv.appendChild(paragraph);

Server Side
===========
We begin by declaring a WebSocket server object using the ws package, then declaring the variable for the actual web socket server:

    var WebSocketServer = require("ws").Server;
    var server = new WebSocketServer({port : 3000});


The server will also need to maintain the list of all connected clients, so we’ll declare a variable to that end here:

    var clients = [];

By creating an empty array of clients, we create a variable that will show the change in the number of users that join and leave the chat room.

Now we construct an event listener for the event of each client connecting to the server. This is what it’s all about; it’s basically what the server is for. All the other code will go inside this event listener.

    server.on("connection", function(ws) {
    });

While the WebSocket connection is up, we want to perform three tasks: (1) add the new client to the server-maintained clients array, (2) listen for a WebSocket connection closing, and (3) listen for a message from a WebSocket client and broadcast it.
(1) Add the new client to the server-maintained clients array.

    server.on("connection", function(ws) {
        clients.push(ws);

(2) Listen for a WebSocket connection closing.

        ws.on("close", function() {
            var x = clients.indexOf(ws);
            clients.splice(x,1);
            console.log("Clients connected: " + clients.length);
        });

(3) Listen for a message from a WebSocket client and broadcast it.

        ws.on("message", function(input) {

As mentioned above, we need to use JSON to parse the input, translating it from a string to an object.

        processedInput = JSON.parse(input);
        console.log(processedInput.name + " : " + processedInput.text);

We then step through each client in the client list and send the message to each of them.

        for (i = 0; i < clients.length; i++) { 
            clients[i].send(input);
        }
    });

Git and GitHub
==============
What is Git and GitHub?
-----------------------
Git is a VCS (Version Control System). Simply put, it’s a timeline for your project but a better way to understand it is like a tree. Your tree works like any other - with a base (master) and branches. With each project you will create a new repository (a project folder) and will be adding, committing, and pushing to that repo. Adding and committing are actions that happen locally (on your computer) but in order to fully save them you need to push everything to GitHub. GitHub is a website where you are saving all these different stages of your code. You can head over and view your code and so can others. Being able to save in stages is important because we all mess up sometimes. You’ll want to be able to go back in time to before the mess up occurred. When this happens - you’ll be using “clone” and “pull”. Branches are cool because they allow you to keep working on your project but in a separate place. Let’s say you want to add some features but aren’t completely confident in the process. Branch off of master (the base) and work away. If the code is a success, you can always “merge” that branch to master later. 

Let’s break the process down: 
 1. Head over to www.github.com and sign up or log in. 
 2. Once you are all logged in head over to the top right corner and hit the “+” and select “Create New Repository”. 
What is a repository? Simply put - it’s your projects folder. You are probably going to want to name this one something like “ChatApp”.
 3. You have a choice to make this file private or public. You should be making it public.
Why make a public repo? This way anyone can access your code! Employers often want to check out good code in GitHub so you’ll want to be able to share this. There’s a lot about cool projects that “made it big”. Who knows? Maybe your chat app will get noticed. 
 4. Once you’ve created your new repo you will be taken to an empty project page. Once you have pushed to GitHub, all your files can be accessed here.

Committing to GitHub
--------------------
 1. Open terminal and make sure you are in your projects folder (directory).
 2. Type `git init` - this will get GIT running. 
 3. Type `git add .` in order to add all the files in the directory. You don’t have to add everything at once, but this is a great shortcut. 
 4. To make the actual commit you will need to type `git commit -m [some sort of message]`.
 What is committing and how is it different from adding? When you added your files all you did was add them, nothing was really saved. Committing is going to actually save all those files to be accessed later. Remember, nothing is on GitHub yet - this is still only local. Messages are important so that you remember exactly what occurred. Be careful with what words are used in messages, sometimes employers like to check them out. 
 1. We need to give our saved files a place to go. Head back to GitHub and copy the SSH link. It will look something like this - `git@github.com:JohnSmith/chatapp.git`
 2. In terminal type out `git remote add origin git@github.com:JohnSmith/chatapp.git`
 3. Last step - `git push origin master` and you should get some sort of message when this process is completed. 
 4. Refresh the project page and all your files, folders, and code should be there.
 What exactly is happening here? We are saving our commit to GitHub and telling it that our origin is our base (master). If you were working of branch you would type that branch name instead of master.

Testing out locally
===================
When you believe your code will function it’s time to test it out.
1. Launch a Terminal window, and run your server code: `node server_code.js`
2. Now in a browser window, type in the address localhost:3000 (or the number of whatever port you designated).
3. This should display your chat app. Type in a line or two of chat.
4. Now open a second browser window and type in the same address. As you type in the two windows, all the chat text should be appearing in both. Check the Terminal window after each new action (client connection/disconnection, new feature test) to ascertain what action (if any) crashes the server.
5. Open up more browser windows, using different browsers and devices. Verify that the chat continues to work.
6. Close each connection and verify that the server is still running and that the remaining connections are open.
Now you’re ready to host the app on the Digital Ocean server.


Hosting on the Web with Digital Ocean
=====================================
 Digital Ocean, the server we will host the project on
 what you need: DO account info, password to DO account, ssh key to connect to your javascript server to the DO server, finalized/functional github repository 
 your laptop connects to the DO server through the ssh key
 run ssh key in the terminal
 inside finalized/functional github repository within terminal
 ssh to your DO domain
 git clone the https link from your Github repo. This automatically creates a folder for your repo, so you don’t need to make a folder for your code beforehand.
 cd into the cloned folder and npm install


 server is a hub to connect to
 things are not servers. programs are servers. laptops can be servers. any computer can be a server.
 a browser cannot be a server
 how a server is programmed coordinates how information is run back and forth bw the server and its other clients(users)
 meant for clients to connect to
 internet lets you connect to the server
 digital ocean will.princesspeach.nyc 3000
 currently in their server when put into terminal
 open port is 3000
 cannot use 3000 for another port
 but multiple people can open the port 3000
 port 80 is convention for the web