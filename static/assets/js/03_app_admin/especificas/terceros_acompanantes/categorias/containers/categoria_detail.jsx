import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../01_actions/01_index";
import CargarDatos from "../../../../../00_utilities/components/system/cargar_datos";
import {Titulo, SinObjeto} from "../../../../../00_utilities/templates/fragmentos";
import ValidarPermisos from "../../../../../00_utilities/permisos/validar_permisos";
import {permisosAdapter} from "../../../../../00_utilities/common";
import {
    CATEGORIAS_ACOMPANANTES as permisos_view
} from "../../../../../00_utilities/permisos/types";
import ListCrud from '../../categoria_fraccion_tiempo/components/categorias_fraciones_tiempos_list';
import {Link} from 'react-router-dom'

class Detail extends Component {
    constructor(props) {
        super(props);
        this.cargarDatos = this.cargarDatos.bind(this);
    }

    componentDidMount() {
        this.cargarDatos();
    }

    componentWillUnmount() {
        this.props.clearPermisos();
        this.props.clearCategoriasFraccionesTiemposAcompanantes();
        this.props.clearCategoriasAcompanantes();

    }

    cargarDatos() {
        const {id} = this.props.match.params;
        const cargarCategoriaFraccionTiempo = () => this.props.fetchCategoriasFraccionesTiemposAcompanantes_x_categoria(id);
        this.props.fetchCategoriaAcompanante(id, {callback: cargarCategoriaFraccionTiempo});

    }

    render() {
        const {object, categorias_fracciones_tiempo_list, fracciones_tiempo_list} = this.props;
        const permisos = permisosAdapter(permisos_view);


        if (!object) {
            return <SinObjeto/>
        }

        return (
            <ValidarPermisos can_see={permisos.detail} nombre='detalles de categoria'>
                <Titulo>Detalle {object.nombre}</Titulo>
                <ListCrud
                    object_list={categorias_fracciones_tiempo_list}
                    fracciones_tiempo_list={fracciones_tiempo_list}
                    permisos_object={permisos}
                    {...this.props}
                />
                <CargarDatos cargarDatos={this.cargarDatos}/>
                <Link to={`/app/admin/usuarios/acompanantes/dashboard`}>
                    <span className='btn'>Ir a Categorías</span>
                </Link>
            </ValidarPermisos>
        )
    }

}

function mapPropsToState(state, ownProps) {
    const {id} = ownProps.match.params;
    return {
        auth: state.auth,
        object: state.categorias_acompanantes[id],
        categorias_fracciones_tiempo_list: state.categorias_fracciones_tiempos_acompanantes,
        fracciones_tiempo_list: state.fracciones_tiempos_acompanantes,
    }
}

export default connect(mapPropsToState, actions)(Detail)