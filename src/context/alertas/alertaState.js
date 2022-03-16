import React, { useReducer } from 'react';
import AlertaReducer from './alertaReducer';
import AlertaContext from './alertaContext';

import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from "../../types";

const AlertaState = props => {
    
    const initialState = {
        alerta: null
    }

    // dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer(AlertaReducer, initialState);

    // funciones
    const mostrarAlerta = (msg, categoria) => {
        
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg, 
                categoria
            }
        });

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            });
        }, 5000);
    };
    
    return (

        <AlertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            { props.children }
        </AlertaContext.Provider>

    );
}
 
export default AlertaState;