const remoteURL = "http://localhost:5001";

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
  },
  getRegions() {
    return fetch (
      `${remoteURL}/regions`
    ).then(response => response.json());
  },
  getRegionsById(id) {
    return fetch (
      `${remoteURL}/regions/${id}`
    ).then(response => response.json());
  },
  getRecipesByRegionId(id) {
    return fetch (
      `${remoteURL}/myRecipes/?regionId=${id}&_expand=user`
    ).then(response => response.json());
  },
  getMyRecipes(userId) {
    return fetch (
      `${remoteURL}/userRecipes?userId=${userId}&_expand=myRecipe`
    ).then(response => response.json());
  },
  getMyRecipesWithUser() {
    return fetch (
      `${remoteURL}/userRecipes?_expand=user`
    ).then(response => response.json());
  },
  deleteRecipeFromCookbook(id) {
    return fetch(`${remoteURL}/userRecipes/${id}`, {
      method: 'DELETE'
    }).then(result => result.json());
  },
  addRecipeToYourCookbook(recipe) {
    return fetch(`${remoteURL}/userRecipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe)
    }).then(data => data.json())
  },
  postRecipe(newRecipeObj) {
    return fetch(`${remoteURL}/myRecipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newRecipeObj)
    }).then(data => data.json())
  },
  deleteRecipe(id) {
    return fetch(`${remoteURL}/myRecipes/${id}`, {
      method: 'DELETE'
    }).then(result => result.json());
  },
  updateRecipe(editedRecipe) {
    return fetch(`${remoteURL}/myRecipes/${editedRecipe.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedRecipe)
    }).then(data => data.json());
  },
  getSingleRecipe(id) {
    return fetch(`${remoteURL}/myRecipes/${id}`)
            .then(result => result.json())
  },
  searchMyRecipeId(myRecipeId, userId) {
    return fetch(`${remoteURL}/userRecipes?myRecipeId=${myRecipeId}&userId=${userId}`)
      .then(e => e.json()
      )
  },
  getCookBookRecipe(userId) {
    return fetch (
      `${remoteURL}/userRecipes?userId=${userId}`
    ).then(response => response.json());
  },
  getOneRecipe(id) {
    return fetch (
      `${remoteURL}/myRecipes?${id}_expand=user`
    ).then(response => response.json());
  },
  patch(id, obj) {
    return fetch(`${remoteURL}/myRecipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(data => data.json());
  }
}