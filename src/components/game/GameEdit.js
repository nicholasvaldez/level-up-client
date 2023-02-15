import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  createGame,
  getGameTypes,
  getSingleGame,
  updateGame,
} from "../../managers/GameManager.js"

export const EditGameForm = () => {
  const navigate = useNavigate()
  const [gameTypes, setGameTypes] = useState([])
  const { gameId } = useParams()

  const [currentGame, setCurrentGame] = useState({
    skill_level: "",
    number_of_players: 0,
    name: "",
    maker: "",
    game_type: 0,
  })
  useEffect(() => {
    getSingleGame(`${gameId}`).then((data) => setCurrentGame(data))
  }, [gameId])

  useEffect(() => {
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
            defaultValue={currentGame.name}
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
            defaultValue={currentGame.maker}
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
            value={currentGame.number_of_players}
            onChange={(evt) => {
              const copy = { ...currentGame }
              copy.number_of_players = evt.target.value
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
            value={currentGame.skill_level}
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
            value={currentGame.game_type}
            onChange={(evt) => {
              const copy = { ...currentGame }
              copy.game_type = evt.target.value
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
            number_of_players: parseInt(currentGame.number_of_players),
            skill_level: currentGame.skill_level,
            game_type: parseInt(currentGame.game_type),
          }

          updateGame(gameId, game).then(() => navigate("/"))
        }}
        className="btn btn-primary"
      >
        submit
      </button>
    </form>
  )
}
