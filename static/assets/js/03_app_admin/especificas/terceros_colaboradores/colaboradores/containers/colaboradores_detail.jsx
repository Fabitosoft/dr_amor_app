import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../01_actions/01_index";
import CargarDatos from "../../../../../00_utilities/components/system/cargar_datos";
import {Titulo, SinObjeto} from "../../../../../00_utilities/templates/fragmentos";
import ValidarPermisos from "../../../../../00_utilities/permisos/validar_permisos";
import {permisosAdapter} from "../../../../../00_utilities/common";
import AddPuntoVenta from '../components/add_punto_venta';
import IconButtonTableDelete from '../../../../../00_utilities/components/ui/icon/table_icon_button_delete';
import {
    COLABORADORES as permisos_view
} from "../../../../../00_utilities/permisos/types";

const TablaPDV = (props) => {
    const {pdv_colaborador, quitarPuntoVenta} = props;
    return (
        <Fragment>
            {
                pdv_colaborador && pdv_colaborador.length > 0 &&
                <table className='table table-striped table-responsive'>
                    <tbody>
                    {
                        pdv_colaborador.map(pdv => {
                            return <tr key={pdv.id}>
                                <td>{pdv.nombre}</td>
                                <td>
                                    <IconButtonTableDelete
                                        onClick={() => quitarPuntoVenta(pdv)}
                                    />
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            }
        </Fragment>
    )
};

class Detail extends Component {
    constructor(props) {
        super(props);
        this.cargarDatos = this.cargarDatos.bind(this);
        this.addPuntoVenta = this.addPuntoVenta.bind(this);
        this.quitarPuntoVenta = this.quitarPuntoVenta.bind(this);
        this.cargarPuntosVentasColaborador = this.cargarPuntosVentasColaborador.bind(this);
        this.state = {puntos_ventas_colaborador: null}
    }

    componentDidMount() {
        this.cargarDatos();
    }

    componentWillUnmount() {
        this.props.clearPermisos();
        this.props.clearPuntosVentas();
    }

    addPuntoVenta(punto_venta) {
        const {id} = this.props.match.params;
        this.props.adicionarPuntoVenta(id, punto_venta.id, {callback: this.cargarPuntosVentasColaborador});
    }

    quitarPuntoVenta(punto_venta) {
        const {id} = this.props.match.params;
        this.props.quitarPuntoVenta(id, punto_venta.id, {callback: this.cargarPuntosVentasColaborador});
    }

    cargarPuntosVentasColaborador() {
        const {id} = this.props.match.params;
        const fetchPuntosVentas = () => this.props.fetchPuntosVentas();
        this.props.fetchPuntosVentas_por_colaborador(
            id,
            {
                callback: puntos_ventas_colaborador => {
                    this.setState({puntos_ventas_colaborador});
                    fetchPuntosVentas()
                }
            }
        );
    }

    cargarDatos() {
        const {id} = this.props.match.params;
        this.props.fetchColaborador(id, {callback: this.cargarPuntosVentasColaborador});

    }

    render() {
        const {object, puntos_ventas} = this.props;
        const permisos = permisosAdapter(permisos_view);
        const {puntos_ventas_colaborador} = this.state;
        const puntos_venta_para_adicionar = puntos_ventas_colaborador ? _.pickBy(puntos_ventas, pv => !_.map(puntos_ventas_colaborador, pv => pv.id).includes(pv.id)) : null;
        if (!object) {
            return <SinObjeto/>
        }
        return (
            <ValidarPermisos can_see={permisos.detail} nombre='detalles de Colaborador'>
                <Titulo>Detalle Colaborador {object.full_name_proxy}</Titulo>
                <div className="row">
                    <div className="col-12">
                        Puntos de Venta
                    </div>
                    <div className="col-12">
                        <AddPuntoVenta
                            addPuntoVenta={this.addPuntoVenta}
                            puntos_ventas={puntos_venta_para_adicionar}
                        />
                    </div>
                    <div className="col-12">
                        <TablaPDV pdv_colaborador={puntos_ventas_colaborador} quitarPuntoVenta={this.quitarPuntoVenta}/>
                    </div>
                </div>
                <CargarDatos cargarDatos={this.cargarDatos}/>
            </ValidarPermisos>
        )
    }

}

function mapPropsToState(state, ownProps) {
    const {id} = ownProps.match.params;
    return {
        auth: state.auth,
        object: state.colaboradores[id],
        puntos_ventas: state.puntos_ventas,
    }
}

export default connect(mapPropsToState, actions)(Detail)