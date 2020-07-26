const calendar = require("./calendar")
const calendarEventSorter = require("./calendarEventSorter")

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
  // const claims = context.clientContext && context.clientContext.user
  let terms = {}

  try {
    const resFreeTerms = await calendar.events.list({
      calendarId: "joa13hfunn3kk1vd39uqjf7vuk@group.calendar.google.com",
    })

    const resReservedTerms = await calendar.events.list({
      calendarId: "jojoj8jdscrce532umgt6vau08@group.calendar.google.com",
    })

    terms = calendarEventSorter(resFreeTerms, resReservedTerms)
  } catch (err) {
    console.log(err)
  }

  callback(null, {
    statusCode: 200,
    headers,
    body: JSON.stringify(terms),
  })

  // switch (event.httpMethod) {
  //   // get all incomming reservation
  //   case "GET": {
  //     const eventlist = await calendar.events.list({ calendarId: "primary" })

  //     callback(null, {
  //       statusCode: 200,
  //       headers,
  //       body: JSON.stringify(eventlist.data.items),
  //     })
  //     break
  //   }

  //   case "POST": {
  //     // ADD reservation
  //     calendar.freebusy.query(
  //       {
  //         resource: {
  //           timeMin: eventStartTime,
  //           timeMax: eventEndTime,
  //           timeZone,
  //           items: [{ id: "primary" }],
  //         },
  //       },
  //       (err, res) => {
  //         // Check for errors in our query and log them if they exist.
  //         if (err) console.error("Free Busy Query Error: ", err)

  //         // Create an array of all events on our calendar during that time.
  //         const eventArr = res.data.calendars.primary.busy

  //         // Check if event array is empty which means we are not busy
  //         if (eventArr.length === 0)
  //           // If we are not busy create a new calendar event.
  //           calendar.events
  //             .insert({ calendarId: "primary", resource: eventCalendar })
  //             .then(res => {
  //               console.log(res, "HEREEEEEE")
  //             })
  //             .catch(err => {
  //               console.error(err)
  //             })
  //       }
  //     )

  //     callback(null, {
  //       statusCode: 200,
  //       headers,
  //       body: "POST",
  //     })
  //     break
  //   }

  //   // UPDATE reservation
  //   case "PUT": {
  //     callback(null, {
  //       statusCode: 200,
  //       headers,
  //       body: "PUT",
  //     })
  //   }

  //   // DELETE reservation
  //   case "DELETE": {
  //     calendar.events
  //       .delete({
  //         calendarId: "primary",
  //         eventId: "kqdk3d6cjisefnb1tc6os8ob90",
  //       })
  //       .then(res => {
  //         console.log(res)
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })

  //     callback(null, {
  //       statusCode: 200,
  //       headers,
  //       body: "DELETE",
  //     })
  //     break
  //   }

  //   default: {
  //     callback(null, {
  //       statusCode: 404,
  //       headers,
  //       body: "get out",
  //     })
  //     break
  //   }
  // }
}
