import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createGame, getGameTypes } from "../../managers/GameManager.js"

export const GameForm = () => {
  const navigate = useNavigate()
  const [gameTypes, setGameTypes] = useState([])

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    skillLevel: "",
    numberOfPlayers: 0,
    name: "",
    maker: "",
    gameTypeId: 0,
  })

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGameTypes().then((data) => setGameTypes(data))
  }, [])

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.name}
            onChange={(evt) => {
              const copy = { ...currentGame }
              copy.name = evt.target.value
              setCurrentGame(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Maker: </label>
          <input
            type="text"
            name="maker"
            required
            autoFocus
            className="form-control"
            value={currentGame.maker}
            onChange={(evt) => {
              const copy = { ...currentGame }
              copy.maker = evt.target.value
              setCurrentGame(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="player">Number of Players: </label>
          <input
            type="number"
            min="1"
            max="8"
            name="maker"
            required
            autoFocus
            className="form-control"
            value={currentGame.numberOfPlayers}
            onChange={(evt) => {
              const copy = { ...currentGame }
              copy.numberOfPlayers = evt.target.value
              setCurrentGame(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <legend htmlFor="skill">Skill Level:</legend>
          <select
            className="container"
            value={currentGame.skillLevel}
            onChange={(evt) => {
              const copy = { ...currentGame }
              copy.skillLevel = evt.target.value
              setCurrentGame(copy)
            }}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
            <option>Advanced</option>
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <legend htmlFor="type">Game Type:</legend>
          <select
            className="container"
            value={currentGame.gameTypeId}
            onChange={(evt) => {
              const copy = { ...currentGame }
              copy.gameTypeId = evt.target.value
              setCurrentGame(copy)
            }}
          >
            {gameTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
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

          const game = {
            maker: currentGame.maker,
            name: currentGame.name,
            number_of_players: parseInt(currentGame.numberOfPlayers),
            skill_level: currentGame.skillLevel,
            game_type: parseInt(currentGame.gameTypeId),
          }

          // Send POST request to your API
          createGame(game).then(() => navigate("/"))
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  )
}
