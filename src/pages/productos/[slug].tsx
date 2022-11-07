import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import { trpc } from 'src/utils/trpc';

export default function Details() {
  const router = useRouter()
  const { slug } = router.query;
  const { data, isLoading, isSuccess } = trpc.productos.getProducto.useQuery({ slug: slug?.toString() });
  if (!data || isLoading || !isSuccess) return <p>Loading...</p>
  const { id, nombre, Descripcion, Precio, Inventario } = data;
  return (
    <main className="mx-auto my-12 max-w-5xl text-center h-full">
      <h2 className='text-3xl font-bold mb-5'>{nombre}</h2>
      <article className='bg-slate-200 h-1/2 w-3/4 p-5 mx-auto flex flex-col justify-between rounded-md'>
        <div className="flex flex-row justify-between">
          <Link href={`/productos/edit/${id}`} className='bg-yellow-500 p-1 w-max text-white rounded shadow shadow-black transition-all duration-150 hover:bg-yellow-700'>Editar</Link>
          <button className='bg-blue-500 p-1 w-max text-white rounded shadow shadow-black transition-all duration-150 hover:bg-blue-700'>Agregar al carrito</button>

        </div>
        <p className='m-4'>{Descripcion}</p>
        <div className='flex flex-row-reverse justify-between'>
          <p className='font-bold text-xl border-b border-slate-600'>${(Precio / 100).toFixed(2)}</p>
          <p className=' text-slate-400'>{Inventario > 0 ? `${Inventario} Disponibles` : 'No Disponible en este momento'}</p>
        </div>
      </article>
    </main>
  )
}
