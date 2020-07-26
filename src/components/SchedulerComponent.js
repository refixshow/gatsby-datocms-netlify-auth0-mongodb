import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import styled from "styled-components"

import SwiperCore, { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper.scss"
import "swiper/components/navigation/navigation.scss"
import "swiper/components/pagination/pagination.scss"
import "swiper/components/scrollbar/scrollbar.scss"

SwiperCore.use([Navigation, Pagination])

const Slide = styled.div`
  display: flex;
  height: 200px;
  padding: 50px;

  & div {
    width: 100%;
    background-color: red;
  }
`

const SchedulerComponent = () => {
  const [terms, setTerms] = useState(null)

  const fetchTerms = useCallback(async () => {
    const {
      data: { reservedTerms, freeTerms },
    } = await axios("/.netlify/functions/googleCalendar")

    setTerms({ reservedTerms, freeTerms })
  }, [])

  useEffect(() => {
    fetchTerms()
  }, [fetchTerms])

  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {[...Array(10)].map((x, i) => (
          <SwiperSlide key={i}>
            <Slide>
              <div>
                {terms && terms.freeTerms.events[i]
                  ? terms.freeTerms.events[i].id
                  : "xd"}
              </div>
              <div>div</div>
              <div>div</div>
              <div>div</div>
              <div>div</div>
            </Slide>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default SchedulerComponent
