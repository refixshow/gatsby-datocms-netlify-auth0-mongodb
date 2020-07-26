const { google } = require("googleapis")

const { OAuth2 } = google.auth

const OAuth2Client = new OAuth2(
  "1094228178210-bjsgk40ru7p75nd40teu7307rgo8ssvr.apps.googleusercontent.com",
  "Xhl0t3Q8fFpRh5e2PXWB5FCp"
)

OAuth2Client.setCredentials({
  refresh_token:
    "1//04g52H3f9HMBXCgYIARAAGAQSNwF-L9IrsBEBYFZ--OEOIO2mW8zCxCjpXqTl6ZMcRh5CEOago_a70cyAT5DXMM-Kq6po-HluLSA",
})

const calendar = google.calendar({ version: "v3", auth: OAuth2Client })

module.exports = calendar
