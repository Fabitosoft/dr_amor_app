import React, {Fragment, memo} from 'react';
import {MyTextFieldSimple, MyDropdownList} from '../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {reduxForm} from 'redux-form'
import {pesosColombianos} from "../../../../00_utilities/common";
import validate from './validate';
import Button from '@material-ui/core/Button/index';

let BaseFormaPagoForm = memo(props => {
    const {
        handleSubmit,
        onSubmit,
        onChangeFormaPago,
        initialValues,
        texto_boton,
        es_devolucion,
        perdir_observacion_devolucion,
    } = props;
    const {valor_a_pagar, valor_tarjeta} = initialValues;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row p-1">
                <div className='col-12'>
                    {
                        !es_devolucion &&
                        <Fragment>
                            <MyTextFieldSimple
                                type='number'
                                name='valor_efectivo'
                                label='Valor efectivo'
                                className='col-md-3 col-lg-2'
                                onChange={e => {
                                    const nuevo_valor_efectivo = e.target.value;
                                    const nuevo_valor_tarjeta = valor_a_pagar - nuevo_valor_efectivo;
                                    onChangeFormaPago(nuevo_valor_tarjeta, nuevo_valor_efectivo)
                                }}
                                onDoubleClick={() => {
                                    onChangeFormaPago(0, valor_a_pagar)
                                }}
                            />
                            <div className="col-12">
                                <div className="row">
                                    <MyTextFieldSimple
                                        type='number'
                                        name='valor_tarjeta'
                                        label='Valor Tarjeta'
                                        className='col-md-3 col-lg-2'
                                        onChange={e => {
                                            const nuevo_valor_tarjeta = e.target.value;
                                            const nuevo_valor_efectivo = valor_a_pagar - nuevo_valor_tarjeta;
                                            onChangeFormaPago(nuevo_valor_tarjeta, nuevo_valor_efectivo)
                                        }}
                                        onDoubleClick={() => {
                                            onChangeFormaPago(valor_a_pagar, 0)
                                        }}
                                    />
                                    {
                                        valor_tarjeta > 0 &&
                                        <Fragment>
                                            <MyDropdownList
                                                name='franquicia'
                                                valuesField='id'
                                                textField='name'
                                                data={[
                                                    {id: 'VISA', name: 'VISA'},
                                                    {id: 'MASTERCARD', name: 'MASTERCARD'},
                                                    {id: 'AMERICAN EXPRESS', name: 'AMERICAN EXPRESS'},
                                                ]}
                                                label='Franquicia'
                                                label_space_xs={4}
                                                placeholder='Seleccionar Franquicia...'
                                                className='col-md-3 col-lg-2'
                                            />
                                            <MyTextFieldSimple
                                                name='nro_autorizacion'
                                                label='Nro. Autorización'
                                                className='col-md-3 col-lg-2'
                                            />
                                        </Fragment>
                                    }
                                    {
                                        valor_a_pagar - valor_tarjeta > 0 &&
                                        <div className='col-12'>
                                            <strong>En Efectivo: </strong>
                                            {pesosColombianos(valor_a_pagar - valor_tarjeta)}</div>
                                    }
                                    {
                                        valor_tarjeta > 0 &&
                                        <div className='col-12'>
                                            <strong>En Tarjeta: </strong>
                                            {pesosColombianos(valor_tarjeta)}</div>
                                    }
                                </div>
                            </div>
                        </Fragment>
                    }
                    {
                        es_devolucion &&
                        perdir_observacion_devolucion &&
                        <MyTextFieldSimple
                            name='observacion_devolucion'
                            label='Razon de la devolución'
                            multiline
                            rowsMax="4"
                            className='col-md-12'
                        />
                    }
                    <Button
                        color="primary"
                        variant="contained"
                        className='ml-3'
                        type='submit'
                    >
                        {texto_boton}
                    </Button>
                </div>

            </div>
        </form>
    )
});

function mapPropsToState(state, ownProps) {
    const {pago, es_devolucion} = ownProps;
    const {valor_tarjeta, valor_a_pagar} = pago;
    let nuevo_pago = pago;
    if (valor_tarjeta === 0 || es_devolucion) {
        nuevo_pago = {...pago, valor_efectivo: valor_a_pagar, valor_tarjeta: 0}
    }
    return {
        initialValues: nuevo_pago
    }
}

BaseFormaPagoForm = reduxForm({
    form: "baseFormaPagoForm",
    validate,
    enableReinitialize: true
})(BaseFormaPagoForm);

BaseFormaPagoForm = (connect(mapPropsToState, null)(BaseFormaPagoForm));

export default BaseFormaPagoForm;