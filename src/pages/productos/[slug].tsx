import type { Producto } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import { useCookies } from 'react-cookie'
import { trpc } from 'src/utils/trpc';

export default function Details() {
  const router = useRouter()
  const { slug } = router.query;
  const { data, isLoading, isSuccess } = trpc.productos.getProducto.useQuery({ slug: slug?.toString() });
  const { mutate: toDetelete } = trpc.productos.deleteProducto.useMutation();
  const [cookie, setCookie] = useCookies(['carrito']);
  if (!data || isLoading || !isSuccess) return <p>Loading...</p>
  const { id, nombre, Descripcion, Precio, Inventario } = data;

  const deleteProducto = (id: string) => {
    toDetelete({ id })
    setTimeout(() => {
      router.push('/productos');
    }, 10);
  }
  const toCarrito = (item: Producto) => {
    const itemAdded = cookie.carrito ? cookie.carrito.find((pro: Producto) => pro.id === item.id) : null;
    if (!itemAdded) {
      setCookie('carrito', cookie.carrito ? [...cookie.carrito, { ...item }] : [{ ...item }]);
      alert(`${item.nombre}, agregado al carrito con exito`);
    } else {
      alert(`${item.nombre}, ya esta en tu carrito`);
    }
  }
  const renderDelete = () => {
    return (
      <button
        onClick={() => deleteProducto(id)}
        className='
                text-sm
                text-white
                 bg-red-500 
                 p-1 
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
  return (
    <main className="mx-auto my-12 max-w-5xl text-center h-full">
      <h2 className='text-3xl font-bold mb-5'>{nombre}</h2>
      <article className='bg-slate-200 h-1/2 w-3/4 p-5 mx-auto flex flex-col justify-between rounded-md'>
        <div className="flex flex-row justify-between">
          <button onClick={() => toCarrito(data)} className='bg-green-500 p-1 w-max text-white rounded shadow shadow-black transition-all duration-150 hover:bg-green-700'>Agregar al carrito</button>
          <div className='flex gap-2'>
            <Link href={`/productos/edit/${slug}`} className='bg-yellow-500 p-1 w-max text-white rounded shadow shadow-black transition-all duration-150 hover:bg-yellow-700'>Editar</Link>
            {renderDelete()}
          </div>
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
