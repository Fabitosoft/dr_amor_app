import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {MyTextFieldSimple, MyCombobox} from '../../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';
import asyncValidate from './asyncValidate';
import CedulaForm from './datos_cedula_acompanante_form';
import LectorCedula from '../../../../terceros/componentes/forms/lector_cedula_form';

const modelStyle = {
    width: '100%',
    height: '100%',
    maxWidth: 'none',
};

class Form extends Component {
    render() {
        const {
            pristine,
            submitting,
            reset,
            error,
            initialValues,
            onSubmit,
            onCancel,
            handleSubmit,
            modal_open,
            singular_name,
            setSelectItem,
            categorias_list,
            permisos_object,
        } = this.props;
        return (
            <MyFormTagModal
                modelStyle={modelStyle}
                onCancel={onCancel}
                onSubmit={handleSubmit(v => {
                    const datos = {
                        ...v,
                        nombre: v.nombre_1,
                        nombre_segundo: v.nombre_segundo_1 ? v.nombre_segundo_1 : '',
                        apellido: v.apellido_1,
                        apellido_segundo: v.apellido_segundo_1 ? v.apellido_segundo_1 : '',
                        nro_identificacion: v.nro_identificacion_1,
                    };
                    return onSubmit(datos)
                })}
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={singular_name}
                error={error}
            >
                <LectorCedula
                    setSelectItem={setSelectItem}
                >
                    <CedulaForm permisos={permisos_object}/>
                    <MyTextFieldSimple
                        className='col-12 col-md-6'
                        nombre='Alias'
                        name='alias_modelo'
                        case='U'
                    />
                    <MyCombobox
                        className="col-12 col-md-6"
                        name="categoria_modelo"
                        nombre='Categoria'
                        data={_.map(categorias_list, e => {
                            return {
                                id: e.id,
                                nombre: e.nombre,
                            }
                        })}
                        textField='nombre'
                        valuesField='id'
                        placeholder='Categoría Modelo...'
                        filter='contains'
                    />
                </LectorCedula>
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
    form: "acompanantesForm",
    validate,
    asyncValidate,
    asyncBlurFields: ['nro_identificacion_1', 'tipo_documento', 'alias_modelo'],
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;