const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:false}))

app.get("/", (req,res) => {
    res.render("index");
});

app.get("/about", (req,res) => {
    res.render("about");
});

app.get("/contact", (req,res) => {
    res.render("contact");
});

app.post("/contact", (req,res) => {
    let transporter = nodemailer.createTransport({
       service:"Gmail",
       auth: {
           user: "techguyinfo@gmail.com",
           pass: ""
       } 
    });

    let mailOptions = {
        from: "brad traversy <techhrhh@gmail.com>",
        to: "support@gmail.com",
        subject: "subject test",
        text: "following details, name: " + req.body.name,
        html: "<p>following details, </p> <p>name: " + req.body.name + "</p>"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error),
            res.redirect("/");
        } else {
            console.log(info.response);
            res.redirect("/");
        }
    });
});

app.listen(3000);
