class Event {
  constructor(startDateTime, endDateTime, colorId, summary) {
    this.colorId = colorId
    this.summary = summary
    this.start = {
      dateTime: startDateTime,
      timeZone: this.timeZone,
    }
    this.end = {
      dateTime: endDateTime,
      timeZone: this.timeZone,
    }
  }
  timeZone = "Europe/Warsaw"
  location = "Świerzna"
  description = "Rzęsy"
}

module.exports = Event
