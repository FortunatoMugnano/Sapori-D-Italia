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
  },
  getUserById(id) {
    return fetch(`${remoteURL}/users/${id}`)
      .then(result => result.json());
  },
  getMessages() {
    return fetch(
      `${remoteURL}/messages/?&_sort=date&_order=asc&_expand=user`
    ).then(response => response.json());
  },
  deleteMessages(id) {
    return fetch(`${remoteURL}/messages/${id}`, {
      method: 'DELETE'
    }).then(result => result.json());
  },
  postMessages(newMessage) {
    return fetch(`${remoteURL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
    }).then(data => data.json());
  },
  updateMessages(editedMessage) {
    return fetch(`${remoteURL}/messages/${editedMessage.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedMessage)
    }).then(data => data.json());
  },
  getMessagesById(id) {
    return fetch(`${remoteURL}/messages/${id}`)
      .then(result => result.json());
  }
}