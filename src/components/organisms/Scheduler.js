import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import styled from "styled-components"
import moment from "moment"
import { v4 as uuid } from "uuid"

import TermTile from "../molecules/TermsTile"

import CircularProgress from "@material-ui/core/CircularProgress"

import SwiperCore, { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import "../../swiper.css"

SwiperCore.use([Navigation])

const Loader = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  z-index: 1000;
`

const SlideContent = styled.div`
  display: flex;
  padding: 0px 75px;
  min-height: 100px;
`

const SchedulerComponent = () => {
  const [events, setEvents] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState({
    eventId: "",
    date: "",
    start: "",
    status: false,
  })

  const getEvents = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios("/.netlify/functions/useCalendar")
      setEvents(data)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  const addEvent = async (eventId, date, startHour) => {
    try {
      const dateStart = moment(
        `${date} ${startHour}`,
        "YYYY-MM-DD hh:mm"
      ).toISOString()

      const dateEnd = moment(dateStart).add(1, "h").toISOString()

      await axios.post("/.netlify/functions/useCalendar", {
        eventId,
        dateStart,
        dateEnd,
      })

      getEvents()
    } catch (err) {
      console.log(err)
    }
  }
  const deleteEvent = async (eventId, date, startHour) => {
    try {
      const dateStart = moment(
        `${date} ${startHour}`,
        "YYYY-MM-DD hh:mm"
      ).toISOString()

      const dateEnd = moment(dateStart).add(1, "h").toISOString()

      await axios.delete("/.netlify/functions/useCalendar", {
        data: { eventId, dateStart, dateEnd },
      })

      getEvents()
    } catch (err) {
      console.log(err)
    }
  }

  const editEvent = async (
    eventId,
    date,
    startHour,
    eventToUpdateId,
    dateToUpdate,
    dateToUpdateStartHour
  ) => {
    try {
      const dateStart = moment(
        `${date} ${startHour}`,
        "YYYY-MM-DD hh:mm"
      ).toISOString()

      const dateEnd = moment(dateStart).add(1, "h").toISOString()

      const dateToUpdateStart = moment(
        `${dateToUpdate} ${dateToUpdateStartHour}`,
        "YYYY-MM-DD hh:mm"
      ).toISOString()

      const dateToUpdateEnd = moment(dateToUpdateStart)
        .add(1, "h")
        .toISOString()

      await axios.put("/.netlify/functions/useCalendar", {
        eventId,
        dateStart,
        dateEnd,
        eventToUpdateId,
        dateToUpdateStart,
        dateToUpdateEnd,
      })
      setIsEditing({
        eventId: "",
        date: "",
        start: "",
        status: false,
      })
      getEvents()
    } catch (err) {
      console.error(err)
    }
  }

  const getDayDate = (idx, num) => {
    return moment()
      .add(idx * 7 + num, "d")
      .format("YYYY-MM-DD")
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <Swiper spaceBetween={50} slidesPerView={1} navigation>
      {isLoading ? (
        <Loader>
          <CircularProgress />
        </Loader>
      ) : null}
      {Array.from({ length: 12 }).map((x, idx) => (
        <SwiperSlide key={uuid()}>
          <SlideContent>
            {Array.from({ length: 7 }).map((y, indx) => (
              <TermTile
                key={uuid()}
                events={events}
                date={getDayDate(idx, indx + 1)}
                addEvent={addEvent}
                deleteEvent={deleteEvent}
                editEvent={editEvent}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            ))}
          </SlideContent>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SchedulerComponent
