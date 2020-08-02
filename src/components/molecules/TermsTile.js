import React, { memo } from "react"
import styled from "styled-components"
import { v4 as uuid } from "uuid"

import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import Button from "@material-ui/core/Button"
import UpdateIcon from "@material-ui/icons/Update"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const FreeTile = styled.div`
  & button span {
    margin-left: 5px;
  }
`

const ReservedTile = styled.div`
  margin-top: 15px;

  & button {
    padding: 8px 10px;
    min-width: 0;
  }

  & div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  & h4 {
    grid-column: 1/-1;
    margin: 10px;
  }
`

const TermTile = ({
  events,
  date,
  addEvent,
  deleteEvent,
  editEvent,
  isEditing,
  setIsEditing,
}) => {
  console.log("xd")
  return (
    <Container>
      <h4>{date}</h4>
      <FreeTile>
        {events && events.freeTerms[date] ? (
          events.freeTerms[date].map(term => (
            <Button
              key={uuid()}
              onClick={() => {
                isEditing.status
                  ? editEvent(
                      isEditing.eventId,
                      isEditing.date,
                      isEditing.start,
                      term.id,
                      date,
                      term.start
                    )
                  : addEvent(term.id, date, term.start)
              }}
            >
              {isEditing.status ? (
                <UpdateIcon fontSize="small" />
              ) : (
                <AddIcon fontSize="small" />
              )}

              <span>{term.start}</span>
            </Button>
          ))
        ) : (
          <span>Brak wolncyh terminów.</span>
        )}
      </FreeTile>

      <ReservedTile>
        {events && events.reservedTerms[date] ? (
          <span>Zarezerwowane terminy.</span>
        ) : null}
        {events && events.reservedTerms[date]
          ? events.reservedTerms[date].map(term => (
              <div key={uuid()}>
                <h4>{term.start}</h4>
                <Button
                  onClick={() => {
                    if (isEditing.status) {
                      setIsEditing({
                        eventId: "",
                        date: "",
                        start: "",
                        status: false,
                      })
                    } else {
                      setIsEditing({
                        eventId: term.id,
                        date,
                        start: term.start,
                        status: true,
                      })
                    }
                  }}
                >
                  <EditIcon fontSize="small" />
                </Button>
                <Button
                  disabled={isEditing.status}
                  onClick={() => {
                    deleteEvent(term.id, date, term.start)
                  }}
                >
                  <DeleteIcon
                    fontSize="small"
                    color={isEditing.status ? "disabled" : "inherit"}
                  />
                </Button>
              </div>
            ))
          : null}
      </ReservedTile>
    </Container>
  )
}

export default TermTile
