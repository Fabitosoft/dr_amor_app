import React, {memo, Fragment} from 'react';
import {reduxForm, reset} from 'redux-form';
import {MyTextFieldSimple} from '../../../../00_utilities/components/ui/forms/fields';
import {MyFormTagModal} from '../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';
import asyncValidate from './asyncValidate';

const afterSubmit = (result, dispatch) => {
    dispatch(reset('usuarioForm'));
};

let Form = memo((props) => {
    const {
        pristine,
        submitting,
        reset,
        initialValues,
        onSubmit,
        onCancel,
        handleSubmit,
        modal_open,
        error,
    } = props;
    return (
        <MyFormTagModal
            onCancel={() => {
                onCancel();
                reset()
            }}
            onSubmit={handleSubmit(onSubmit)}
            reset={reset}
            initialValues={initialValues}
            submitting={submitting}
            modal_open={modal_open}
            pristine={pristine}
            element_type='Usuario'
            error={error}
        >
            <MyTextFieldSimple
                className="col-12 col-md-4"
                label='Nombre de Usuario'
                name='username'
                case='L'/>
            <MyTextFieldSimple
                className="col-12 col-md-8"
                label='Correo Electrónico'
                name='email'
                case='U'/>
            <MyTextFieldSimple
                className="col-12 col-md-6"
                label='Nombres'
                name='first_name'
                case='U'/>
            <MyTextFieldSimple
                className="col-12 col-md-6"
                label='Apellidos'
                name='last_name'
                case='U'/>
            {!initialValues &&
            <Fragment>
                <MyTextFieldSimple
                    type='password'
                    className="col-12 col-md-6"
                    label='Contraseña'
                    name='password'
                />
                <MyTextFieldSimple
                    type='password'
                    className="col-12 col-md-6"
                    label='Comprobación de contraseña'
                    name='password2'
                />
            </Fragment>
            }
        </MyFormTagModal>
    )
});


Form = reduxForm({
    form: "usuarioForm",
    onSubmitSuccess: afterSubmit,
    validate,
    asyncValidate,
    asyncBlurFields: ['username'],
    enableReinitialize: true
})(Form);

export default Form;