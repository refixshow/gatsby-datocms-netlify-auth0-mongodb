exports.handler = function (event, context, callback) {
  if (event.httpMethod === "POST") {
    callback(null, {
      statusCode: 200,
      body: JSON.parse(event.body),
    })
  }

  if (event.httpMethod === "GET") {
    callback(null, {
      statusCode: 200,
      body: JSON.parse(event.body),
    })
  }
}
