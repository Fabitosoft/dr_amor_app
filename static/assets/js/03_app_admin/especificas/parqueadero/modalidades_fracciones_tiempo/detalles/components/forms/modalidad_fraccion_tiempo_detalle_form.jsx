import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {
    MyTextFieldSimple,
} from '../../../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';
import InputAdornment from "@material-ui/core/InputAdornment";
import {formValueSelector} from 'redux-form';


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
            error,
            modalidad_fraccion_tiempo,
            valores
        } = this.props;
        return (
            <MyFormTagModal
                fullScreen={false}
                onCancel={onCancel}
                onSubmit={handleSubmit((v) => {
                    onSubmit({...v, modalidad_fraccion_tiempo: modalidad_fraccion_tiempo.id});
                })}
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={singular_name}
                error={error}
            >
                <MyTextFieldSimple
                    className="col-12 col-md-4"
                    nombre='Minutos'
                    name='minutos'
                    type='number'
                />
                <MyTextFieldSimple
                    className="col-12 col-md-5 pl-md-4"
                    nombre='Valor'
                    name='valor'
                    type='number'
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
                {
                    valores &&
                    valores.minutos &&
                    <div className='col-12'>
                        {valores.minutos / 60} Horas
                    </div>
                }
            </MyFormTagModal>
        )
    }
}

const selector = formValueSelector('modalidadFraccionTiempoDetalleForm');

function mapPropsToState(state, ownProps) {
    const {item_seleccionado} = ownProps;
    return {
        initialValues: item_seleccionado,
        valores: selector(state, 'minutos', '')
    }
}

Form = reduxForm({
    form: "modalidadFraccionTiempoDetalleForm",
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;