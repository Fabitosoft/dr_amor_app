import React, {Component} from 'react';
import CreateForm from './forms/categoria_fraccion_tiempo_form';
import Tabla from './categorias_fracciones_tiempos_tabla';
import crudHOC from '../../../../../00_utilities/components/hoc_crud';


const CRUD = crudHOC(CreateForm, Tabla);

class List extends Component {
    constructor(props) {
        super(props);
        this.method_pool = {
            fetchObjectMethod: this.fetchObjectMethod.bind(this),
            deleteObjectMethod: this.deleteObjectMethod.bind(this),
            createObjectMethod: this.createObjectMethod.bind(this),
            updateObjectMethod: this.updateObjectMethod.bind(this),
        };
        this.plural_name = 'Fracciones Tiempo';
        this.singular_name = 'Fracción Tiempo';
    }

    successSubmitCallback(item) {
        const nombre = item.fraccion_tiempo_nombre;
        const {notificarAction} = this.props;
        notificarAction(`Se ha ${item.id ? 'actualizado' : 'creado'} con éxito ${this.singular_name.toLowerCase()} ${nombre}`);

    }


    successDeleteCallback(item) {
        const nombre = item.fraccion_tiempo_nombre;
        const {notificarAction} = this.props;
        notificarAction(`Se ha eliminado con éxito ${this.singular_name.toLowerCase()} ${nombre}`);

    }

    fetchObjectMethod(item_id, {callback}) {
        this.props.fetchCategoriaFraccionTiempoAcompanante(item_id, {callback});
    }

    createObjectMethod(item, successCallback) {
        const callback = (response) => {
            this.successSubmitCallback(response);
            successCallback();
        };
        this.props.createCategoriaFraccionTiempoAcompanante(item, {callback});
    }

    updateObjectMethod(item, successCallback) {
        const callback = (response) => {
            this.successSubmitCallback(response);
            successCallback();
        };
        this.props.updateCategoriaFraccionTiempoAcompanante(item.id, item, {callback});
    }

    deleteObjectMethod(item, successCallback) {
        const callback = () => {
            this.successDeleteCallback(item);
            successCallback();
        };
        this.props.deleteCategoriaFraccionTiempoAcompanante(item.id, {callback});
    }

    render() {
        const {object_list, permisos_object} = this.props;
        return (
            <CRUD
                method_pool={this.method_pool}
                list={object_list}
                permisos_object={permisos_object}
                plural_name={this.plural_name}
                singular_name={this.singular_name}
                {...this.props}
            />
        )
    }
}

export default List;