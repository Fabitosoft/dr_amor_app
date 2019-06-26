import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {MyTextFieldSimple, MyCheckboxSimple} from '../../../../../../00_utilities/components/ui/forms/fields';
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
                    case='U'/>
                <MyCheckboxSimple
                    nombre='Principal'
                    className='col-12'
                    name='es_principal'
                />
            </MyFormTagModal>
        )
    }
}

Form = reduxForm({
    form: "bodegasForm",
    validate,
    enableReinitialize: true
})(Form);

export default Form;