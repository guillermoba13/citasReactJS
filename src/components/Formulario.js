import React, {Fragment, useState} from 'react';
import uuid from 'uuid/v4';//Genera automaticamente un ID
import PropTypes from 'prop-types'

const Formulario = ({crearCita}) => {
    // crear state de citas
    const [cita, actualizarCita]=useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    })

    //crear state para la validacion del formulario
    const [error, actualizarError] = useState(false)

    //functionque se ejecuta cada que el usuario escribe en un input
    const actualizaState = e=>{
        actualizarCita({
            ...cita,
            [e.target.name]:e.target.value
        })
    }

    //Extraemos los valores del state
    const{mascota, propietario, fecha, hora, sintomas}=cita;

    //cuando el usuario presiona el boton
    const submitCita = e =>{
        e.preventDefault();
        
        //Validar Formulario
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' ||
            sintomas.trim() === ''){
                actualizarError(true);
                return;
        }else{actualizarError(false);}

        //Asignar un ID
        cita.id = uuid();
        
        //Crear la cita
        crearCita(cita);
        
        //Reiniciar el form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })

    }
    return (
        <Fragment>
            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
            <form onSubmit={submitCita}>
                <label>Nombre Mascota 🐶🐺🐱🦁🐯</label>
                    <input
                        type="text"
                        name="mascota"
                        className="u-full-width"
                        placeholder="Nombe Mascota"
                        onChange={actualizaState}
                        value={mascota}
                    />
                <label>Nombre Dueño 👨👩👶👵</label>
                    <input
                        type="text"
                        name="propietario"
                        className="u-full-width"
                        placeholder="Nombe Dueño de la mascota"
                        onChange={actualizaState}
                        value={propietario}
                    />
                <label>Fecha 📅</label>
                    <input
                        type="date"
                        name="fecha"
                        className="u-full-width"
                        onChange={actualizaState}
                        value={fecha}
                    />
                <label>Hora 🔃</label>
                    <input
                        type="time"
                        name="hora"
                        className="u-full-width"
                        onChange={actualizaState}
                        value={hora}
                    />
                <label>Sìntomas 🥴</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizaState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
};
Formulario.propTypes={
    crearCita: PropTypes.func.isRequired
}
export default Formulario;