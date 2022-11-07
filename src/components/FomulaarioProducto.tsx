import { useRouter } from 'next/router'
import { type ChangeEvent, useState, type SyntheticEvent } from 'react'
import type { Errors, InputState } from 'src/types/formularioState.type'
import { trpc } from 'src/utils/trpc'

const FomulaarioProducto = () => {
  const initialState: InputState = {
    nombre: '',
    Descripcion: '',
    Inventario: 0,
    Precio: 0,
    unidad: 'P'
  }
  const initialErrors: Errors = {}
  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const router = useRouter();
  const { mutate: newProducto } = trpc.productos.newProducto.useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (producto: any) => {
      router.push(`/productos/${producto.slug}`)
    },
    onError: () => {
      alert('Error al guardar producto intanta cambiando el nombre');
    }
  });
  const onlyLetersOrNumbers = /^[Á-Źa-z0-9\s]+$/i;
  const onlyNumbers = /^([0-9])+$/;
  const numberDecimals = /^\d*(\.\d+)?$/;

  const validate = (input: InputState) => {
    const errors: Errors = {}
    if (input.nombre === '' || !onlyLetersOrNumbers.test(input.nombre)) {
      errors.nombre = 'El nombre es obligatorio, no son validos numeros solos';
    }
    if (input.Descripcion === '' || !onlyLetersOrNumbers.test(input.Descripcion)) {
      errors.Descripcion = 'la Descripcion es obligatoria, no son validos numeros solos';
    }
    if (input.Inventario === 0 || !onlyNumbers.test(input.Inventario.toString())) {
      errors.Inventario = 'El Inventario es obligatorio, solo numeros son validos';
    }
    if (input.Precio === 0 || !numberDecimals.test(input.Precio.toString())) {
      errors.Precio = 'El Precio es obligatorio, no son validos numeros solos';
    }
    if (input.unidad === '' || !['P', 'C'].includes(input.unidad)) {
      errors.unidad = 'la unidad es obligatoria';
    }
    return errors;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getInputData = (ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement> | any) => {
    const { target: { value, name } } = ev;
    setInput({ ...input, [name]: value });
    setErrors(validate({ ...input, [name]: value }));
  }

  const sendNewProducto = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    const { nombre, Descripcion, Inventario, Precio, unidad } = input;
    const query = { nombre, Descripcion, Inventario: Inventario.toString(), Precio: Precio.toString(), unidad };
    if (JSON.stringify(errors) === '{}') {
      newProducto(query);
    }
  }

  return (

    <form className='pt-5 w-1/2 m-auto' onSubmit={sendNewProducto}>
      <div className="flex flex-wrap items-center mt-3">
        <label htmlFor="nombre" className='basis-28 text-left'>Nombre: </label>
        <div className='flex-1'>
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500' type="text" name="nombre"
            id="nombre"
            placeholder='Nombre del nuevo Producto'
            onChange={getInputData} />
          <p className='text-red-500 text-xs italic'>{errors.nombre}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center mt-3">
        <label htmlFor="Inventario" className='basis-28 text-left'>Inventario: </label>
        <div className='flex-1'>
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
            type="number"
            name="Inventario"
            id="Inventario"
            onChange={getInputData}
            placeholder='Inventario del nuevo Producto en numero' />
          <p className='text-red-500 text-xs italic'>{errors.Inventario}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center mt-3">
        <label htmlFor="Precio" className='basis-28 text-left'>Precio: </label>
        <div className='flex-1'>
          <div className='flex'>
            <input
              className='flex-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
              type="number"
              step='0.01'
              pattern={`${numberDecimals}`}
              name="Precio"
              id="Precio"
              onChange={getInputData}
              placeholder='Precio del nuevo Producto' />
            <select name="unidad" id="unidad"
              className=' basis-12 ml-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
              onChange={getInputData}>
              <option value="P">$</option>
              <option value="C">₵</option>
            </select>
          </div>
          <p className='text-red-500 text-xs italic'>{errors.Precio}</p>
        </div>
      </div>
      <div className="flex flex-wrap mt-3">
        <label htmlFor="Descripcion" className='basis-28 text-left'>Descripción: </label>
        <div className='flex-1'>
          <textarea
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
            name="Descripcion"
            id="Descripcion"
            onChange={getInputData}
            placeholder='Descripción del nuevo Producto' />
          <p className='text-red-500 text-xs italic'>{errors.Descripcion}</p>
        </div>
      </div>
      <div className='flex flex-col justify-start mt-3'>
        <input type="submit" value="Crear" className='bg-blue-500 px-2 py-1 w-max rounded shadow shadow-black transition-all duration-150 hover:bg-blue-800 cursor-pointer' onClick={getInputData} />
        <article>
          <p>nombre: {input.nombre}</p>
          <p>Descripcion: {input.Descripcion}</p>
          <p>Inventario: {input.Inventario}</p>
          <p>Precio: {input.Precio}</p>
          <p>unidad: {input.unidad}</p>
        </article>
      </div>
    </form>
  )
}

/**
 * Inventario
Precio
 */

export default FomulaarioProducto