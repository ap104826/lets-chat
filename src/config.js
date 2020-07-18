export default {
    API_ENDPOINT: process.env.NODE_ENV === 'production' ?
        'https://frozen-sierra-48295.herokuapp.com' : 'http://localhost:8001',
    TOKEN_KEY: 'letschat-client-auth-token',
    USERNAME_KEY: 'letschat-username',
}