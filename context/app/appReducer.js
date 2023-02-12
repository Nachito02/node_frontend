import { LIMPIAR_ALERTA, MOSTRAR_ALERTA, SUBIR_ARCHIVOS_ERROR, SUBIR_ARCHIVOS_EXITO, SUBIR_ARCHIVO } from "types"



export default (state,action) => {

    switch(action.type) {
            case MOSTRAR_ALERTA:
                    return {
                        ...state, mensaje_archivo: action.payload
                    }

                    case LIMPIAR_ALERTA: 
                    return {
                        ...state,  mensaje_archivo: null
                    }

                    case SUBIR_ARCHIVO:
                        return {
                            ...state, cargando :true
                        }

                    case SUBIR_ARCHIVOS_EXITO: 
                        return {
                            ...state, nombre : action.payload.nombre,
                                nombre_original : action.payload.nombre_original,
                                cargando :null
                        }

                        case SUBIR_ARCHIVOS_ERROR:
                                return {
                                    ...state, mensaje_archivo: action.payload,
                                    cargando :null
                                }

        default:    
            return state
    }

}