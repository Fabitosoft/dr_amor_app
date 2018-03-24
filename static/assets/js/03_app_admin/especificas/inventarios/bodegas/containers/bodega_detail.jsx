import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../01_actions/01_index";
import CargarDatos from "../../../../../00_utilities/components/system/cargar_datos";
import {Titulo, SinObjeto} from "../../../../../00_utilities/templates/fragmentos";
import ValidarPermisos from "../../../../../00_utilities/permisos/validar_permisos";
import {permisosAdapter} from "../../../../../00_utilities/common";
import {
    BODEGAS as permisos_view
} from "../../../../../00_utilities/permisos/types";

import TablaInventarioActual from '../components/bodegas_inventario_movimiento_actual_tabla';
import TablaInventarioProducto from '../components/bodegas_inventario_movimiento_producto_tabla';

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
};

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
        this.cargarDatos = this.cargarDatos.bind(this);
        this.verMovimientoProducto = this.verMovimientoProducto.bind(this);
    }

    verMovimientoProducto(item_id) {
        const {notificarErrorAjaxAction, cargando, noCargando} = this.props;
        cargando();
        const {id} = this.props.match.params;
        this.setState({slideIndex: 1});
        this.props.clearMovimientosInventarios();
        this.props.fetchMovimientosInventariosxBodegaxProducto(id, item_id, () => noCargando(), notificarErrorAjaxAction);
    }

    handleChange = (value) => {
        if (value !== this.state.slideIndex) {
            this.cargarElementos(value);
        }
        this.setState({
            slideIndex: value,
        });
    };

    cargarElementos(value = null) {
        const {notificarErrorAjaxAction, cargando, noCargando} = this.props;
        let index = value !== null ? value : this.state.slideIndex;
        if (index === 0) {
            cargando();
            const {id} = this.props.match.params;
            this.props.fetchMovimientosInventariosSaldosxBodega(id, () => noCargando(), notificarErrorAjaxAction);
        } else if (index === 1) {

        }
    }

    componentDidMount() {
        this.cargarDatos();
    }

    componentWillUnmount() {
        this.props.clearPermisos();
        this.props.clearBodegas();
    }

    cargarDatos() {
        const {id} = this.props.match.params;
        const {cargando, notificarErrorAjaxAction} = this.props;
        cargando();
        const success_callback = () => {
            this.cargarElementos();
        };
        const cargarBodega = () => this.props.fetchBodega(id, success_callback, notificarErrorAjaxAction);
        this.props.fetchMisPermisos(cargarBodega, notificarErrorAjaxAction);

    }

    render() {
        const {object, mis_permisos, movimientos_inventarios_detalles_list} = this.props;
        const permisos = permisosAdapter(mis_permisos, permisos_view);


        if (!object) {
            return <SinObjeto/>
        }

        return (
            <ValidarPermisos can_see={permisos.detail} nombre='detalles de bodega'>
                <Titulo>Detalle {object.nombre}</Titulo>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="Inventario Actual" value={0}/>
                    <Tab label="Moviemiento Inventario" value={1}/>
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div style={styles.slide}>
                        <TablaInventarioActual
                            data={_.map(movimientos_inventarios_detalles_list, e => e)}
                            verMovimientoProducto={this.verMovimientoProducto}
                        />
                    </div>
                    <div style={styles.slide}>
                        <TablaInventarioProducto
                            data={_.map(_.orderBy(movimientos_inventarios_detalles_list, ['modified'],['desc']), e => e)}
                        />
                    </div>
                </SwipeableViews>
                <CargarDatos cargarDatos={this.cargarDatos}/>
            </ValidarPermisos>
        )
    }

}

function mapPropsToState(state, ownProps) {
    const {id} = ownProps.match.params;
    return {
        movimientos_inventarios_detalles_list: state.movimientos_inventarios_detalles,
        mis_permisos: state.mis_permisos,
        object: state.bodegas[id]
    }
}

export default connect(mapPropsToState, actions)(Detail)