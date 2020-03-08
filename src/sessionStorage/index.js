const keys = {
  'TOKEN': 'TOKEN'
}
const getters = {
  GET_TOKEN() {
    return sessionStorage.getItem(keys['TOKEN'])
  },
}

const setters = {
  SET_TOKEN: (token) => {
    sessionStorage.setItem(keys['TOKEN'], token)
  }
}

export {
  getters,
  setters
}