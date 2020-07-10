import express from "express"
import serverless from "serverless-http"

const app = express()

const sendEmailRouter = express.Router()

sendEmailRouter.get("/", (req, res) => {
  res.json({
    hello: "get",
  })
})

sendEmailRouter.post("/", (req, res) => {
  res.json({
    hello: "post",
  })
})

app.use("/.netlify/functions/sendEmail")

exports.handler = serverless(app)
