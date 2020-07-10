import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "adamscieszka@gmail.com",
    clientId:
      "1094228178210-bjsgk40ru7p75nd40teu7307rgo8ssvr.apps.googleusercontent.com",
    clientSecret: "Xhl0t3Q8fFpRh5e2PXWB5FCp",
    refreshToken:
      "1//04ZTAf13QMNc8CgYIARAAGAQSNwF-L9Ir4q0rstrKPzEpyyzvwGAYroB6meT02PvV0bmtt_uZdglbDO1JXe8QSqfHhZXVbZdQ8p4",
    accessToken:
      "ya29.a0AfH6SMDJ2cRBaM79zo8xsri4Mt_PauK2YKWUS0qSJ3dvYtH_1JVX5Mn8xcZTEEt4gHXbfvqjpFG9nnJokYqTo74R9lLWB1ZIJs6cEWD5Lev8PiInhpnSJsE6kzYIubjv0GewkkQ-F70is6dFzxSjo1OR-g8JYQOF-xo",
  },
})

const mailOptions = {
  from: "adamscieszka@gmail.com",
  to: "adamscieszka@gmail.com",
  subject: "subject",
  text: "text",
}

exports.handler = function (event, context, callback) {
  if (event.httpMethod === "POST") {
    const { email, text } = JSON.parse(event.body)

    mailOptions.from = email
    mailOptions.text = text

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, {
          statusCode: 200,
          body: "OK",
        })
      }
    })

    mailOptions.from = "adamscieszka@gmail.com"
    mailOptions.text = "text"
  }
}
