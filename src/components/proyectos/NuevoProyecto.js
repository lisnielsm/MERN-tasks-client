import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);

    // extraer los estados
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    // state del proyecto
    const [proyecto, guardarProyecto ] = useState({
        id: '',
        nombre: ''
    });

    // extraer nombre del proyecto
    const { nombre } = proyecto;

    // lee el contenido del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        });
    };

    const onSubmitProyecto = e => {
        e.preventDefault();

        // validar el proyecto
        if(nombre.trim() === '') {
            mostrarError();
            return;
        }

        // agregar al state
        agregarProyecto(proyecto);

        // reiniciar el form
        guardarProyecto({
            ...proyecto,
            [nombre]: ''
        });
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-primario btn-block"
                onClick={() => mostrarFormulario()}
            >Nuevo Proyecto</button>

            { formulario ?
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre Proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />

                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar Proyecto"
                        />
                    </form>
                )
                : null }

            { errorformulario ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null }
        </Fragment>
    );
}

export default NuevoProyecto;