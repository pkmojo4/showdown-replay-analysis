// Imports
const tools = require("./tools")
const showdown = require("pokemon-showdown")

// Globals
const dex = showdown.Dex

// Run main function (hoisted)
const done = main().catch(console.error)

function getMostCommonType(typeDict) {
  let mostCommonType = ''
  let mostCommonCount = 0;
  for (let moveType in typeDict) {
    const count = typeDict[moveType]
    if (count > mostCommonCount) {
      mostCommonCount = count;
      mostCommonType = moveType;
    }
  }
  return {type: mostCommonType, count: mostCommonCount}
}

async function main() {

  // Get a single replay
  const replayID = "gen8vgc2021-1223042570"
  const replay = await tools.fetchReplay(replayID)
  
  // Split the match log into an array of arrays
  const lines = replay.log
    .split("\n")
    .map(line => line.split("|").slice(1))
  
  let players = {
    p1: {},
    p2: {},
  }
  for (let a = 0; a < lines.length; a++) {
    const row = lines[a];
    if (row[0] === 'move') {
      const name = row[2];
      const entry = dex.getMove(name);
      const player = row[1].substring(0, 2);
      if (!(entry.type in players[player])) {
        players[player][entry.type] = 0;
      }
      players[player][entry.type]++;
    }
  }
  console.log(players);
  const p1 = getMostCommonType(players.p1)
  console.log(`Player ${replay.p1} mostly used ${p1.type} type moves ${p1.count} times`)
  const p2 = getMostCommonType(players.p2)
  console.log(`Player ${replay.p2} mostly used ${p2.type} type moves ${p2.count} times`)
}
