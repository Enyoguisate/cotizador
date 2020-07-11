export function obtenerDiferenciaYear(year) {
    const thisYear = new Date().getFullYear();
    let diferencia = 0;
    if (year >= thisYear) {
        return diferencia;
    } else {
        return thisYear - year;
    }
}

export function obtener3PercPerYear(diferencia) {
    if(diferencia === 0){
        return 0;
    } else {
        return diferencia * 3;
    }
}

export function obtenerPercPerMarca(marca) {
    switch (marca) {
        case 'americano':
            return 15;
        break;
        case 'asiatico':
            return 5;
        break;
        case 'europeo':
            return 30;
        break;
    }
}

export function obtenerPercPerPlan(plan) {
    switch (plan) {
        case 'basico':
            return 20;
        break;
        case 'completo':
            return 50;
        break;
    }
}

export function calcularTotal(base, aumentoMarca, aumentoPlan, descuentoYear) {
    return parseFloat(base * (100 + aumentoMarca + aumentoPlan - descuentoYear) / 100).toFixed(2);
}

// Muestra Letra capital
export function capLetter(texto) {
    return texto.charAt(0).toUpperCase()+texto.slice(1);
}
