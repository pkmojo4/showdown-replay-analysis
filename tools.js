const fetch = require("node-fetch")

const REPLAY_URL = "https://replay.pokemonshowdown.com"

/*
 * Fetches the replay metadata and log as JSON. 
 */
async function fetchReplay(replayID) {
  const url = `${REPLAY_URL}/${replayID}.json`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch replay: ${url}`)
  }
  const replay = res.json()
  return replay
}

/*
 * Fetches multiple replays as a JSON array. 
 */
async function fetchAllReplays(replayIDList) {
  return Promise.all(replayIDList.map(fetchReplay))
}

module.exports = { fetchReplay, fetchAllReplays }
