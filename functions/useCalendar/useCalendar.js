const Calendar = require("./calendar")

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Content-Type": "application/json",
}

const newCalendar = new Calendar()

exports.handler = async (event, context, callback) => {
  // const claims = context.clientContext && context.clientContext.user

  switch (event.httpMethod) {
    // get all incomming reservation
    case "GET": {
      let terms = {}
      try {
        const freeTerms = await newCalendar.getFreeTerms()
        const reservedTerms = await newCalendar.getReservedTerms()

        terms = {
          freeTerms,
          reservedTerms,
        }
      } catch (err) {
        console.log(err)
      }

      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify(terms),
      })
    }
    // ADD reservation
    case "POST": {
      const res = await newCalendar.addEvent(JSON.parse(event.body))

      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify(res),
      })
      break
    }

    // UPDATE reservation
    case "PUT": {
      const res = await newCalendar.updateEvent(JSON.parse(event.body))

      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify(res),
      })
    }

    // DELETE reservation
    case "DELETE": {
      const res = await newCalendar.deleteEvent(JSON.parse(event.body))

      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify(res),
      })
      break
    }

    default: {
      callback(null, {
        statusCode: 404,
        headers,
        body: "get out",
      })
      break
    }
  }
}
