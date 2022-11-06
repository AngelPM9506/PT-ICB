/* eslint-disable @typescript-eslint/no-explicit-any */



export const sendError = (err: Error | any | unknown) => {
    //console.log(err);
    if (err.code === 'P2002') {
        return {
            status: 'error',
            msg: `Ya existe el rigstro con ese ${err.meta.target.join(',')}`,
            complete: err
        }
    }
    return { status: 'error', msg: err.message, complete: err };
}

export const sendMessge = (status: string, msg: string | { [x: string]: any } | unknown) => {
    return { status, msg }
}

export const sendSuccess = (data: { [x: string]: any } | unknown) => {
    return { status: 'success', data }
}