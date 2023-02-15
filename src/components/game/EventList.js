import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"
import { useNavigate } from "react-router-dom"

export const EventList = (props) => {
  const [events, setEvents] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getEvents().then((data) => setEvents(data))
  }, [])

  return (
    <article className="events">
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          navigate({ pathname: "/events/new" })
        }}
      >
        Organize an Event
      </button>
      {events.map((event) => {
        return (
          <section key={`event--${event.id}`} className="event">
            <div className="event__name">{event.name}</div>
            <div className="event__location">{event.location}</div>
            <div className="event__date">{event.date}</div>
            <div className="event__start">{event.start_time}</div>
            <div className="event__end">{event.end_time}</div>
            <div className="event__des">{event.description}</div>
            <div className="event__game">{event.game.name}</div>
          </section>
        )
      })}
    </article>
  )
}
