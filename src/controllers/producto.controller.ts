/* eslint-disable prefer-const */
import type { ConditionPost, ConditionPut, QueryPost, QueryUpdate } from "src/types/producto.type.controller";
import prismaClient from "src/utils/prismaClient";
const { producto } = prismaClient;

const ProductoController = {
    getProductos: async () => {
        try {
            const result = await producto.findMany();
            return result;
        } catch (error) {
            return error;
        }
    },
    newProducto: async (query: QueryPost) => {
        let { nombre, Descripcion, Inventario, Precio, unidad } = query;
        if (!nombre || !Descripcion || !Inventario || !Precio || !unidad) {
            throw new Error("Datos no Validos intenta de nuevo");
        }
        const slug = `${nombre.toString().trim().split(' ').join('').toUpperCase()}-PRODUCTO`;
        Precio = unidad === 'P' ? (parseFloat(Precio.toString()) * 100) : parseFloat(Precio.toString());
        const datos: ConditionPost = {
            data: {
                nombre: nombre.toString().trim(),
                slug,
                Descripcion: Descripcion.toString().trim(),
                Inventario: parseInt(Inventario.toString()),
                Precio: Precio
            }
        }
        try {
            const result = producto.create(datos);
            return result;
        } catch (error) {
            return error;
        }
    },
    getProducto: async (id: string | undefined) => {
        const result = await producto.findUnique({ where: { id } });
        if (result === null) {
            throw new Error('Error al encontrar producto');
        }
        try {
            return result;
        } catch (error) {
            return error;
        }
    },
    updateProducto: async (query: QueryUpdate) => {
        let { id, nombre, Descripcion, Inventario, Precio, unidad } = query;
        if ((!id || id === undefined) &&
            (!nombre || nombre === undefined) &&
            (!Descripcion || Descripcion === undefined) &&
            (!Inventario || Inventario === undefined) &&
            (!Precio || Precio === undefined) &&
            (!unidad || unidad === undefined)) {
            throw new Error('Sin datos, intenta de nuevo');
        }
        if (!id) {
            throw new Error("Es obligatorio el id");

        }
        const idToUpdate = id.toString();
        if (Precio !== undefined) {
            Precio = unidad === 'P' ? (parseFloat(Precio.toString()) * 100) : parseFloat(Precio.toString());
        }
        const slug = nombre !== undefined ? `${nombre.toString().trim().split(' ').join('').toUpperCase()}-PRODUCTO` : undefined;
        const conditionPut: ConditionPut = {
            where: { id: idToUpdate },
            data: {
                nombre: nombre !== undefined ? nombre.toString() : undefined,
                slug,
                Descripcion: Descripcion !== undefined ? Descripcion.toString() : undefined,
                Inventario: Inventario !== undefined ? parseInt(Inventario.toString()) : undefined,
                Precio: Precio
            }
        }
        try {
            const result = producto.update(conditionPut);
            return result;
        } catch (error) {
            return error
        }
    },
    deleteProducto: async (id: string | undefined) => {
        try {
            const resp = await producto.delete({ where: { id } })
            return resp;
        } catch (error) {
            return error;
        }
    }
}

export default ProductoController;