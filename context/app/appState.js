import React,{useReducer} from 'react'
import { MOSTRAR_ALERTA, LIMPIAR_ALERTA, SUBIR_ARCHIVO, SUBIR_ARCHIVOS_EXITO,SUBIR_ARCHIVOS_ERROR,CREAR_ENLACE_ERROR,CREAR_ENLACE_EXITO } from 'types'
import appContext from './appContext'
import appReducer from './appReducer'
import clienteAxios from 'config/axios'
const AppState = ({children}) => { 

    const initialState = {
        mensaje_archivo : '',
        nombre: '',
        nombre_original: '',
        cargando: null
    }


    //crear dispatcg y state

    const [state,dispatch] = useReducer(appReducer, initialState)

    // muestra una alert

    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        })

        setTimeout(() =>{
            dispatch({
                type: LIMPIAR_ALERTA,
            
            })
        },3000)
    }


    //Sube los archivos al servidor

    const subirArchivos = async (formData, nombreArchivo) => { 

        dispatch({
            type: SUBIR_ARCHIVO,
        })

           try{
            const resultado = await clienteAxios.post("/api/archivos", formData);


            dispatch({
                type:SUBIR_ARCHIVOS_EXITO,
                payload : {
                    nombre: resultado.data.archivo,
                    nombre_original: nombreArchivo
                }
            })
 
           } catch(error) {
                dispatch({
                    type:SUBIR_ARCHIVOS_ERROR,
                    payload: error.response.data.msg
                })
            console.log(error)
           }
     }

     const crearEnlace = () => {
        console.log("creando el enlace");
      };

    return (
        <appContext.Provider value={{
            mostrarAlerta,
            mensaje_archivo : state.mensaje_archivo ,
            subirArchivos,
            nombre : state.nombre,
            nombre_original: state.nombre_original,
            cargando: state.cargando,
            crearEnlace
        }}>

        {children}
        </appContext.Provider>
    )
 }

 export default AppState