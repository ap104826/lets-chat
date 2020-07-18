import config from './config'

const TokenService = {
    saveAuthToken(token) {
        window.localStorage.setItem(config.TOKEN_KEY, token)
    },
    saveUser(userName) {
        window.localStorage.setItem(config.USERNAME_KEY, userName)
    },
    getAuthToken() {
        return window.localStorage.getItem(config.TOKEN_KEY)
    },
    getUserName() {
        return window.localStorage.getItem(config.USERNAME_KEY)
    },
    clearAuthToken() {
        window.localStorage.removeItem(config.TOKEN_KEY)
    },
    clearUser() {
        window.localStorage.removeItem(config.USERNAME_KEY)
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken()
    },
    makeBasicAuthToken(userName, password) {
        return window.btoa(`${userName}:${password}`)
    },
}

export default TokenService