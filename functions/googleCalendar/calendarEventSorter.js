function calendarEventSorter(resFreeTerms, resReservedTerms) {
  return {
    freeTerms: {
      events: resFreeTerms.data.items,
      summary: resFreeTerms.data.summary,
    },
    reservedTerms: {
      events: resReservedTerms.data.items,
      summary: resReservedTerms.data.summary,
    },
  }
}

module.exports = calendarEventSorter
