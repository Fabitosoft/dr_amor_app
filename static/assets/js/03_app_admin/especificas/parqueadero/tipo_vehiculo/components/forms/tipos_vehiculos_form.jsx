import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {
    MyCombobox,
    MyTextFieldSimple,
    MyCheckboxSimple
} from '../../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';
import InputAdornment from "@material-ui/core/InputAdornment";


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
            empresas_list,
            error,
        } = this.props;
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
                    nombre='Valor Impuesto Único'
                    name='valor_impuesto_unico'
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
                <MyTextFieldSimple
                    className="col-12 col-md-3 pl-4"
                    nombre='% Iva'
                    name='porcentaje_iva'
                    InputProps={{
                        startAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                />
                <MyCombobox
                    className="col-12"
                    nombre='Empresa'
                    name='empresa'
                    textField='nombre'
                    placeholder='Seleccionar Empresa'
                    valuesField='id'
                    data={_.map(empresas_list, h => {
                        return ({
                            id: h.id,
                            nombre: h.nombre
                        })
                    })}
                    filter='contains'
                />
                <MyCheckboxSimple
                    nombre='Tiene Placa'
                    name='tiene_placa'
                    className="col-12"
                />
            </MyFormTagModal>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {item_seleccionado} = ownProps;
    return {
        initialValues: item_seleccionado
    }
}

Form = reduxForm({
    form: "categoriaProductoForm",
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;