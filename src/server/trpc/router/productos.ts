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
            const query = {
                nombre: input.nombre,
                Descripcion: input.Descripcion,
                Inventario: parseInt(input.Inventario),
                Precio: parseFloat(input.Precio),
                unidad: input.unidad,
            }
            const result = ProductoController.newProducto(query);
            return result;
        }),
    getProducto: publicProcedure
        .input(z.object({ slug: z.string().nullish() }).nullish())
        .query(async ({ input }) => {
            const slug = input?.slug;
            const result = await ProductoController.getProducto(slug);
            return result;
        }),
    updateProducto: publicProcedure
        .input(z.object({
            id: z.string(),
            nombre: z.string(),
            Descripcion: z.string(),
            Inventario: z.string(),
            Precio: z.string(),
            unidad: z.string()
        }))
        .mutation(({ input }) => {
            const query = {
                id: input.id,
                nombre: input.nombre,
                Descripcion: input.Descripcion,
                Inventario: parseInt(input.Inventario),
                Precio: parseFloat(input.Precio),
                unidad: input.unidad,
            }
            const result = ProductoController.updateProducto(query);
            return result;
        }),
    deleteProducto: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            const { id } = input;
            const result = await ProductoController.deleteProducto(id);
            return result;
        })
});