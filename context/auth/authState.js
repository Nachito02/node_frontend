import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
    REGISTRO_ERROR,
    REGISTRO_EXITOSO,
    USUARIO_AUTENTICADO,
    LIMPIAR_ALERTA
} from "types";
import clienteAxios from "config/axios";


const AuthState = ({ children }) => {
    //definir un state inciial
    const initialState = {
        token: '',
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
    const iniciarSesion = async () => {
        
    }


    //usuario autenticado

    const usuarioAutenticado = nombre => {
        dispatch({
            type: USUARIO_AUTENTICADO,
            payload: nombre
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
                iniciarSesion

            }}
        >

            {children}
        </authContext.Provider>

    )
}


export default AuthState