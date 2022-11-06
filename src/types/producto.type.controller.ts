/* eslint-disable @typescript-eslint/no-explicit-any */

export interface QueryPost {
    nombre?: string | unknown,
    Descripcion?: string | unknown,
    Inventario?: number | unknown,
    Precio?: number | unknown,
    unidad?: string | unknown
}

export interface ConditionPost {
    data: {
        nombre: string,
        slug: string,
        Descripcion: string,
        Inventario: number,
        Precio: number | any
    }
}