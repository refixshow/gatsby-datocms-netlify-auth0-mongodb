import express from "express"
import serverless from "serverless-http"
import nodemailer from "nodemailer"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const sendEmailRouter = express.Router()

sendEmailRouter.get("/", (req, res) => {
  res.json({
    hello: "hello!",
  })
})

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adamscieszka@gmail.com",
    pass: "haslo888",
  },
})

const mailOptions = {
  from: "adamscieszka@gmail.com",
  to: "adamscieszka@gmail.com",
  subject: "subject",
  text: "text",
}

sendEmailRouter.post("/", (req, res) => {
  const { email, text } = req.body

  mailOptions.from = email
  mailOptions.text = text

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err)
      res.status(404).json({
        muczo: "ERROR",
      })
    } else {
      res.status(200).json({
        muczo: "POSZŁOO",
      })
    }
  })

  mailOptions.from = "adamscieszka@gmail.com"
  mailOptions.text = "text"
})

app.use("/.netlify/functions/sendEmail", sendEmailRouter)

exports.handler = serverless(app)
