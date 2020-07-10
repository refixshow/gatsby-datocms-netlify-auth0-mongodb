exports.handler = function (event, context, callback) {
  console.log(event, "event HERE")
  console.log(context, "context HERE")

  callback(null, {
    statusCode: 200,
    body: "Hello, World",
  })
}
