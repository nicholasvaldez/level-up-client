import { useNavigate } from "react-router-dom"

export const getGames = () => {
  return fetch("http://localhost:8000/games", {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json())
}

export const getSingleGame = (id) => {
  return fetch(`http://localhost:8000/games/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json())
}

export const createGame = (game) => {
  return fetch("http://localhost:8000/games", {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(game),
  }).then((response) => response.json())
}

export const getGameTypes = () => {
  return fetch("http://localhost:8000/gametypes", {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json())
}

export const updateGame = (id, game) => {
  return fetch(`http://localhost:8000/games/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(game),
  })
}

export const deleteGame = (id) => {
  return fetch(`http://localhost:8000/games/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  })
}
