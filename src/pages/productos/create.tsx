import React from 'react'
import FomulaarioProducto from 'src/components/FomulaarioProducto'
export default function create() {
  return (
    <main className="mx-auto my-12 max-w-5xl text-center">
      <h2 className='text-3xl font-bold mb-5'>Crear un nuevo Producto</h2>
      <article>
        <p>Para crear un nuevo producto por favor competa todos los siguientes datos</p>
        <FomulaarioProducto />
      </article>
    </main>
  )
}
