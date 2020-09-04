# CAPS
## day 1 user stories:
The following user/developer stories detail the major functionality for this phase of the project.

As a vendor, I want to alert the system when I have a package to be picked up
As a driver, I want to be notified when there is a package to be delivered
As a driver, I want to alert the system when I have picked up a package and it is in transit
As a driver, I want to alert the system when a package has been delivered
As a vendor, I want to be notified when my package has been delivered
And as developers, here are some of the development stories that are relevant to the above

As a developer, I want to use industry standards for managing the state of each package
As a developer, I want to create an event driven system so that I can write code that happens in response to events, in real time

# day1 overview:
Did a lot of good work, but because I didn't do test driven development I had to go back and alter a bunch of stuff to get to passing, but I am passing so I'll take it! 

Not sure if the testing for the last one was right, but I guess we'll have to figure that out tomorrow.

# day2 notes from demo:
net vs. express: HTTP is based on request reponse (ie. if I want to say something to Chen, I have to wait for chen to send me a request (call me) so I can tell him what I wanted to tell him)
net allows you to just say what you want, put it out there, and let who cares pay attention.

to trigger server.js (demo) we need to go to a different app and get a new net.Socket();

# day2 changes
started fresh today by making three folders with all new files inside, but I carried over a lot of the ideas from yesterday. 

# day3
Today I implemented Socket.IO
I experienced a lot of problems that I couldn't make any sense of. I kept getting an error 
Error: listen EADDRINUSE: address already in use :::3003
For instance, I passed in (event, string) as arguments to a function and then used it as {event, string} in an object. When I changed the name of the argument to payload, and the key/value to payload it threw that error about address already in use and that just doesn't make any sense to me. 

Got help from Tia and Daisy and was able to get this working right but not without a lot of frustration along the way. 

# day4
Today I added some extra functionality in order to better support scenarios in which the client loses connection with the server. For example, if a driver loses connection to the server, we wouldn't want the request for pickup to go unnoticed. So we made it so that unless a driver acknowledges receipt of a pickup request it gets added to the queue. Whenever a driver connects with the server it makes a request for everything in the queue. 
