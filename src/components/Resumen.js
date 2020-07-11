import React from "react";
import styled from "@emotion/styled";
import { capLetter } from "../helper";
import PropTypes from 'prop-types';

const ContenedorResumen = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838f;
  color: #fff;
  margin-top: 1rem;
`;

const Resumen = ({ datos }) => {
  // Extraer los datos
  const { marca, plan, year } = datos;
  const val = marca.trim() === "" || year.trim() === "" || plan.trim() === "";
  if (val) {
    return null;
  }
  return (
    <ContenedorResumen>
      <h2>Resumen de Cotizacion</h2>
      <ul>
        <li>Marca: {capLetter(marca)}</li>
        <li>Plan: {capLetter(plan)}</li>
        <li>Año: {year}</li>
      </ul>
    </ContenedorResumen>
  );
};

Resumen.propTypes = {
    datos: PropTypes.object.isRequired
}

export default Resumen;
