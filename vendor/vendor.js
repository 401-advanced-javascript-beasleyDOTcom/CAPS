/*
Use .env to set your store name
Connect to the CAPS server
Every 5 seconds, simulate a new customer order
Create an order object with your store name, order id, customer name, address
HINT: Have some fun by using the faker library to make up phony information
Create a message object with the following keys:
event - ‘pickup’
payload - the order object you created in the above step
Write that message (as a string) to the CAPS server
Listen for the data event coming in from the CAPS server
When data arrives, parse it (it should be JSON) and look for the event property
If the event is called delivered
Log “thank you for delivering id” to the console
Ignore any data that specifies a different event
*/