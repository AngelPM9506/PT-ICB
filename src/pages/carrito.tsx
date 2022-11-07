import type { Producto } from '@prisma/client'
import React from 'react'
import { useCookies } from 'react-cookie'

const Carrito = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie] = useCookies(['carrito']);
  let carrito = !cookie.carrito ? [] : cookie.carrito;
  const removeOfCarrito = (id: string) => {
    const newCarrito = carrito.filter((producto: Producto) => producto.id !== id);
    carrito = newCarrito;
    setCookie('carrito', newCarrito)
  }
  const getToal = () => {
    let total = 0;
    carrito.forEach((producto: Producto) => {
      total += producto.Precio;
    });
    return total;
  }
  return (
    <main className="mx-auto my-12 max-w-5xl text-center">
      <h2 className='text-3xl font-bold mb-5'>Carrito</h2>
      <section>
        <p className='pb-5'> Observa tus elementos agregados aquí</p>
        <article className="flex mt-5 flex-col justify-start">
          {carrito.map((producto: Producto) => {
            const { id, nombre, Precio, Descripcion } = producto;
            return (
              <div key={id} className="flex flex-col bg-slate-200 m-3 mx-auto p-3 rounded w-1/2">
                <div className="flex flex-row-reverse">
                  <button
                    onClick={() => removeOfCarrito(id)}
                    className='text-sm text-white bg-red-500 p-1 rounded shadowtransition-all duration-300 shadow-slate-700      hover:bg-red-700'>
                    x
                  </button>
                </div>
                <h3 className='text-2xl font-semibold'>{nombre}</h3>
                <p>{Descripcion}</p>
                <div className="flex justify-around">
                  <p>Precio:</p>
                  <p>${(Precio / 100).toFixed(2)}</p>
                </div>
              </div>
            )
          })}
        </article>
        <article className=' border-t border-t-slate-300'>
          <div className='flex justify-between text-xl w-3/4 mx-auto'>
            <p>Total:</p>
            <p>${(getToal() / 100).toFixed(2)}</p>
          </div>
        </article>
      </section>
    </main>
  )
}

export default Carrito

/**
          {carrito && carrito.map((producto: Producto) => {
            const { id, nombre, Precio, Descripcion } = producto;
            return (
              <div key={id} className="flex flex-col">
                <h3>{nombre}</h3>
                <p>{Descripcion}</p>
                <div className="flex justify-between">
                  <p>Precio:</p>
                  <p>{Precio}</p>
                </div>
              </div>
            )
          })} */