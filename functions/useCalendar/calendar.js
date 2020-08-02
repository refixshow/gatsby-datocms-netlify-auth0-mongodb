const { google } = require("googleapis")
const termsSorter = require("./termsSorter")
const Event = require("./event")

const { OAuth2 } = google.auth

// create calendar
const OAuth2Client = new OAuth2(
  "1094228178210-bjsgk40ru7p75nd40teu7307rgo8ssvr.apps.googleusercontent.com",
  "Xhl0t3Q8fFpRh5e2PXWB5FCp"
)
OAuth2Client.setCredentials({
  refresh_token:
    "1//04g52H3f9HMBXCgYIARAAGAQSNwF-L9IrsBEBYFZ--OEOIO2mW8zCxCjpXqTl6ZMcRh5CEOago_a70cyAT5DXMM-Kq6po-HluLSA",
})
const calendar = google.calendar({ version: "v3", auth: OAuth2Client })

const freeTermsCalendarId =
  "joa13hfunn3kk1vd39uqjf7vuk@group.calendar.google.com"
const reservedTermsCalendarId =
  "jojoj8jdscrce532umgt6vau08@group.calendar.google.com"

const getTermsOptions = {
  showDeleted: false,
  orderBy: "startTime",
  singleEvents: true,
  timeMin: new Date(),
}

class Calendar {
  constructor() {
    this.calendar = calendar
    this.freeTermsCalendarId = freeTermsCalendarId
    this.reservedTermsCalendarId = reservedTermsCalendarId
    this.getTermsOptions = getTermsOptions
  }

  timeZone = "Europe/Warsaw"

  getFreeTerms = async () => {
    try {
      const { data: resData } = await this.calendar.events.list({
        calendarId: freeTermsCalendarId,
        ...getTermsOptions,
      })

      const sortedData = termsSorter(resData)

      return sortedData
    } catch (err) {
      console.log(err)
    }
  }

  getReservedTerms = async () => {
    try {
      const { data: resData } = await this.calendar.events.list({
        calendarId: reservedTermsCalendarId,
        ...getTermsOptions,
      })

      const sortedData = termsSorter(resData)

      return sortedData
    } catch (err) {
      console.error(err)
    }
  }

  addEvent = async data => {
    const { eventId, dateStart, dateEnd } = data

    try {
      const newEvent = new Event(dateStart, dateEnd, 3, "Zarezerwowany Termin")

      const queryRes = await this.calendar.freebusy.query({
        resource: {
          timeMin: dateStart,
          timeMax: dateEnd,
          timeZone: this.timeZone,
          items: [{ id: this.reservedTermsCalendarId }],
        },
      })

      if (
        queryRes.data.calendars[this.reservedTermsCalendarId].busy.length === 0
      ) {
        await this.calendar.events.insert({
          calendarId: this.reservedTermsCalendarId,
          resource: newEvent,
        })

        await this.calendar.events.delete({
          calendarId: this.freeTermsCalendarId,
          eventId,
        })

        return { status: true }
      } else {
        return { status: false }
      }
    } catch (err) {
      console.error(err)
    }
  }

  deleteEvent = async data => {
    const { eventId, dateStart, dateEnd } = data

    try {
      const newEvent = new Event(dateStart, dateEnd, 5, "Wolny Termin")

      const queryRes = await this.calendar.freebusy.query({
        resource: {
          timeMin: dateStart,
          timeMax: dateEnd,
          timeZone: this.timeZone,
          items: [{ id: this.freeTermsCalendarId }],
        },
      })

      if (queryRes.data.calendars[this.freeTermsCalendarId].busy.length === 0) {
        await this.calendar.events.insert({
          calendarId: this.freeTermsCalendarId,
          resource: newEvent,
        })

        await this.calendar.events.delete({
          calendarId: this.reservedTermsCalendarId,
          eventId,
        })

        return { status: true }
      } else {
        return { status: false }
      }
    } catch (err) {
      console.error(err)
    }
  }

  // front
  // on edit click eventId, dateStart, dateEnd
  // on change click eventId, dateStart, dateEnd, eventToUpdateId, eventToUpdateStart, eventToUpdateEnd

  // back
  // on click eventId, dateStart, dateEnd <--- wstawianie freeTerm
  // on change click eventToUpdateId, eventToUpdateStart, eventToUpdateEnd <--- usuwanie freeTerm, updateReservedTerm

  updateEvent = async data => {
    const {
      eventId,
      dateStart,
      dateEnd,
      eventToUpdateId,
      dateToUpdateStart,
      dateToUpdateEnd,
    } = data

    console.log(data)

    try {
      const queryRes = await this.calendar.freebusy.query({
        resource: {
          timeMin: dateToUpdateStart,
          timeMax: dateToUpdateEnd,
          timeZone: this.timeZone,
          items: [{ id: this.freeTermsCalendarId }],
        },
      })

      if (queryRes.data.calendars[this.freeTermsCalendarId].busy.length === 1) {
        const newEvent = new Event(dateStart, dateEnd, 5, "Wolny Termin")

        await this.calendar.events.delete({
          calendarId: this.freeTermsCalendarId,
          eventId: eventToUpdateId,
        })

        await this.calendar.events.insert({
          calendarId: this.freeTermsCalendarId,
          resource: newEvent,
        })

        await this.calendar.events.update({
          calendarId: this.reservedTermsCalendarId,
          eventId,
          resource: {
            start: {
              dateTime: dateToUpdateStart,
              timeZone: this.timeZone,
            },
            end: {
              dateTime: dateToUpdateEnd,
              timeZone: this.timeZone,
            },
          },
        })

        return { status: true }
      } else {
        return { status: false }
      }
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = Calendar
