import React, { useReducer } from 'react';

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {

    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    // crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    // crear las funciones 

    // obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const respuesta = await clienteAxios.get('/api/tareas', { params: { proyecto }});

            dispatch({
                type: TAREAS_PROYECTO,
                payload: respuesta.data.tareas
            });

        } catch (error) {
            console.log(error.response)
        }
    };

    // agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try {
            const respuesta = await clienteAxios.post('/api/tareas', tarea);
        
            dispatch({
                type: AGREGAR_TAREA,
                payload: respuesta.data.tarea
            });

        } catch (error) {
            console.log(error.response);
        }
    };

    // valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    };

    // eliminar una tarea por su ID
    const eliminarTarea = async (id, proyecto) => {
        try {
            const respuesta = await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });

            console.log(respuesta.data)
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });

        } catch (error) {
            console.log(error.response)
        }
    };

    // edita o modifica una tarea
    const actualizarTarea = async tarea => {
        // console.log('Desde actualizar tarea:', tarea)

        try {
            const respuesta = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: respuesta.data.tarea
            });

        } catch (error) {
            console.log(error.response)
        }
    };

    // extrae una tarea para su edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    };

    // elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        });
    };

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea, 
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;