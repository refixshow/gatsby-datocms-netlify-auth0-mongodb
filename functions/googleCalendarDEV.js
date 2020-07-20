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

const timeZone = "Europe/Warsaw"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Content-Type": "application/json",
}

const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDate() + 2)

const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDate() + 2)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

const eventCalendar = {
  summary: `Rzęsy`,
  location: `Świerzna`,
  description: `Rzęsy`,
  colorId: 3,
  start: {
    dateTime: eventStartTime,
    timeZone,
  },
  end: {
    dateTime: eventEndTime,
    timeZone,
  },
}

exports.handler = async (event, context, callback) => {
  const claims = context.clientContext && context.clientContext.user

  if (claims) {
    switch (event.httpMethod) {
      // get all incomming reservation
      case "GET": {
        callback(null, {
          statusCode: 200,
          headers,
          body: "GET",
        })
      }

      // add or update reservation
      case "POST": {
        calendar.freebusy.query(
          {
            resource: {
              timeMin: eventStartTime,
              timeMax: eventEndTime,
              timeZone,
              items: [{ id: "primary" }],
            },
          },
          (err, res) => {
            // Check for errors in our query and log them if they exist.
            if (err) console.error("Free Busy Query Error: ", err)

            // Create an array of all events on our calendar during that time.
            const eventArr = res.data.calendars.primary.busy

            // Check if event array is empty which means we are not busy
            if (eventArr.length === 0)
              // If we are not busy create a new calendar event.
              calendar.events
                .insert(
                  { calendarId: "primary", resource: eventCalendar },
                  err => {
                    // Check for errors and log them if they exist.
                    if (err)
                      console.error("Error Creating Calender Event:", err)
                    // Else log that the event was created.
                    console.log("Calendar event successfully created.")
                  }
                )
                .then(res => {
                  console.log(res)
                })
                .catch(err => {
                  console.error(err)
                })

            // If event array is not empty log that we are busy.
            console.log(`Sorry I'm busy...`)
          }
        )

        callback(null, {
          statusCode: 200,
          headers,
          body: "POST",
        })
      }

      case "PUT": {
        callback(null, {
          statusCode: 200,
          headers,
          body: "PUT",
        })
      }

      // delete or update reservation
      case "DELETE": {
        callback(null, {
          statusCode: 200,
          headers,
          body: "DELETE",
        })
      }

      default: {
        callback(null, {
          statusCode: 404,
          headers,
          body: "get out",
        })
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
