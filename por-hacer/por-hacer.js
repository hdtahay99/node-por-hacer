const fs = require('fs');


let listadoPorHacer = [];


const guardarDB = async() => {
    let data = JSON.stringify(listadoPorHacer);

    const res = fs.writeFile(`db/data.json`, data, (error => error));

    if (!res) return `Se guardó exitosamente la tarea por hacer`;
    else
        throw new Error(`No se pudo guardar la tarea por hacer`);

}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;

}

const getListado = () => {

    cargarDB();
    return listadoPorHacer;


}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {

        listadoPorHacer[index].completado = completado;
        guardarDB();

        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return 'borrado';
    } else {
        return false;
    }



}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}