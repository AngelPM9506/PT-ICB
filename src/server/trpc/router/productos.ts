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
            Descripcion: z.string(),
            Inventario: z.string(),
            Precio: z.string(),
            unidad: z.string()
        }))
        .mutation(({ input }) => {
            console.log(input);
            const query = {
                nombre: input.nombre,
                Descripcion: input.Descripcion,
                Inventario: parseInt(input.Inventario),
                Precio: parseFloat(input.Precio),
                unidad: input.unidad,
            }
            const result = ProductoController.newProducto(query);
            console.log(result);

            return result;
        })
});