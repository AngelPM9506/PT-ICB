/* eslint-disable @typescript-eslint/no-explicit-any */

export interface QueryPost {
    nombre?: string | unknown,
    Descripcion?: string | unknown,
    Inventario?: number | unknown,
    Precio?: number | unknown,
    unidad?: string | unknown
}

export interface QueryUpdate {
    id: string | undefined,
    nombre?: string,
    Descripcion?: string,
    Inventario?: number,
    Precio?: number,
    unidad?: string
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
export interface ConditionPut {
    where: {
        id: string
    },
    data: {
        nombre?: string | any | undefined,
        slug?: string | any | undefined,
        Descripcion?: string | any | undefined,
        Inventario?: number | any | undefined,
        Precio?: number | any | undefined
    }
}