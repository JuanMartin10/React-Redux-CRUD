import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR
} from '../types'

import axios from '../config/axios'
import Swal from 'sweetalert2'

// Crear nuevos productos
export const crearNuevoProductoAction = (producto) => {
    return async (dispatch) => {
        dispatch(agregarProducto())

        try {
            // Insertar en la API
            await axios.post('/productos', producto)

            // Actualiza el state
            dispatch(agregarProductoExito(producto))

            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error)

            // Actualiza el state
            dispatch(agregarProductoError(true))

            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intentalo de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

export const obtenerProductosAction = () => {
    return async (dispatch) => {
        dispatch(descargarProductos())
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})