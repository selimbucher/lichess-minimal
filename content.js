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



relocate('.lobby__tv', '.lobby__side')
relocate('.lobby__puzzle', '.lobby__start')

document.body.classList.add("loaded")