import React, {Component, Fragment} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ServicioCambiarTiempoList from './forms/servicio_modal_cambiar_tiempo_form'
import ServicioAnularForm from './forms/servicio_anular_form';
import CambioHabitacion from '../../habitaciones/components/habitacion_cambio_habitacion';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class ServicioDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrar_avanzado: false,
            mostrar_anular_servicio: false,
            mostrar_cambiar_tiempo: false,
            mostrar_cambiar_habitacion: false
        };
        this.cargarDatos = this.cargarDatos.bind(this);
        this.solicitarAnulacion = this.solicitarAnulacion.bind(this);
        this.onCambiarHabitacion = this.onCambiarHabitacion.bind(this);
        this.onExtenderTiempo = this.onExtenderTiempo.bind(this);
    }

    componentDidMount() {
        this.cargarDatos();
    }

    cargarDatos() {
        const {servicio, servicios} = this.props;
        console.log(servicios)
        this.props.fetchHabitaciones();
        this.props.fetchCategoriasFraccionesTiemposAcompanantes_x_categoria(servicio.categoria_id);

    }

    solicitarAnulacion(values) {
        const {
            servicio,
            solicitarAnulacionServicio,
            cerraModal,
            auth: {punto_venta}
        } = this.props;
        solicitarAnulacionServicio(
            servicio.id,
            values.observacion_anulacion,
            punto_venta.id,
            {callback: cerraModal}
        );
    }

    onExtenderTiempo(values) {
        const {
            servicio,
            cambiarTiempoServicio,
            cerraModal,
            auth: {punto_venta}
        } = this.props;
        cambiarTiempoServicio(
            servicio.id,
            {...values, punto_venta_id: punto_venta.id},
            {callback: cerraModal}
        );
    }

    onCambiarHabitacion(pago, nueva_habitacion_id, servicios) {
        const {
            cambiarHabitacion,
            servicio,
            cerraModal,
            auth: {punto_venta}
        } = this.props;
        const servicios_array_id = _.map(servicios, s => s.id);
        cambiarHabitacion(
            servicio.habitacion,
            {...pago, punto_venta_id: punto_venta.id},
            nueva_habitacion_id,
            servicios_array_id,
            {callback: cerraModal}
        );
    }

    render() {
        const {
            modal_open,
            cerraModal,
            servicio,
            servicios,
            habitaciones,
            categorias_fracciones_tiempo_list
        } = this.props;

        const {
            mostrar_avanzado,
            mostrar_anular_servicio,
            mostrar_cambiar_tiempo,
            mostrar_cambiar_habitacion,
        } = this.state;

        const categorias_fracciones_tiempo_disponibles_array = _.pickBy(categorias_fracciones_tiempo_list, c => c.fraccion_tiempo_minutos !== servicio.tiempo_minutos)

        const servicios_para_cambiar_habitacion_array = _.map(_.pickBy(servicios, s => {
            return s.acompanante === servicio.acompanante && !s.termino
        }), s => s);

        const habitaciones_para_cambiar_array = _.map(_.pickBy(habitaciones, s => s.estado === 0), s => s);

        return (
            <Dialog
                open={modal_open}
                fullScreen={true}
            >
                <DialogTitle
                    id="responsive-dialog-title">{`Servicio ${servicio.acompanante_nombre}`}</DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className="col-12">
                            <Typography variant="h3" gutterBottom color="primary">
                                Información
                            </Typography>
                            <div className="row">
                                <div className="col-4">
                                    <strong>Habitacion: </strong>
                                    <small>{servicio.habitacion_nombre}</small>
                                </div>
                                <div className="col-4">
                                    <strong>Tiempo: </strong>
                                    <small>{servicio.tiempo_minutos} Minutos</small>
                                </div>
                            </div>
                        </div>
                        {
                            !servicio.termino &&
                            mostrar_avanzado &&
                            <Fragment>
                                {
                                    mostrar_cambiar_tiempo &&
                                    <div className="col-12">
                                        <ServicioCambiarTiempoList
                                            servicio={servicio}
                                            onExtenderTiempo={this.onExtenderTiempo}
                                            categorias_fracciones_tiempo_list={categorias_fracciones_tiempo_disponibles_array}
                                        />
                                    </div>
                                }
                                {
                                    mostrar_anular_servicio &&
                                    <div className="col-12">
                                        <ServicioAnularForm
                                            onSubmit={this.solicitarAnulacion}
                                            servicio={servicio}
                                        />
                                    </div>
                                }
                                {
                                    mostrar_cambiar_habitacion &&
                                    <div className="col-12">
                                        <CambioHabitacion
                                            habitaciones={habitaciones_para_cambiar_array}
                                            servicios={servicios_para_cambiar_habitacion_array}
                                            onCambiarHabitacion={this.onCambiarHabitacion}
                                            habitacion={habitaciones[servicio.habitacion]}
                                        />
                                    </div>
                                }
                            </Fragment>
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <i
                        className={`far fa-${mostrar_avanzado ? 'minus' : 'plus'}-circle puntero`}
                        onClick={() => this.setState((s) => {
                            return {
                                mostrar_avanzado: !s.mostrar_avanzado,
                                mostrar_anular_servicio: false,
                                mostrar_cambiar_tiempo: false
                            }
                        })}
                        style={{position: 'absolute', left: 10}}>
                    </i>
                    {
                        mostrar_avanzado &&
                        <div style={{position: 'absolute', left: 50}}>
                            <span
                                className='puntero'
                                onClick={() => this.setState({
                                    mostrar_anular_servicio: true,
                                    mostrar_cambiar_tiempo: false,
                                    mostrar_cambiar_habitacion: false,
                                })}
                            >
                                Anular
                            </span> |
                            <span
                                className='puntero'
                                onClick={() => this.setState({
                                    mostrar_anular_servicio: false,
                                    mostrar_cambiar_habitacion: false,
                                    mostrar_cambiar_tiempo: true
                                })}
                            > Cambiar Tiempo</span> |
                            <span
                                className='puntero'
                                onClick={() => this.setState({
                                    mostrar_anular_servicio: false,
                                    mostrar_cambiar_tiempo: false,
                                    mostrar_cambiar_habitacion: true,
                                })}
                            > Cambiar Habitación</span>
                        </div>
                    }
                    <Button
                        color="secondary"
                        variant="contained"
                        className='ml-3'
                        onClick={() => cerraModal()}
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default ServicioDetailModal;