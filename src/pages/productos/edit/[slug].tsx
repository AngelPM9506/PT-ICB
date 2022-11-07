import { useRouter } from 'next/router'
import React from 'react'
import FomulaarioProducto from 'src/components/FomulaarioProducto';
import { trpc } from 'src/utils/trpc';

const Edit = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading } = trpc.productos.getProducto.useQuery({ slug: slug?.toString() });
  if (!data || isLoading) {
    return <p>Loading</p>
  }
  return (
    <main className="mx-auto my-12 max-w-5xl text-center">
      <h2 className='text-3xl font-bold mb-5'>Editar Producto: {data.nombre}</h2>
      <article>
        <p>Para editar el producto por favor modifica los siguientes datos</p>
        <FomulaarioProducto producto={{ ...data, unidad: 'C' }} />
      </article>
    </main>
  )
}

export default Edit