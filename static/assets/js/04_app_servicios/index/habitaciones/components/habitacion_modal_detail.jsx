import React, {Component, Fragment} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ServicioHabitacionList from './habitacion_servicios_list'
import SelectModeloServicio from '../../dashboard/components/forms/habitacion_detail_select_acompanante_servicio'
import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class HabitacionDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrar_avanzado: false,
            mostrar_terminar_servicios: false,
            mostrar_cambiar_habitacion: false,
            servicios_nuevos: {}
        };
        this.onSelectModelo = this.onSelectModelo.bind(this);
        this.onAdicionarServicio = this.onAdicionarServicio.bind(this);
        this.onDeleteServicio = this.onDeleteServicio.bind(this);
        this.onIniciarServicios = this.onIniciarServicios.bind(this);
        this.onTerminarServicios = this.onTerminarServicios.bind(this);
        this.onCambiarHabitacion = this.onCambiarHabitacion.bind(this);
        this.cargarDatos = this.cargarDatos.bind(this);
    }

    componentDidMount() {
        this.cargarDatos();
    }

    componentWillUnmount() {
        this.props.clearTerceros();
        this.props.clearCategoriasFraccionesTiemposAcompanantes();
    }

    cargarDatos() {
        const {habitacion} = this.props;
        const cargarServicios = () => this.props.fetchServicios_por_habitacion(habitacion.id);
        this.props.fetchTercerosPresentes({callback: cargarServicios});
    }

    onSelectModelo(categoria_modelo_id) {
        this.props.clearCategoriasFraccionesTiemposAcompanantes();
        this.props.fetchCategoriasFraccionesTiemposAcompanantes_x_categoria(categoria_modelo_id)
    }

    onAdicionarServicio(valores) {
        const {
            habitacion,
            terceros,
            categorias_fracciones_tiempo_list,
        } = this.props;
        const {servicios_nuevos} = this.state;

        const {id_tercero, categoria_fraccion_tiempo_id} = valores;
        const tercero = terceros[valores.id_tercero];
        const categoria_tiempo = categorias_fracciones_tiempo_list[valores.categoria_fraccion_tiempo_id];

        const valor_habitacion = (parseFloat(habitacion.valor) / (1 + parseFloat(habitacion.porcentaje_impuesto / 100))).toFixed(0);
        const valor_impuesto = (parseFloat(habitacion.valor) - valor_habitacion).toFixed(0);

        const maximo = _.size(servicios_nuevos) > 0 ? _.max(_.map(servicios_nuevos, e => e.id)) : 0;

        const servicio_nuevo = {
            id: maximo + 1,
            id_temp: `nue_${maximo + 1}`,
            tercero_id: id_tercero,
            categoria_fraccion_tiempo_id: categoria_fraccion_tiempo_id,
            acompanante_nombre: tercero.full_name_proxy,
            tiempo_minutos: categoria_tiempo.fraccion_tiempo_minutos,
            categoria: categoria_tiempo.categoria_nombre,
            valor_servicio: categoria_tiempo.valor,
            valor_habitacion: valor_habitacion,
            valor_iva_habitacion: valor_impuesto,
            valor_total: parseFloat(valor_habitacion) + parseFloat(valor_impuesto) + parseFloat(categoria_tiempo.valor),
            nuevo: true
        };
        this.setState({servicios_nuevos: {...servicios_nuevos, [servicio_nuevo.id_temp]: servicio_nuevo}})
    }

    onDeleteServicio(servicio_id) {
        const {servicios_nuevos} = this.state;
        this.setState({servicios_nuevos: _.omit(servicios_nuevos, servicio_id)})
    }

    onCambiarHabitacion(pago, nueva_habitacion_id, servicios) {
        const {
            cambiarHabitacion,
            habitacion,
            cerraModal,
            mi_cuenta: {punto_venta_actual}
        } = this.props;
        const servicios_array_id = _.map(servicios, s => s.id);
        cambiarHabitacion(
            habitacion.id,
            {...pago, punto_venta_id: punto_venta_actual.id},
            nueva_habitacion_id,
            servicios_array_id,
            {callback: cerraModal}
        );
    }

    onTerminarServicios() {
        const {
            terminarServiciosHabitacion,
            fetchHabitacion,
            habitacion,
            cerraModal,
            mi_cuenta: {punto_venta_actual}
        } = this.props;

        fetchHabitacion(
            habitacion.id,
            {
                callback:
                    (response) => {
                        if (response.estado === 1) {
                            terminarServiciosHabitacion(
                                habitacion.id,
                                punto_venta_actual.id,
                                {callback: cerraModal}
                            )
                        }
                    }
            }
        );
    }

    onIniciarServicios(pago) {
        const {
            iniciarServiciosHabitacion,
            habitacion,
            cerraModal,
            mi_cuenta: {punto_venta_actual}
        } = this.props;
        const {servicios_nuevos} = this.state;
        iniciarServiciosHabitacion(
            habitacion.id,
            {...pago, punto_venta_id: punto_venta_actual.id},
            _.map(_.orderBy(servicios_nuevos, ['tiempo_minutos'], ['desc']), e => e),
            {
                callback:
                    () => {
                        cerraModal();
                    }
            }
        );
    }

    render() {
        const {
            modal_open,
            cerraModal,
            servicios,
            habitacion,
            terceros,
            categorias_fracciones_tiempo_list,
            habitaciones,
        } = this.props;

        const {
            mostrar_avanzado,
            mostrar_terminar_servicios,
            mostrar_cambiar_habitacion,
            servicios_nuevos
        } = this.state;

        const servicios_habitacion = _.map(
            _.pickBy(servicios, s => s.habitacion === habitacion.id),
            s => s
        );

        const acompanantes_en_habitacion = servicios_habitacion.map(s => s.acompanante);

        const terceros_presentes = _.map(_.pickBy(terceros, t => {
            return (
                t.presente &&
                t.es_acompanante &&
                (t.estado === 0 || acompanantes_en_habitacion.includes(t.id))
            )
        }), i => i);

        return (
            <Dialog
                open={modal_open}
                fullScreen={true}
            >
                <DialogTitle
                    id="responsive-dialog-title">{`${habitacion.tipo_habitacion_nombre} ${habitacion.numero}`}</DialogTitle>
                <DialogContent>
                    <SelectModeloServicio
                        categorias_fracciones_tiempo_list={categorias_fracciones_tiempo_list}
                        terceros_presentes={terceros_presentes}
                        onSubmit={this.onAdicionarServicio}
                        onSelectModelo={this.onSelectModelo}
                    />
                    <div className="col-12">
                        <ServicioHabitacionList
                            habitacion={habitacion}
                            habitaciones={habitaciones}
                            mostrar_terminar_servicios={mostrar_terminar_servicios}
                            mostrar_cambiar_habitacion={mostrar_cambiar_habitacion}
                            servicios={servicios_habitacion}
                            servicios_nuevos={servicios_nuevos}
                            onDeleteServicio={this.onDeleteServicio}
                            onTerminarServicios={this.onTerminarServicios}
                            onIniciarServicios={this.onIniciarServicios}
                            onCambiarHabitacion={this.onCambiarHabitacion}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    {
                        habitacion.estado === 1 &&
                        <Fragment>
                            <FontAwesomeIcon
                                className='puntero'
                                icon={['far', `${mostrar_avanzado ? 'minus' : 'plus'}-circle`]}
                                onClick={() => this.setState(s => {
                                    return {
                                        mostrar_avanzado: !s.mostrar_avanzado,
                                        mostrar_terminar_servicios: false,
                                        mostrar_cambiar_habitacion: false
                                    }
                                })}
                                style={{position: 'absolute', left: 10}}
                            />
                            {
                                mostrar_avanzado &&
                                <div style={{position: 'absolute', left: 50}}>
                            <span
                                className='puntero'
                                onClick={() => this.setState(
                                    {
                                        mostrar_terminar_servicios: true,
                                        mostrar_cambiar_habitacion: false
                                    }
                                )}
                            >
                                Terminar Servicio
                            </span> |
                                    <span
                                        className='puntero'
                                        onClick={() => {
                                            const callback = () => {
                                                this.setState(
                                                    {
                                                        mostrar_terminar_servicios: false,
                                                        mostrar_cambiar_habitacion: true
                                                    }
                                                )
                                            };
                                            this.props.fetchHabitaciones({callback, limpiar_coleccion: false});
                                        }}
                                    > Cambiar Habitacion
                            </span>
                                </div>
                            }
                        </Fragment>
                    }
                    <Button
                        color="primary"
                        variant="contained"
                        className='ml-3'
                        onClick={cerraModal}
                    >
                        Cerrar
                    </Button>

                </DialogActions>
            </Dialog>
        )
    }
}

export default HabitacionDetailModal;