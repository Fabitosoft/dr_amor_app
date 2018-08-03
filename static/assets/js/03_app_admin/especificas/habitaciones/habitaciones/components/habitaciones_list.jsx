import React, {Component} from 'react';
import CreateForm from './forms/habitacion_form';
import Tabla from './habitaciones_tabla';
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
        this.plural_name = 'Habitaciones';
        this.singular_name = 'Habitacion';
    }

    successSubmitCallback(item) {
        const nombre = `${item.tipo_habitacion_nombre} ${item.numero}`;
        const { notificarAction} = this.props;
        notificarAction(`Se ha ${item.id ? 'actualizado' : 'creado'} con éxito ${this.singular_name.toLowerCase()} ${nombre}`);
        
    }


    successDeleteCallback(item) {
        const nombre = `${item.tipo_habitacion_nombre} ${item.numero}`;
        const { notificarAction} = this.props;
        notificarAction(`Se ha eliminado con éxito ${this.singular_name.toLowerCase()} ${nombre}`);
        
    }

    fetchObjectMethod(item_id, successCallback) {

        const success_method = (item) => {
            successCallback(item);

        };
        
        this.props.fetchHabitacion(item_id, success_method);
    }

    createObjectMethod(item, successCallback) {

        const success_method = () => {
            this.successSubmitCallback(item);
            successCallback();
        };
        
        this.props.createHabitacion(item, success_method);
    }

    updateObjectMethod(item, successCallback) {

        const success_method = () => {
            this.successSubmitCallback(item);
            successCallback();
        };
        
        this.props.updateHabitacion(item.id, item, success_method);
    }

    deleteObjectMethod(item, successCallback) {

        const success_method = () => {
            this.successDeleteCallback(item);
            successCallback();
        };
        
        this.props.deleteHabitacion(item.id, success_method);
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