const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", () => {
  resizeBy.send("welcome");
});

app.post("/api/forma", (req, res) => {
  let data = req.body;
  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 587,
    secure: false,
    auth: {
      user: "loudAndClearAnalysis@gmail.com",
      pass: "kyotpmbpeuobjepn"
    },
  });
  let mailOptions = {
    from: data.email,
    to: "loudAndClearAnalysis@gmail.com",
    subject: `Request from ${data.firstname} ${data.lastname}, product: ${data.product}`,
    html: `
    <h3>Customer Informations</h3>
    <ul>
        <li>First name : ${data.firstname}</li>
        <li>Last name : ${data.lastname}</li>
        <li>${data.email}</li>
        <li>Phone Number : ${
          data.phoneNumber ? data.phoneNumber : "No phone number available"
        }</li>      
    </ul>
    <h3>Message</h3>
    <p>${data.message}</p>      
    `,
  };
  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Success");
    }
  });
  smtpTransport.close();
});

const port = 4001;

app.listen(port, () => {
  console.log("server running at port:", port);
});
