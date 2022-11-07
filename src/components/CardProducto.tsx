
import { type Producto } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React from 'react'
import { trpc } from 'src/utils/trpc';

function CardProducto({ producto }: { producto: Producto }) {
    const router = useRouter();
    const { mutate: toDetelete } = trpc.productos.deleteProducto.useMutation();
    const { pathname } = router;
    const { id, nombre, slug, Descripcion, Precio } = producto;

    const deleteProducto = (id: string) => {
        console.log(toDetelete({ id }));
        setTimeout(() => {
            router.reload();
        }, 300);
    }

    const renderDelete = (path: string) => {
        if (path === '/productos') {
            return (
                <button
                    onClick={() => deleteProducto(id)}
                    className='
                text-sm
                text-white
                 bg-red-500 
                 p-2 
                 rounded 
                 shadow 
                 transition-all 
                 duration-300 
                 shadow-slate-700
                 hover:bg-red-700'>
                    Eliminar
                </button>
            );
        }
        return null;
    }
    return (
        <article className='bg-gray-200 m-2 rounded-xl shadow-xl'>
            <Link href={`/productos/${slug}`} >
                <div className=" pr-10 pl-10 pt-10 pb-2">
                    <h2 className='text-3xl'>{nombre}</h2>
                    <p className='text-1xl'>{Descripcion}</p>
                    <p>${Precio / 100}</p>
                </div>
            </Link>
            <div className="flex flex-row-reverse justify-between m-3">
                <button className='
                text-sm
                text-white
                bg-green-500 
                p-2 
                rounded 
                shadow 
                transition-all 
                duration-300 
                shadow-slate-700
                hover:bg-green-700'>
                    Agregar al carrito
                </button>
                {renderDelete(pathname)}
            </div>
        </article>
    )
}

export default CardProducto
