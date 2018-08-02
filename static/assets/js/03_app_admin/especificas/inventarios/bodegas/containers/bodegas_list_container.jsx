import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../01_actions/01_index";
import CargarDatos from "../../../../../00_utilities/components/system/cargar_datos";
import {
    BODEGAS as permisos_view
} from "../../../../../00_utilities/permisos/types";
import {permisosAdapter} from "../../../../../00_utilities/common";

import ListCrud from '../components/bodegas_list';


class List extends Component {
    constructor(props) {
        super(props);
        this.cargarDatos = this.cargarDatos.bind(this);
    }

    componentDidMount() {
        this.cargarDatos();
    }

    componentWillUnmount() {
        this.props.clearBodegas();
    }

    cargarDatos() {
        const {  notificarErrorAction} = this.props;
        
        this.props.fetchBodegas(null, notificarErrorAction);


    }

    render() {
        const {object_list} = this.props;
        const bloque_1_list = permisosAdapter( permisos_view);
        return (
            <Fragment>
                <ListCrud
                    object_list={object_list}
                    permisos_object={bloque_1_list}
                    {...this.props}
                />
                <CargarDatos
                    cargarDatos={this.cargarDatos}
                />
            </Fragment>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        auth: state.auth,
        object_list: state.bodegas
    }
}

export default connect(mapPropsToState, actions)(List)