export default {
    API_ENDPOINT: process.env.NODE_ENV === 'production' ?
        'https://frozen-sierra-48295.herokuapp.com/api' : 'http://localhost:8001/api',
    TOKEN_KEY: 'letschat-client-auth-token',
}