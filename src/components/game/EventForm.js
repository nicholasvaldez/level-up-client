import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getGames } from "../../managers/GameManager.js"
import { createEvent } from "../../managers/EventManager.js"

export const EventForm = () => {
  const navigate = useNavigate()
  const [games, setGames] = useState([])

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentEvent, setCurrentEvent] = useState({
    name: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    game: 0,
  })

  useEffect(() => {
    // TODO: Get the games, then set the state ✅
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
            value={currentEvent.name}
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
            value={currentEvent.location}
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
          value={currentEvent.startTime}
          onChange={(evt) => {
            const copy = { ...currentEvent }
            copy.startTime = evt.target.value
            setCurrentEvent(copy)
          }}
        />
      </div>
      <div>
        <label htmlFor="time-input">End Time:</label>
        <input
          type="time"
          id="time-input"
          value={currentEvent.endTime}
          onChange={(evt) => {
            const copy = { ...currentEvent }
            copy.endTime = evt.target.value
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
            value={currentEvent.game}
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
            start_time: currentEvent.startTime,
            end_time: currentEvent.endTime,
            description: currentEvent.description,
            game: parseInt(currentEvent.game),
          }

          // Send POST request to your API
          createEvent(event).then(() => navigate("/events"))
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  )
}
