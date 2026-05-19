/*
const script = document.createElement('script');
script.src = 'https://kit.fontawesome.com/682ebe0ed2.js';
script.crossOrigin = 'anonymous';
document.head.appendChild(script);
*/

function relocate(elementQuery, destinationQuery) {
  const el = document.querySelector(elementQuery);
  const target = document.querySelector(destinationQuery);
  if (el && target) target.appendChild(el);
}

function append(parentQuery, nodeClass) {
  const el = document.querySelector(parentQuery);
  const child = document.createElement("div");
  child.classList.add(nodeClass)
  if (el) el.appendChild(child);
}

async function fetchLichessUser() {
  const username = document.body.dataset.username;
  if (!username) return null; // not logged in

  const res = await fetch(`/api/user/${username}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data;
}


relocate('.lobby__tv', '.lobby__side')
relocate('.lobby__puzzle', '.lobby__start')

document.body.classList.add("loaded")

fetchLichessUser().then(data => {
  console.log(data)

  const ratings = document.createElement("div")
  ratings.classList.add("x__home_ratings")

  for (const mode of Object.keys(data.perfs).sort((a, b) => {
    const hasRating = p => p.rating !== undefined && p !== data.perfs.puzzle
    if (hasRating(data.perfs[a]) !== hasRating(data.perfs[b]))
      return hasRating(data.perfs[b]) ? 1 : -1
    const games = p => p.games ?? p.runs ?? 0
    return games(data.perfs[b]) - games(data.perfs[a])
  })) {
    if (!modes[mode]) continue

    const perf = data.perfs[mode]

    if (perf.games == 0) continue

    const modeDOM = document.createElement("a")
    modeDOM.classList.add("mode")
    modeDOM.href = `https://lichess.org/@/${document.body.dataset.username}/perf/${mode}`

    const name = document.createElement("span")
    name.classList.add("name")
    const icon = document.createElement("span")
    icon.classList.add("icon")
    const rating = document.createElement("span")
    rating.classList.add("rating")

    name.innerText = modes[mode].name
    icon.innerText = modes[mode].glyph

    if (perf.rating !== undefined) {
      rating.innerText = perf.prov === true ? `${perf.rating}?` : `${perf.rating}`
    } else if (perf.runs !== undefined) {
      rating.innerText = `${perf.score}`
    }

    if (perf.prog !== undefined && perf.prog !== 0) {
      const ratingProgress = document.createElement(perf.prog >= 0 ? "good" : "bad")
      ratingProgress.classList.add("progress_container")
      ratingProgress.innerText = Math.abs(perf.prog)

      rating.append(ratingProgress)
    }

    modeDOM.append(name, icon, rating)
    ratings.appendChild(modeDOM)

    document.querySelector("main.lobby").append(ratings)
  }
})

const modes = {
  antichess: {
    name: "Antichess",
    glyph: ""
  },
  atomic: {
    name: "Atomic",
    glyph: ""
  },
  blitz: {
    name: "Blitz",
    glyph: ""
  },
  bullet: {
    name: "Bullet",
    glyph: ""
  },
  chess960: {
    name: "Chess960",
    glyph: ""
  },
  classical: {
    name: "Classical",
    glyph: ""
  },
  correspondence: {
    name: "Correspondence",
    glyph: ""
  },
  crazyhouse: {
    name: "Crazyhouse",
    glyph: ""
  },
  horde: {
    name: "Horde",
    glyph: ""
  },
  kingOfTheHill: {
    name: "King of the Hill",
    glyph: ""
  },
  puzzle: {
    name: "Puzzle",
    glyph: ""
  },
  racer: {
    name: "Racer",
    glyph: ""
  },
  racingKings: {
    name: "Racing Kings",
    glyph: ""
  },
  rapid: {
    name: "Rapid",
    glyph: ""
  },
  storm: {
    name: "Storm",
    glyph: ""
  },
  streak: {
    name: "Streak",
    glyph: ""
  },
  threeCheck: {
    name: "Three Check",
    glyph: ""
  },
  ultraBullet: {
    name: "UltraBullet",
    glyph: ""
  }
}