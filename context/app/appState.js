import React, { useReducer } from "react";
import {
  MOSTRAR_ALERTA,
  LIMPIAR_ALERTA,
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVOS_EXITO,
  SUBIR_ARCHIVOS_ERROR,
  CREAR_ENLACE_ERROR,
  CREAR_ENLACE_EXITO,
  LIMPIAR_STATE
} from "types";
import appContext from "./appContext";
import appReducer from "./appReducer";
import clienteAxios from "config/axios";
const AppState = ({ children }) => {
  const initialState = {
    mensaje_archivo: "",
    nombre: "",
    nombre_original: "",
    cargando: null,
    descargas: 1,
    password: "",
    autor: null,
    url: "",
  };

  //crear dispatcg y state

  const [state, dispatch] = useReducer(appReducer, initialState);

  // muestra una alert

  const mostrarAlerta = (msg) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg,
    });

    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  //Sube los archivos al servidor

  const subirArchivos = async (formData, nombreArchivo) => {-
    dispatch({
      type: SUBIR_ARCHIVO,
    });

    try {
      const resultado = await clienteAxios.post("/api/archivos", formData);

      dispatch({
        type: SUBIR_ARCHIVOS_EXITO,
        payload: {
          nombre: resultado.data.archivo,
          nombre_original: nombreArchivo,
        },
      });
    } catch (error) {
      dispatch({
        type: SUBIR_ARCHIVOS_ERROR,
        payload: error.response.data.msg,
      });
      console.log(error);
    }
  };

  //crea un enlace una vez que se subio el archivo
  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
      url: state.url,
    };

    try {
      const resultado = await clienteAxios.post("/api/enlaces", data);
      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: resultado.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };


  //const limpiar state

  const limpiarState = () => {
    dispatch({
        type: LIMPIAR_STATE,

    })
  }

  return (
    <appContext.Provider
      value={{
        mostrarAlerta,
        mensaje_archivo: state.mensaje_archivo,
        subirArchivos,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        crearEnlace,

        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,

        limpiarState
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
