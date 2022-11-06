/* eslint-disable prefer-const */
import type { ConditionPost, QueryPost } from "src/types/producto.type.controller";
import prismaClient from "src/utils/prismaClient";
import { sendError } from "src/utils/sendMsg";
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
        try {
            const result = await producto.findUnique({ where: { id } });

            if (!result) {
                console.log(result);
                return 'Hola mundo';
                throw new Error("No se encontro ningun producto con ese id, intenta de nuevo");
            }
            return result;
        } catch (error) {
            return error;
        }
    },
    updateProducto: async () => { },
    deleteProducto: async () => { }
}

export default ProductoController;