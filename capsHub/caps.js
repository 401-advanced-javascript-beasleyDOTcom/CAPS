/*
Creates a pool of connected clients
Accept inbound TCP connections on a declared port
On new connections, add the client to the connection pool
On incoming data from a client
Read and parse the incoming data/payload
Verify that the data is legitimate
Is it a JSON object with both an event and payload properties?
If the payload is ok, broadcast the raw data back out to each of the other connected clients
*/
