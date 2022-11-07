
export interface InputState {
    nombre: string,
    Descripcion: string,
    Inventario: number,
    Precio: number,
    unidad: string,
}

export interface Errors {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: string | any
}