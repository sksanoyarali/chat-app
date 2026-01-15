export const HOST = import.meta.env.VITE_SERVER_URL

export const AUTH_ROUTE = '/api/auth'
export const SIGNUP_ROUTE = `${HOST}${AUTH_ROUTE}/signup`
export const LOGIN_ROUTE = `${HOST}${AUTH_ROUTE}/login`
export const GET_USER_INFO = `${HOST}${AUTH_ROUTE}/user-info`
