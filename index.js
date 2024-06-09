var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'demhanafri105@gmail.com',
    pass: 'uhrnjhkzryfhhppc'
  }
});

var mailOptions = {
  from: 'demhanafri105@gmail.com',
  to: ['yousufmuhammadkhan17@gmail.com', 'mubashirahmed028@gmail.com', 'highrated109@gmail.com', 'hammadn788@gmail.com'],
  subject: 'Sending Email using Node.js',
  html: `
  <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generative AI Class Source Code</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; background-color: #f9f9f9;">
    <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333;">Dear Students,</h1>
        <p>
            I hope you all enjoyed today's class and found the session on Generative AI informative and engaging. As promised, I am sharing the source code we discussed and worked on today. You can find the code attached to this message.
        </p>
        <h2 style="color: #333;">Source Code Details:</h2>
        <ul style="color: #555;">
            <li><strong>Topic Covered:</strong> [Insert Topic Name, e.g., "Generating Text with GPT-4"]</li>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});