const moment = require("moment")

function termsSorter(resTerms) {
  const terms = {}
  let temp = "empty"

  resTerms.items.forEach(item => {
    // if temp is empty set the temp with new date of item
    // then push new free term
    if (temp === "empty") {
      temp = moment(item.start.dateTime).format("YYYY-MM-DD")
      terms[temp] = [
        {
          start: moment(item.start.dateTime).format("HH:mm"),
          end: moment(item.end.dateTime).format("HH:mm"),
          id: item.id,
        },
      ]
    } else {
      // if temp is equal to item's date
      // then push it to array of events in that date

      // or set temp to new date
      // then push new free term
      if (temp === moment(item.start.dateTime).format("YYYY-MM-DD")) {
        terms[temp].push({
          start: moment(item.start.dateTime).format("HH:mm"),
          end: moment(item.end.dateTime).format("HH:mm"),
          id: item.id,
        })
      } else {
        temp = moment(item.start.dateTime).format("YYYY-MM-DD")
        terms[temp] = [
          {
            start: moment(item.start.dateTime).format("HH:mm"),
            end: moment(item.end.dateTime).format("HH:mm"),
            id: item.id,
          },
        ]
      }
    }
  })

  return terms
}

module.exports = termsSorter
