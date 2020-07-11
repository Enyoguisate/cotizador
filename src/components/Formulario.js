import React, { useState } from 'react';
import styled from '@emotion/styled';
import { 
    obtenerDiferenciaYear,
    obtener3PercPerYear,
    calcularTotal,
    obtenerPercPerMarca,
    obtenerPercPerPlan
} from '../helper';
import PropTypes from 'prop-types';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    --webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838f;
    font-size: 16px;
    width:100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;  
    font-weight: bold;
    border: none;
    transition: backgorud-color 1s ease;
    margin-top: 2rem;
    &:hover {
        cursor: pointer;
        background-color: #26C6FA
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
`;

const Formulario = ({setResumen, setCargando}) => {

    const [datos, guardarDatos] = useState({
        marca: '',
        year: '',
        plan: 'basico'
    });
    const [error, setError] = useState(false)

    // Extraer los valores del state
    const { marca, year, plan } = datos;

    const errorMsg = 'Todos los campos son obligatorios';

    // Leer los datos del form y pasarlos al state
    const obtenerDatos = (e) => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }
    
    // Cuando el usuario presiona submit
    const cotizarSeguro = (e) => {
        e.preventDefault();
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            setError(true);
            return;
        }
        setError(false);
        // Base seguro de 2000
        const resultado = 2000;
        // Obtener la diferencia de años
        const diferenciaYear = obtenerDiferenciaYear(year);
        // Por cada año hay que restar el 3%
        const descuentoYear = obtener3PercPerYear(diferenciaYear) ;
        // Americado 15%
        // Asiatico 5%
        // Europeo 30%
        const aumentoPerMarca = obtenerPercPerMarca(marca);
        // Basico aumenta 20%
        // Completo aumenta 50% 
        const aumetoPerPlan = obtenerPercPerPlan(plan);
        // Calcular total
        const total = calcularTotal(resultado, aumentoPerMarca, aumetoPerPlan, descuentoYear);
        setCargando(true);
        setTimeout(() => {
            setResumen({
                cotizacion: total,
                datos
            });
            setCargando(false);
        },3000);
    }

    return ( 
        <form onSubmit={cotizarSeguro}>
            { error ? <Error>{errorMsg}</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select name="marca" value={marca} onChange={obtenerDatos}>
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select name="year" value={year} onChange={obtenerDatos}>
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option> 
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio 
                    type="radio" 
                    name="plan" 
                    value="basico" 
                    checked={plan === "basico"}
                    onChange={obtenerDatos}
                /> Basico
                <InputRadio 
                    type="radio" 
                    name="plan" 
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerDatos}
                /> Completo
            </Campo>
            <Boton type="submit">Cotizar</Boton>
        </form>
     );
}

Formulario.propTypes = {
    setResumen: PropTypes.func.isRequired,
    setCargando: PropTypes.func.isRequired,
}

export default Formulario;