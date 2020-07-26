const mongoose = require("mongoose")
const Client = require("./clientModel")

mongoose
  .connect(
    "mongodb+srv://test_user:test_userpasswd@adamthepath.douz2.gcp.mongodb.net/secret-sister-project?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch(err => {
    console.log("DB Connection Error", err)
  })

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Content-Type": "application/json",
}

exports.handler = async (event, context, callback) => {
  const claims = context.clientContext && context.clientContext.user

  if (claims) {
    switch (event.httpMethod) {
      // get all incomming reservation
      case "GET": {
        try {
          const client = await Client.findOne({
            email: "adamscieszka@gmail.com",
          })

          callback(null, {
            statusCode: 200,
            headers,
            body: JSON.stringify(client),
          })
          break
        } catch (err) {
          callback(null, {
            statusCode: 400,
            headers,
            body: JSON.stringify(err),
          })
          break
        }
      }

      case "POST": {
        try {
          const newClient = await Client.create(JSON.parse(event.body))

          callback(null, {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              newClient,
              message: "DB Client Created.",
            }),
          })
          break
        } catch (err) {
          callback(null, {
            statusCode: 400,
            headers,
            body: JSON.stringify(err),
          })
          break
        }
      }

      case "PUT": {
        try {
          const client = await Client.findOneAndUpdate(
            {
              email: "adamscieszka@gmail.com",
            },
            JSON.parse(event.body),
            { new: true, runValidators: true }
          )

          callback(null, {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              client,
              message: "DB Client Updated.",
            }),
          })
          break
        } catch (err) {
          callback(null, {
            statusCode: 400,
            headers,
            body: JSON.stringify(err),
          })
          break
        }
      }

      case "DELETE": {
        try {
          const client = await Client.findOneAndDelete({
            email: "adamscieszka@gmail.com",
          })

          callback(null, {
            statusCode: 200,
            headers,
            body: "DB Client Deleted",
          })
          break
        } catch (err) {
          callback(null, {
            statusCode: 400,
            headers,
            body: JSON.stringify(err),
          })
          break
        }
      }

      default: {
        callback(null, {
          statusCode: 404,
          headers,
          body: "not found",
        })
        break
      }
    }
  } else {
    callback(null, {
      statusCode: 401,
      headers,
      body: "not authorized",
    })
  }
}
