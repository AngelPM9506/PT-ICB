import type { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors";
import ProductoController from "src/controllers/producto.controller";
const { URL_ORIGIN_CORS } = process.env;
import { sendError, sendMessge, sendSuccess } from "src/utils/sendMsg";

const index = async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
        origin: URL_ORIGIN_CORS || '*', optionsSuccessStatus: 200,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
    });
    const {
        method,
        body: { nombre, Descripcion, Inventario, Precio, unidad },
    } = req
    try {
        switch (method) {
            case 'GET':
                const productos = await ProductoController.getProductos();
                return res.status(200).json(sendSuccess(productos));
            case 'POST':
                const newProducto = await ProductoController.newProducto({
                    nombre, Descripcion, Inventario, Precio, unidad
                })
                return res.status(202).json(sendSuccess(newProducto));
            default:
               return res.status(404).json(sendMessge('warning', 'Metodo no soportado, intenta de nuevo'));
        }
    } catch (error) {
        res.status(500).json(sendError(error));
    }
}

export default index