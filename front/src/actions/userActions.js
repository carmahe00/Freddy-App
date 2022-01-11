import axios from 'axios'
import types from '../types/userTypes'

const baseUrl = process.env.REACT_APP_API_URL

export const login = (email, password, type = "USER") => {
    return async (dispatch) => {
        try {
            dispatch({
                type: types.userLoginRequest
            })

            const { data } = await axios.post(type === "USER" ? `${baseUrl}/users/login` : `${baseUrl}/thirds/login`, { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            dispatch({
                type: types.userLoginSuccess,
                payload: data
            })

            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            console.log(error.response)
            switch (error.response.status) {
                case 400:
                    dispatch({
                        type: types.userLoginFail,
                        payload: 'Usuario o contraseña incorrecta'

                    })
                    break;

                default:
                    dispatch({
                        type: types.userLoginFail,
                        payload: 'Ocurrió un error de comunicación'
        
                    })
                    break;
            }


        }
    }
}

export const recoverPassword = (email) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: types.userRecoveryPasswordRequest
            })

            const { data } = await axios.post(`${baseUrl}/users/reset-password`, { email }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            dispatch({
                type: types.userRecoveryPasswordSuccess,
                payload: data
            })

        } catch (error) {

            dispatch({
                type: types.userRecoveryPasswordFail,
                payload: error.response && error.response.data
                    ? error.response.data.errores
                    : error.response.data

            })
        }
    }
}

export const requestChangePassword = (idUser, token, password) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: types.userRecoveryPasswordRequest
            })
            const { data } = await axios.post(`${baseUrl}/users/${idUser}`, { password }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })

            dispatch({
                type: types.userRecoveryPasswordSuccess,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: types.userRecoveryPasswordFail,
                payload: 'Algo salio mal'

            })
        }
    }
}

export const renewToken = () => {
    return async (dispatch, getState) => {
        try {

            const { userLogin: { userInfo } } = getState()
            const { data } = await axios.get(`${baseUrl}/users/renew`, {
                headers: {
                    'Authorization': `${userInfo.token}`
                }
            })

            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            localStorage.removeItem('userInfo')
            dispatch({ type: types.userLogout })
        }
    }

}

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('userInfo')
        dispatch({ type: types.userLogout })
    }
}
