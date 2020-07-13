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

// Create a new event start date instance for temp uses in our calendar.
const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDate() + 2)

// Create a new event end date instance for temp uses in our calendar.
const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDate() + 2)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

const timeZone = "Europe/Warsaw"
// Create a dummy event for temp uses in our calendar
const eventCalendar = {
  summary: `Meeting with David`,
  location: `3595 California St, San Francisco, CA 94118`,
  description: `Meet with David to talk about the new client project and how to integrate the calendar for booking.`,
  colorId: 1,
  start: {
    dateTime: eventStartTime,
    timeZone,
  },
  end: {
    dateTime: eventEndTime,
    timeZone,
  },
}

exports.handler = function (event, context, callback) {
  if (event.httpMethod === "POST") {
    // Check if we a busy and have an event on our calendar for the same time.
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
        if (err) return console.error("Free Busy Query Error: ", err)

        // Create an array of all events on our calendar during that time.
        const eventArr = res.data.calendars.primary.busy

        // Check if event array is empty which means we are not busy
        if (eventArr.length === 0)
          // If we are not busy create a new calendar event.
          return calendar.events.insert(
            { calendarId: "primary", resource: eventCalendar },
            err => {
              // Check for errors and log them if they exist.
              if (err)
                return console.error("Error Creating Calender Event:", err)
              // Else log that the event was created.
              return console.log("Calendar event successfully created.")
            }
          )

        // If event array is not empty log that we are busy.
        return console.log(`Sorry I'm busy...`)
      }
    )

    callback(null, {
      statusCode: 200,
      body: "POST",
    })
  } else {
    callback(null, {
      statusCode: 200,
      body: "GET",
    })
  }
}
