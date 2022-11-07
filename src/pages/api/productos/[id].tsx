import type { NextApiRequest, NextApiResponse } from "next"
import ProductoController from "src/controllers/producto.controller";
import { sendError, sendMessge, sendSuccess } from "src/utils/sendMsg";

const id = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        method,
        query: { id },
        body: { nombre, Descripcion, Inventario, Precio, unidad } } = req;
    try {
        switch (method) {
            case 'GET':
                const theId = id?.toString();
                const producto = await ProductoController.getProducto(theId);

                return res.status(200).json(sendSuccess(producto));
            case 'PUT':
                const Id = id ? id.toString() : undefined;
                const updatedProducto = await ProductoController.updateProducto({
                    id: Id, nombre, Descripcion, Inventario, Precio, unidad
                })
                return res.status(202).json(sendSuccess(updatedProducto));
            case 'DELETE':
                const toDelete = id?.toString();
                const deleted = await ProductoController.deleteProducto(toDelete)
                return res.status(202).json(sendSuccess(deleted));
                break;

            default:
                return res.status(404).json(sendMessge('warning', 'Metodo no soportado, intenta de nuevo'));
        }
    } catch (error) {
        res.status(500).json(sendError(error));
    }
}

export default id