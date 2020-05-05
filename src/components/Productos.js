import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { obtenerProductosAction } from '../actions/productoActions'
import Producto from './Producto'
const Productos = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        // Consultar la API
        const cargarProductos = () => dispatch(obtenerProductosAction())
        cargarProductos()
        // eslint-disable-next-line
    }, [])

    const productos = useSelector(state => state.productos.productos)
    const error = useSelector(state => state.productos.error)
    const cargando = useSelector(state => state.productos.loading)

    return (
        <Fragment>
            <h2 className="text-center my-5">Listado Productos</h2>
            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
            {cargando ? <p className="text-center">Cargando..</p> : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length === 0 ? 'No hay productos' : (
                        productos.map(elm => (
                            <Producto
                                key={elm.id}
                                producto={elm}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
    )
}

export default Productos
