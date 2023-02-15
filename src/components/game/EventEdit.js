import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGames } from "../../managers/GameManager.js"
import {
  createEvent,
  getSingleEvent,
  updateEvent,
} from "../../managers/EventManager.js"

export const EditEventForm = () => {
  const navigate = useNavigate()
  const [games, setGames] = useState([])
  const { eventId } = useParams()

  const [currentEvent, setCurrentEvent] = useState({
    name: "",
    location: "",
    date: "",
    start_time: "",
    end_time: "",
    description: "",
    game: 0,
  })

  useEffect(() => {
    getSingleEvent(`${eventId}`).then((data) => setCurrentEvent(data))
  }, [eventId])

  useEffect(() => {
    getGames().then((data) => setGames(data))
  }, [])

  const changeGameState = (domEvent) => {
    // TODO: Complete the onChange function
  }

  return (
    <form className="eventForm">
      <h2 className="eventForm__title">Organize an Event:</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Name: </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control"
            defaultValue={currentEvent.name}
            onChange={(evt) => {
              const copy = { ...currentEvent }
              copy.name = evt.target.value
              setCurrentEvent(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            name="location"
            required
            autoFocus
            className="form-control"
            defaultValue={currentEvent.location}
            onChange={(evt) => {
              const copy = { ...currentEvent }
              copy.location = evt.target.value
              setCurrentEvent(copy)
            }}
          />
        </div>
      </fieldset>
      <div>
        <label htmlFor="date-input">Date:</label>
        <input
          type="date"
          id="date-input"
          value={currentEvent.date}
          onChange={(evt) => {
            const copy = { ...currentEvent }
            copy.date = evt.target.value
            setCurrentEvent(copy)
          }}
        />
      </div>
      <div>
        <label htmlFor="time-input">Start Time:</label>
        <input
          type="time"
          id="time-input"
          value={currentEvent.start_time}
          onChange={(evt) => {
            const copy = { ...currentEvent }
            copy.start_time = evt.target.value
            setCurrentEvent(copy)
          }}
        />
      </div>
      <div>
        <label htmlFor="time-input">End Time:</label>
        <input
          type="time"
          id="time-input"
          value={currentEvent.end_time}
          onChange={(evt) => {
            const copy = { ...currentEvent }
            copy.end_time = evt.target.value
            setCurrentEvent(copy)
          }}
        />
      </div>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">description: </label>
          <input
            type="text"
            name="description"
            required
            autoFocus
            className="form-control"
            value={currentEvent.description}
            onChange={(evt) => {
              const copy = { ...currentEvent }
              copy.description = evt.target.value
              setCurrentEvent(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <legend htmlFor="type">Game:</legend>
          <select
            className="container"
            value={currentEvent.game.id}
            onChange={(evt) => {
              const copy = { ...currentEvent }
              copy.game = evt.target.value
              setCurrentEvent(copy)
            }}
          >
            {games.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault()

          const event = {
            name: currentEvent.name,
            location: currentEvent.location,
            date: currentEvent.date,
            start_time: currentEvent.start_time,
            end_time: currentEvent.end_time,
            description: currentEvent.description,
            game: parseInt(currentEvent.game.id),
          }

          // Send POST request to your API
          updateEvent(eventId, event).then(() => navigate("/events"))
        }}
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  )
}
