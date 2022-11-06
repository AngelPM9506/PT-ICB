import type { NextApiRequest, NextApiResponse } from "next"
import ProductoController from "src/controllers/producto.controller";
import { sendError, sendMessge, sendSuccess } from "src/utils/sendMsg";

const id = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { id } } = req;
    try {
        switch (method) {
            case 'GET':
                const theId = id?.toString();
                const producto = await ProductoController.getProducto(theId);
                return res.status(200).json(sendSuccess(producto));
            case 'PUT':

                break;
            case 'DELETE':

                break;

            default:
                return res.status(404).json(sendMessge('warning', 'Metodo no soportado, intenta de nuevo'));
        }
    } catch (error) {
        res.status(500).json(sendError(error));
    }
}

export default id