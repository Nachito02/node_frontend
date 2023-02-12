import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
    REGISTRO_ERROR,
    REGISTRO_EXITOSO,
    USUARIO_AUTENTICADO,
    LIMPIAR_ALERTA,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    CERRAR_SESION
} from "types";

import clienteAxios from "config/axios";
import tokenAuth from "config/tokenAuth";

const AuthState = ({ children }) => {
    //definir un state inciial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token'): '',
        autenticado: null,
        usuario: null,
        mensaje: null,
    }
    //definir el reducer

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Registrar nuevos usuarios

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            })

        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }

            //LIMPIAR ALERTA DESPUES DE 3SEGUNDOS
        setTimeout(()=> {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000 )
    }


    //autenticar usuarios
    const iniciarSesion = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/auth',datos)
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }

         //LIMPIAR ALERTA DESPUES DE 3SEGUNDOS
         setTimeout(()=> {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000 )
    }


    //retorne el usuario autenticado segun token

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token')
        if(token) {
            tokenAuth(token)
        }  
            try {
                const respuesta = await clienteAxios.get('/api/auth')
                console.log(respuesta)
                if(respuesta.data.usuario) {
                    dispatch({
                        type: USUARIO_AUTENTICADO,
                        payload:respuesta.data.usuario,
                     
                    })
                }

            } catch (error) {
                console.log(error)
            }
    }


    //cerrar la sesion 

    const cerrarSesion = () => {
        dispatch({
            type:CERRAR_SESION
        })
    }

  

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                usuarioAutenticado,
                registrarUsuario,
                iniciarSesion,
                cerrarSesion

            }}
        >

            {children}
        </authContext.Provider>

    )
}


export default AuthState