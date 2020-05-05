import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
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

        try {
            const respuesta = await axios.get('/productos')
            dispatch(descargarProductosExitosa(respuesta.data))

        } catch (error) {
            dispatch(descargarProductosError())

        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargarProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})
const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})


export const borrarProductoAction = id => {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))

        try {
            await axios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())
            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado',
                'El producto se eliminó correctamente',
                'success'
            )

        } catch (error) {
            console.log(error)
            dispatch(eliminarProductoError())
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

export const obtenerProductoEditar = producto => {
    return (dispatch) => {
        dispatch(obtenerProductosEditarAction(producto))
    }
}

const obtenerProductosEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

export const editarProductoAction = producto => {
    return async (dispatch) => {
        dispatch(editarProducto())

        try {
            await axios.put(`/productos/${producto.id}`, producto)
            dispatch(editarProductoExito(producto))
        } catch (error) {
            console.log(error)
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = producto => ({
    type: COMENZAR_EDICION_PRODUCTO,
})
const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})
const editarProductoError = producto => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})