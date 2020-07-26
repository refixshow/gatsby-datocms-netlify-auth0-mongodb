import React from "react"
import styled from "styled-components"

import SchedulerComponent from "../components/SchedulerComponent"

const Container = styled.div`
  display: flex;
  width: 60%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const Scheduler = () => {
  return (
    <Container>
      <SchedulerComponent />
    </Container>
  )
}

export default Scheduler
