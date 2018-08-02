import {SERVICIO_TYPES as TYPES} from '../../00_types';
import {
    fetchListGet,
    updateObject,
    fetchObject,
    deleteObject,
    createObject,
    fetchListGetURLParameters,
    callApiMethodPostParameters,
} from '../../00_general_fuctions'

const current_url_api = 'servicios';

export const solicitarAnulacionServicio = (id, observacion_anulacion, punto_venta_id, callback = null, callback_error = null) => {
    return (dispatch) => {
        let params = new URLSearchParams();
        params.append('observacion_anulacion', observacion_anulacion);
        params.append('punto_venta_id', punto_venta_id);
        callApiMethodPostParameters(current_url_api, id, 'solicitar_anulacion', params, null, callback, callback_error, dispatch)
    }
};


export const cambiarTiempoServicio = (id, pago, callback = null, callback_error = null) => {
    return (dispatch) => {
        let params = new URLSearchParams();
        params.append('pago', JSON.stringify(pago));
        callApiMethodPostParameters(current_url_api, id, 'cambiar_tiempo', params, null, callback, callback_error, dispatch)
    }
};


export const createServicio = (values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: TYPES.create, payload: response})
        };
        createObject(current_url_api, values, dispatches, callback, callback_error, dispatch)
    }
};
export const deleteServicio = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: TYPES.delete, payload: id})
        };
        deleteObject(current_url_api, id, dispatches, callback, callback_error, dispatch)
    }
};
export const terminarServicio = (id, punto_venta_id, callback = null, callback_error = null) => {
    return (dispatch) => {
        let params = new URLSearchParams();
        params.append('punto_venta_id', punto_venta_id);
        callApiMethodPostParameters(current_url_api, id, 'terminar_servicio', params, null, callback, callback_error, dispatch)
    }
};
export const fetchServicios = (callback = null, callback_error = null, limpiar_coleccion = true) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: TYPES.fetch_all, payload: response})
        };
        fetchListGet(current_url_api, dispatches, callback, callback_error, dispatch, limpiar_coleccion ? TYPES.clear : null);
    }
};
export const fetchServicios_en_proceso = (callback = null, callback_error = null, limpiar_coleccion = true) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: TYPES.fetch_all, payload: response})
        };
        fetchListGet(`${current_url_api}/en_proceso`, dispatches, callback, callback_error, dispatch, limpiar_coleccion ? TYPES.clear : null);
    }
};
export const fetchServicios_por_habitacion = (habitacion_id, callback = null, callback_error = null, limpiar_coleccion = true) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: TYPES.fetch_all, payload: response})
        };
        fetchListGetURLParameters(`${current_url_api}/pendientes_por_habitacion/?habitacion_id=${habitacion_id}`, dispatches, callback, callback_error, dispatch, limpiar_coleccion ? TYPES.clear : null);
    }
};
export const fetchServicios_por_tercero_cuenta_abierta = (tercero_id, callback = null, callback_error = null, limpiar_coleccion = true) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: TYPES.fetch_all, payload: response})
        };
        fetchListGetURLParameters(`${current_url_api}/consultar_por_tercero_cuenta_abierta/?tercero_id=${tercero_id}`, dispatches, callback, callback_error, dispatch, limpiar_coleccion ? TYPES.clear : null);
    }
};
export const fetchServicio = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: TYPES.fetch, payload: response})
        };
        fetchObject(current_url_api, id, dispatches, callback, callback_error, dispatch);
    }
};
export const clearServicios = () => {
    return (dispatch) => {
        dispatch({type: TYPES.clear});

    }
};
export const updateServicio = (id, values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: TYPES.update, payload: response})
        };
        updateObject(current_url_api, id, values, dispatches, callback, callback_error, dispatch)
    }
};