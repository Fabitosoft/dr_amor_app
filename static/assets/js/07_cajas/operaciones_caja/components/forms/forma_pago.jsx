import React, {Component, Fragment} from 'react';

import BaseFormaPagoCamposForm from './registro_operacion_form';


class FormaPago extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valor_a_pagar: 0
        };
        this.onChangeFormaPago = this.onChangeFormaPago.bind(this);
    }

    onChangeFormaPago(valor_a_pagar) {
        this.setState({valor_a_pagar})
    }

    render() {
        const {
            onSubmit,
            valor_total_a_pagar = 0,
        } = this.props;

        const {valor_a_pagar} = this.state;

        return (
            <div className="row">
                <div className="col-12">
                    <h5>Forma de Pago</h5>
                    {this.props.children}
                    <BaseFormaPagoCamposForm
                        onSubmit={onSubmit}
                        onChangeFormaPago={this.onChangeFormaPago}
                        pago={{
                            valor_total_a_pagar,
                            valor_a_pagar,
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default FormaPago;