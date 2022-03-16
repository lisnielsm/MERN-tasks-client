import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    // obtener si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // obtener la funcion del context de tarea
    const tareasContext = useContext(TareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    // extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // funcion que se ejecuta cuando el usuario presiona el boton de eliminar tarea
    const onClickEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    }

    // funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        // console.log('Desde cambiar estado:', tarea)
        if(tarea.estado === true){
            // console.log("Entro en el estado TRUE")
            tarea.estado = false;
        } else {
            // console.log("Entro en el estado FALSE")
            tarea.estado = true;
        }
        // console.log('Desde cambiar estado:', tarea)

        actualizarTarea(tarea);
    }

    // agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">

            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado === true ?
                    (
                        <button
                            type="button" 
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                    :
                    (
                        <button
                            type="button" 
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => onClickEliminar(tarea._id)}
                >Eliminar</button>
            </div>

        </li>
     );
}

Tarea.propTypes = {
    tarea: PropTypes.object.isRequired
}
 
export default Tarea;