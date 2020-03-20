const keys = {
  'TOKEN': 'TOKEN',
  'USERINFO': 'USERINFO'
}
const getters = {
  GET_TOKEN() {
    return sessionStorage.getItem(keys['TOKEN'])
  },
  GET_USERINFO() {
    let res = JSON.parse(sessionStorage.getItem(keys['USERINFO']))
    return res
  }
}

const setters = {
  SET_TOKEN: (token) => {
    sessionStorage.setItem(keys['TOKEN'], token)
  },
  SET_USERINFO: (USERINFO) => {
    sessionStorage.setItem(keys['USERINFO'], JSON.stringify(USERINFO))
  },
  SET_CLEAR: () => {
    sessionStorage.clear()
  }
}

export {
  getters,
  setters
}