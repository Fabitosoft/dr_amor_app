import {
    COLABORADOR_TYPES as TYPES
} from '../../00_types';
import {
    fetchListGet,
    updateObject,
    fetchObject,
    deleteObject,
    createObject,
    callApiMethodPostParameters
} from '../../00_general_fuctions'

const current_url_api = 'colaboradores';

export const adicionarPuntoVenta = (id, punto_venta_id, callback = null, callback_error = null) => {
    return (dispatch) => {
        let params = new URLSearchParams();
        params.append('punto_venta_id', punto_venta_id);
        const options = {callback, callback_error, dispatch_method: dispatch};
        callApiMethodPostParameters(current_url_api, id, 'adicionar_punto_venta', params, options)
    }
};

export const quitarPuntoVenta = (id, punto_venta_id, callback = null, callback_error = null) => {
    return (dispatch) => {
        let params = new URLSearchParams();
        params.append('punto_venta_id', punto_venta_id);
        const options = {callback, callback_error, dispatch_method: dispatch};
        callApiMethodPostParameters(current_url_api, id, 'quitar_punto_venta', params, options)
    }
};

export const createColaborador = (values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: TYPES.create, payload: response})
        };
        const options = {dispatches, callback, callback_error, dispatch_method: dispatch};
        createObject(current_url_api, values, options);
    }
};
export const deleteColaborador = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: TYPES.delete, payload: id})
        };
        const options = {dispatches, callback, callback_error, dispatch_method: dispatch};
        deleteObject(current_url_api, id, options);
    }
};
export const fetchColaboradores = (callback = null, callback_error = null, limpiar_coleccion = true) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: TYPES.fetch_all, payload: response})
        };
        const options = {
            dispatches,
            callback,
            callback_error,
            dispatch_method: dispatch,
            clear_action_type: limpiar_coleccion ? TYPES.clear : null
        };
        fetchListGet(current_url_api, options);
    }
};
export const fetchColaborador = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: TYPES.fetch, payload: response})
        };
        const options = {dispatches, callback, callback_error, dispatch_method: dispatch};
        fetchObject(current_url_api, id, options);
    }
};
export const clearColaboradores = () => {
    return (dispatch) => {
        dispatch({type: TYPES.clear});

    }
};
export const updateColaborador = (id, values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: TYPES.update, payload: response})
        };
        const options = {dispatches, callback, callback_error, dispatch_method: dispatch};
        updateObject(current_url_api, id, values, options);
    }
};