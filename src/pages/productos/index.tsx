import Link from 'next/link'
import React from 'react'
import ListarProductos from 'src/components/ListarProductos'

export default function index() {
  return (
    <main className="mx-auto my-12 max-w-5xl text-center">
      <h2 className='text-3xl font-bold mb-5'>Todos los productos</h2>
      <section>
        <p className='pb-5'> Aquí puedes observar todos los productos</p>
        <article className="flex mt-5 justify-start">
          <Link href={'/productos/create'} className='bg-blue-500 p-3 w-max rounded-2xl shadow shadow-black transition-all duration-150 hover:bg-blue-800'>Nuevo producto</Link>
        </article>
        <ListarProductos />
      </section>
    </main>
  )
}
