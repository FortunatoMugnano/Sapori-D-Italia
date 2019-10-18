const remoteURL = "http://localhost:5002";

export default {
  addUser(newUser) {
    return fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(data => data.json())
  },
  searchUsername(userName) {
    return fetch(`${remoteURL}/users?userName=${userName}`)
    .then(e => e.json()
    )
  }
}