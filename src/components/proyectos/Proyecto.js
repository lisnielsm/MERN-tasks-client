import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    // obtener el state de los proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    // obtener la funcion del context de tarea
    const tareasContext = useContext(TareaContext);
    const { obtenerTareas } = tareasContext;

    // funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); // Fijar un proyecto actual
        obtenerTareas(id);  // Filtrar las tareas cuando se de click
    }

    return ( 
        <li>
            <button 
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}

Proyecto.propTypes = {
    proyecto: PropTypes.object.isRequired
}
 
export default Proyecto;