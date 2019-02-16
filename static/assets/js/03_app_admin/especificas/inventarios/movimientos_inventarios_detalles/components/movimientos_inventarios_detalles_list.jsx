import React, {Component} from 'react';
import CreateForm from './forms/movimiento_inventario_detalle_form';
import Tabla from './movimientos_inventarios_detalles_tabla';
import crudHOC from '../../../../../00_utilities/components/hoc_crud';


const CRUD = crudHOC(CreateForm, Tabla);

class List extends Component {
    constructor(props) {
        super(props);
        this.method_pool = {
            fetchObjectMethod: this.props.fetchMovimientoInventarioDetalle,
            deleteObjectMethod: this.props.deleteMovimientoInventarioDetalle,
            createObjectMethod: this.props.createMovimientoInventarioDetalle,
            updateObjectMethod: this.props.updateMovimientoInventarioDetalle,
        };
        this.posDeleteMethod = this.posDeleteMethod.bind(this);
        this.posSummitMethod = this.posSummitMethod.bind(this);
        this.plural_name = 'Items';
        this.singular_name = 'Item';
    }

    posSummitMethod(item) {
        this.props.fetchMovimientoInventario(item.movimiento)
    }

    posDeleteMethod(item) {
        this.props.fetchMovimientoInventario(item.movimiento)
    }

    render() {
        const {object_list, permisos_object} = this.props;
        return (
            <CRUD
                posDeleteMethod={this.posDeleteMethod}
                posSummitMethod={this.posSummitMethod}
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