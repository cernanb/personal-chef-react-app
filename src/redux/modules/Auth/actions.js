import AuthService from '../../../services/AuthService'
import ApiService from '../../../services/Api'
import { reset } from 'redux-form'

export const authenticating = () => ({type: 'AUTHENTICATING'})

export const setUser = (user) => ({type: 'AUTH_COMPLETE', user})

export const authenticationFailure = (errors) => ({type: 'AUTH_FAILURE', errors})

export const logout = (router) => {
  localStorage.removeItem('token')
  return { type: 'LOGOUT' }
}

export const authenticate = () => {
  return dispatch => {
    dispatch(authenticating())
    return ApiService.post(`/auth/refresh`)
      .then(currentUser => {
        const { user, token } = currentUser
        localStorage.setItem('token', JSON.stringify(token))
        dispatch(setUser(user))
      })
  }
}

export const signup = (data, history) => {
  return dispatch => {
    dispatch(authenticating())
    ApiService.post('/users', data)
      .then(currentUser => {
        const { user, token } = currentUser
        localStorage.setItem('token', JSON.stringify(token))
        dispatch(setUser(user))
        dispatch(reset('signup'))
        history.replace('/households')
      })
  }
}

export const login = (params, history) => {
  return dispatch => {
    dispatch(authenticating())
    ApiService.post('/auth', params)
      .then(currentUser => {
        const { user, token } = currentUser
        localStorage.setItem('token', JSON.stringify(token))
        dispatch(setUser(user))
        dispatch(reset('login'))
        history.replace('/households')
      })
  }
}