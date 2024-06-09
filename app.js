const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");
var nodemailer = require('nodemailer');
const { Config } = require('twilio/lib/twiml/VoiceResponse');

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 8080;


app.post("/webhook", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    function hi(agent) {
        console.log(`intent  =>  hi`);
        agent.add("Hello, I'm SMIT Assistant, Please let me know How I Can Help You")
    }

    function Details(agent) {
        agent.add("Alright, tell me your name")
    }

    function Fallback(agent) {
        console.log(`intent  =>  Default Fallback Intent`);
        agent.add("")
    }

    function email(agent) {
        console.log(`intent  =>  email`);
        const accountSid = 'AC293c1ac284af1ec72acf7d3c257088df';
        const authToken = '036027a7e353ea032c685b06aa215577';
        const client = require('twilio')(accountSid, authToken);
      
        const { person, email, number, } = agent.parameters

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'saem77@gmail.com',
                pass: "etelmnhiqdodspqa"
            }
        });
        agent.add(`
        Wonder Full, You have succesfully Enrolled in SMIT!
        `)
        client.messages
            .create({
                body: `Hi there, We received your email with your name ${person.name}  with your phone number ${number}. Thank You for your email.`,
                from: '+12073673904',
                to: '+923312358664'
            })
            .then(message => console.log(message.sid));
        var mailOptions = {
            from: 'saem77@gmail.com',
            to: [email,"hammadn788@gmail.com"],
            subject : 'Sending Email from Node.js server',
            html: `  Dear student you have succefully enrolled in SMIT, Here is your ID Card :
              <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Saylani Mass IT Training</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; background-color: #f9f9f9;">
    <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333;">Saylani Mass IT Training</h1>
        <p>
            Your Profile Picture
        </p>
        <h2 style="color: #333;">Name : ${person.name}</h2>
        <h3 style="color: #555;">Email : ${email}</h3>
        <h3 style="color: #555;">Roll NUmber : ${number}</h3>
        `
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    let intentMap = new Map();
    intentMap.set('email', email);
    intentMap.set('Default Welcome Intent', hi);
    intentMap.set('Default Fallback Intent', Fallback);
    intentMap.set('Details', Details);
    
    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
