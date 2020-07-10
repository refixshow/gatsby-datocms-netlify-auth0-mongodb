import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "adamscieszka@gmail.com",
    clientId:
      "1094228178210-bjsgk40ru7p75nd40teu7307rgo8ssvr.apps.googleusercontent.com",
    clientSecret: "Xhl0t3Q8fFpRh5e2PXWB5FCp",
    refreshToken:
      "1//041jYK9mFzPpUCgYIARAAGAQSNwF-L9IrOhZjeDg16neYMR_cMyior6BYPt9iQlkgKWPFEXV2zMEa9ciz3S3CN_ZMA6uwI3K8aMI",
    accessToken:
      "ya29.a0AfH6SMDDyLmgn5bK4gtjvBrufnKBr2VXtDvb4G9x4t0OfL8F9RvUsh2BJNADi6qdQFxIfZ4K-p-zTIwbP9MqbDlX8Qw3JP7sbVLlR0Gc2OvlV_DJsWppidgrOS8211OfExS3FOcMYZohU1OFX9eXUPYtH6LMZk4uwUk",
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
