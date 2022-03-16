import React, { useState, useContext, useEffect } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const FormTareas = () => {

    // obtener si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // obtener la funcion del context de tarea
    const tareasContext = useContext(TareaContext);
    const { errortarea, tareaseleccionada, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // effect que detecta si una tarea es seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            });
        }
    }, [tareaseleccionada])

    // state del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    });

    // extraer el nombre del proyecto
    const { nombre } = tarea;

    // sin no hay proyecto seleccionado
    if (!proyecto) return null;

    // array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = e => {
        e.preventDefault();

        // validar
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }

        // si es edicion o si es nueva tarea
        if(tareaseleccionada === null) {
            // agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // actualizar tarea existente
            actualizarTarea(tarea);

            // elimina la tarea seleccionada del state
            limpiarTarea();
        }


        // obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id);

        // reinciar al form
        guardarTarea({
            nombre: ''
        });
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        name="nombre"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        value={nombre}
                        onChange={handleChange}
                    />

                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : "Agregar Tarea" }
                    />
                </div>
            </form>

            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}

        </div>
    );
}

export default FormTareas;