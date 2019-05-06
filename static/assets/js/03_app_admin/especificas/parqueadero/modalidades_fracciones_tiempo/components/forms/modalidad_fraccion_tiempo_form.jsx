import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {
    MyCombobox,
    MyTextFieldSimple
} from '../../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';


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
            tipos_vehiculos_list,
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
                <MyCombobox
                    className="col-12"
                    nombre='Tipo Vehículo'
                    name='tipo_vehiculo'
                    textField='nombre'
                    placeholder='Seleccionar Empresa'
                    valuesField='id'
                    data={_.map(tipos_vehiculos_list, h => {
                        return ({
                            id: h.id,
                            nombre: h.nombre
                        })
                    })}
                    filter='contains'
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