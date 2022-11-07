import React from 'react'
import { type Producto } from '@prisma/client';
import { trpc } from 'src/utils/trpc';
import CardProducto from './CardProducto';
//import { log } from 'console';

export default function ListarProductos({ limit }: { limit?: number }) {
  const { data, isLoading } = trpc.productos.allProductos.useQuery(limit ? { take: limit } : null);
  console.log(data)
  if (!data || isLoading || !Array.isArray(data)) return <p>Loading...</p>
  return (
    <section className='py-5 flex flex-wrap justify-center'>
      {data.map((producto: Producto) => {
        return (
          <CardProducto key={producto.id} producto={producto} />
        );
      })}
    </section>
  )
}
