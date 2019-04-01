import React, {Component} from 'react';
import {formValueSelector, reduxForm} from 'redux-form';
import {MyTextFieldSimple} from '../../../../../../00_utilities/components/ui/forms/fields';
import {pesosColombianos} from '../../../../../../00_utilities/common';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';


class Form extends Component {
    render() {
        const {
            pristine,
            submitting,
            reset,
            initialValues,
            onSubmit,
            onCancel,
            handleSubmit,
            modal_open,
            singular_name,
            valores,
            error
        } = this.props;
        const {porcentaje_impuesto, valor, comision} = valores;
        const valor_sin_iva = (valor / (1 + (porcentaje_impuesto / 100)));
        const iva = valor - valor_sin_iva;
        return (
            <MyFormTagModal
                fullScreen={false}
                onCancel={onCancel}
                onSubmit={handleSubmit(onSubmit)}
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={singular_name}
                error={error}
            >
                <MyTextFieldSimple
                    className="col-12"
                    nombre='Nombre'
                    name='nombre'
                    case='U'
                />
                <MyTextFieldSimple
                    className="col-12 col-md-7"
                    nombre='Comisión'
                    name='comision'
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
                <MyTextFieldSimple
                    className="col-12 col-md-7"
                    nombre='Valor'
                    name='valor'
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
                <MyTextFieldSimple
                    className="col-12 col-md-3 pl-md-3"
                    nombre='% Impuesto'
                    name='porcentaje_impuesto'
                    InputProps={{
                        startAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                />
                <div className="col-12">
                    <Typography variant="body1" gutterBottom>
                        <strong>Valor sin Iva y sin Comisión: </strong>{pesosColombianos(valor_sin_iva - comision)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Comisión: </strong>{pesosColombianos(comision)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Iva: </strong>{pesosColombianos(iva)}
                    </Typography>
                </div>
            </MyFormTagModal>
        )
    }
}

const selector = formValueSelector('habitacionesTipoForm');

function mapPropsToState(state, ownProps) {
    const {item_seleccionado} = ownProps;
    const values = selector(state, 'porcentaje_impuesto', 'valor', 'comision');
    return {
        initialValues: item_seleccionado,
        valores: values,
    }
}

Form = reduxForm({
    form: "habitacionesTipoForm",
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;