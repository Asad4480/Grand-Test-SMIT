const accountSid = 'ACccd3897b5fb0b6e65d566b4dea581042';
const authToken = 'a8483290f519ac3701c2b97c4fb12f57';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Hello from Node.js Server',
        from: '+13613091669',
        to: '+923123023645'
    })
    .then(message => console.log(message.sid));