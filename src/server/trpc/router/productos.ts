import ProductoController from "src/controllers/producto.controller";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";


export const productosRouter = router({
    allProductos: publicProcedure
        .input(z.object({ take: z.number().nullish() }).nullish())
        .query(({ input }) => {
            const take = input?.take;
            const productos = ProductoController.getProductos(take);
            return productos
        }),
    newProducto: publicProcedure
        .input(z.object({
            nombre: z.string(),
            Descripcion: z.string().nullable(),
            Inventario: z.number(),
            Precio: z.number(),
            unidad: z.string().nullable()
        }))
        .query(({ input }) => {
            const query = {
                nombre: input.nombre,
                Descripcion: input.Descripcion,
                Inventario: input.Inventario,
                Precio: input.Precio,
                unidad: input.unidad,
            }
            const result = ProductoController.newProducto(query);
            return result
        })
});