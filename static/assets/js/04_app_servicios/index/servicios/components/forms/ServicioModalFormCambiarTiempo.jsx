import React, {Component, Fragment} from 'react';
import {pesosColombianos} from "../../../../../00_utilities/common";
import FormaPago from '../../../../../07_cajas/formas_de_pago/components/forms/forma_pago';
import DropdownList from 'react-widgets/lib/DropdownList';
import Typography from '@material-ui/core/Typography';


class modeloServicioForm extends Component {
    constructor(props) {
        super(props);
        this.state = {categoria_fraccion_tiempo: null};
        this.onCambiarTiempo = this.onCambiarTiempo.bind(this);
    }

    onCambiarTiempo(values) {
        const {onExtenderTiempo} = this.props;
        const {categoria_fraccion_tiempo} = this.state;
        const categoria_fraccion_tiempo_id = categoria_fraccion_tiempo.id;
        onExtenderTiempo({...values, categoria_fraccion_tiempo_id})
    }

    render() {
        const {
            servicio,
            categorias_fracciones_tiempo_list,
        } = this.props;

        const {categoria_fraccion_tiempo} = this.state;

        const {valor_servicio} = servicio;
        const valor_actual = valor_servicio;
        const valor_nuevo = categoria_fraccion_tiempo ? categoria_fraccion_tiempo.valor : 0;
        const valor_a_pagar = categoria_fraccion_tiempo ? valor_nuevo - valor_actual : 0;

        return (
            <div className="row">
                <div className="col-12">
                    <Typography variant="h5" gutterBottom color="primary">
                        Cambio en tiempo de servicio
                    </Typography>
                </div>
                {
                    _.size(categorias_fracciones_tiempo_list) > 0 &&
                    <div className="col-12 col-sm-4">
                        <DropdownList
                            data={_.map(categorias_fracciones_tiempo_list, c => c)}
                            placeholder='Fracción de tiempo...'
                            textField='fraccion_tiempo_nombre'
                            valuesField='id'
                            onSelect={(e) => this.setState({categoria_fraccion_tiempo: e})}
                        />
                    </div>
                }
                {
                    valor_a_pagar !== 0 &&
                    <div className="col-12">
                        <FormaPago
                            onSubmit={this.onCambiarTiempo}
                            valor_a_pagar={valor_a_pagar}
                            texto_boton={valor_a_pagar > 0 ? 'Extender Tiempo' : 'Reducir Tiempo'}
                        >
                            <table className='table table-responsive'>
                                <tbody>
                                <tr>
                                    <td>Valor Actual</td>
                                    <td>{pesosColombianos(valor_actual)}</td>
                                </tr>
                                <tr>
                                    <td>Valor Nuevo</td>
                                    <td>{pesosColombianos(valor_nuevo)}</td>
                                </tr>
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td>{valor_a_pagar > 0 ? 'Pago Adicional' : 'Devolución'}</td>
                                    <td>{pesosColombianos(valor_a_pagar)}</td>
                                </tr>
                                </tfoot>
                            </table>
                        </FormaPago>
                    </div>
                }
            </div>
        )
    }
}

export default modeloServicioForm;