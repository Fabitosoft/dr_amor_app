import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../01_actions/01_index";
import CargarDatos from "../../../../../00_utilities/components/system/cargar_datos";
import ValidarPermisos from "../../../../../00_utilities/permisos/validar_permisos";
import {permisosAdapter} from "../../../../../00_utilities/common";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {
    PRODUCTOS as bloque_1_permisos,
    CATEGORIAS_PRODUCTOS as bloque_2_permisos,
    CATEGORIAS_PRODUCTOS_DOS as bloque_3_permisos,
    UNIDADES_PRODUCTOS as bloque_4_permisos,
} from "../../../../../00_utilities/permisos/types";

import BloqueProductos from '../../productos/components/productos_list';
import BloqueCategorias from '../../categorias/components/categorias_list';
import BloqueCategoriasDos from '../../categorias_dos/components/categorias_dos_list';
import BloqueUnidadesProductos from '../../unidades/components/unidades_list';

class ListadoElementos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
        this.plural_name = 'Panel Productos';
        this.singular_name = 'Panel Producto';
        this.cargarDatos = this.cargarDatos.bind(this);

    }

    handleChange = (event, value) => {
        if (value !== this.state.slideIndex) {
            this.cargarElementos(value);
        }
        this.setState({
            slideIndex: value,
        });
    };

    cargarElementos(value = null) {
        let index = value !== null ? value : this.state.slideIndex;
        if (index === 0) {
            this.props.fetchProductos({
                callback: () => this.props.fetchEmpresas({
                    callback: () => this.props.fetchCategoriasProductosDos({callback: this.props.fetchUnidadesProductos})
                })
            });
        } else if (index === 1) {
            this.props.fetchCategoriasProductos();
        } else if (index === 2) {
            this.props.fetchCategoriasProductos({callback: this.props.fetchCategoriasProductosDos});
        } else if (index === 3) {
            this.props.fetchUnidadesProductos();
        }
    }

    componentDidMount() {
        this.cargarDatos();
    }


    componentWillUnmount() {
        this.props.clearProductos();
        this.props.clearUnidadesProductos();
        this.props.clearCategoriasProductos();
        this.props.clearEmpresas();
        this.props.clearCategoriasProductosDos();
    }

    cargarDatos() {
        this.cargarElementos();
    }

    render() {
        const {bloque_1_list, bloque_2_list, bloque_3_list, bloque_4_list} = this.props;
        const permisos_object_1 = permisosAdapter(bloque_1_permisos);
        const permisos_object_2 = permisosAdapter(bloque_2_permisos);
        const permisos_object_3 = permisosAdapter(bloque_3_permisos);
        const permisos_object_4 = permisosAdapter(bloque_4_permisos);

        const can_see =
            permisos_object_1.list ||
            permisos_object_2.list ||
            permisos_object_3.list ||
            permisos_object_4.list;
        return (
            <ValidarPermisos can_see={can_see} nombre={this.plural_name}>
                <Typography variant="h5" gutterBottom color="primary">
                    {this.singular_name}
                </Typography>

                <Tabs indicatorColor="primary"
                      textColor="primary"
                      onChange={this.handleChange}
                      value={this.state.slideIndex}
                >
                    <Tab label="Productos" value={0}/>
                    <Tab label="Categorias" value={1}/>
                    <Tab label="Categorias Dos" value={2}/>
                    <Tab label="Unidades" value={3}/>
                </Tabs>

                {
                    this.state.slideIndex === 0 &&
                    <BloqueProductos
                        object_list={bloque_1_list}
                        permisos_object={permisos_object_1}
                        {...this.props}
                        categorias_dos_list={bloque_3_list}
                        unidades_list={bloque_4_list}
                    />
                }
                {
                    this.state.slideIndex === 1 &&
                    <BloqueCategorias
                        object_list={bloque_2_list}
                        permisos_object={permisos_object_2}
                        {...this.props}
                    />
                }
                {
                    this.state.slideIndex === 2 &&
                    <BloqueCategoriasDos
                        object_list={bloque_3_list}
                        permisos_object={permisos_object_3}
                        {...this.props}
                        categorias_list={bloque_2_list}
                    />
                }
                {
                    this.state.slideIndex === 3 &&
                    <BloqueUnidadesProductos
                        object_list={bloque_4_list}
                        permisos_object={permisos_object_4}
                        {...this.props}
                    />
                }
                <CargarDatos
                    cargarDatos={this.cargarDatos}
                />
            </ValidarPermisos>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        auth: state.auth,
        bloque_1_list: state.productos,
        bloque_2_list: state.productos_categorias,
        bloque_3_list: state.productos_categorias_dos,
        bloque_4_list: state.productos_unidades,
        empresas_list: state.empresas,
    }
}

export default connect(mapPropsToState, actions)(ListadoElementos)