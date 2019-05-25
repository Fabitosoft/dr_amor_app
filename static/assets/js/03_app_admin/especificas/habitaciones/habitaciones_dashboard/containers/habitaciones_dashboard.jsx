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
    HABITACIONES as bloque_1_permisos,
    TIPOS_HABITACIONES as bloque_2_permisos,
} from "../../../../../00_utilities/permisos/types";

import BloqueHabitaciones from '../../habitaciones/components/habitaciones_list';
import BloqueHabitacionesTipos from '../../habitaciones_tipos/components/habitaciones_tipos_list';

class ListadoElementos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
        this.plural_name = 'Habitaciones Panel';
        this.singular_name = 'Habitacion Panel';
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
        const cargarHabitacionesTipos = () => this.props.fetchTiposHabitaciones();
        if (index === 0) {
            const cargarImpuestos = () => this.props.fetchImpuestos({callback: cargarHabitacionesTipos});
            const cargarEmpresas = () => this.props.fetchEmpresas({callback: cargarImpuestos});
            this.props.fetchHabitaciones({callback: cargarEmpresas});
        } else if (index === 1) {
            cargarHabitacionesTipos();
        }
    }

    componentDidMount() {
        this.props.fetchMisPermisosxListado([bloque_1_permisos, bloque_2_permisos], {callback: () => this.cargarDatos()});
    }


    componentWillUnmount() {
        this.props.clearHabitaciones();
        this.props.clearEmpresas();
        this.props.clearTiposHabitaciones();
    }

    cargarDatos() {
        this.cargarElementos();
    }

    render() {
        const {bloque_1_list, bloque_2_list, mis_permisos} = this.props;
        const permisos_object_1 = permisosAdapter(mis_permisos, bloque_1_permisos);
        const permisos_object_2 = permisosAdapter(mis_permisos, bloque_2_permisos);

        const can_see =
            permisos_object_1.list ||
            permisos_object_2.list;
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
                    <Tab label="Habitaciones" value={0}/>
                    <Tab label="Habitaciones Tipos" value={1}/>
                </Tabs>

                {
                    this.state.slideIndex === 0 &&
                    <BloqueHabitaciones
                        {...this.props}
                        object_list={bloque_1_list}
                        permisos_object={permisos_object_1}
                        habitaciones_tipos_list={bloque_2_list}
                    />
                }
                {
                    this.state.slideIndex === 1 &&
                    <BloqueHabitacionesTipos
                        {...this.props}
                        object_list={bloque_2_list}
                        permisos_object={permisos_object_2}
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
        bloque_1_list: state.habitaciones,
        impuestos: state.contabilidad_impuestos,
        mis_permisos: state.mis_permisos,
        bloque_2_list: state.habitaciones_tipos,
        empresas_list: state.empresas,
    }
}

export default connect(mapPropsToState, actions)(ListadoElementos)