import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"

export const EventList = (props) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents().then((data) => setEvents(data))
  }, [])

  return (
    <article className="events">
      {events.map((event) => {
        return (
          <section key={`event--${event.id}`} className="event">
            <div className="event__name">{event.name}</div>
            <div className="event__location">{event.location}</div>
            <div className="event__date">{event.date}</div>
            <div className="event__start">{event.start_time}</div>
            <div className="event__end">{event.end_time}</div>
          </section>
        )
      })}
    </article>
  )
}
