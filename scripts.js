/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","reddit":"https://reddit.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"5lgCvbGiyK5F4JFy","label":"Media","bookmarks":[{"id":"ztDylUOOCgLFQY7i","label":"YouTube","url":"https://youtube.com"},{"id":"qTs9EeVqpFsK1gAd","label":"Discord","url":"discord:"},{"id":"6Uemy7hvwQd6Uu2U","label":"Reddit","url":"https://reddit.com/"}]},{"id":"H0L2VeVwnkApBnVY","label":"Personal","bookmarks":[{"id":"PPpdbemwgEavZZP4","label":"Email","url":"mailspring:"},{"id":"4pIHeLFp8ByofiKX","label":"iCloud","url":"https://icloud.com/"}]},{"id":"cbvNn11oEsR2qEfV","label":"Developing","bookmarks":[{"id":"S9VOrl4rz30DLFKs","label":"GitHub","url":"https://github.com/"},{"id":"OlPr7hdPIR6Uo6CE","label":"DevDocs","url":"https://devdocs.io/"},{"id":"zNHjrRpxapXXLAee","label":"Roblox Docs","url":"https://create.roblox.com/docs"}]},{"id":"kJPgxFgTOMELBesq","label":"School 👎","bookmarks":[{"id":"bn4FCbdrvNyDhutC","label":"SmartMusic","url":"https://home.smartmusic.com/"},{"id":"UE6NKKUwSQVgj3gh","label":"ClassLink","url":"https://launchpad.classlink.com/rrisd"},{"id":"2MMc39Ekl1h1pfiI","label":"Schoology","url":"https://app.schoology.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
