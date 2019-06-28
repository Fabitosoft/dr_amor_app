import React, {Fragment, useEffect, useState} from 'react';
import {formValueSelector, reduxForm} from 'redux-form';
import {MyTextFieldSimple} from '../../../../../00_utilities/components/ui/forms/fields';
import {pesosColombianos} from '../../../../../00_utilities/common';
import {useDispatch, useSelector} from "react-redux";
import {MyFormTagModal} from '../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';
import Typography from '@material-ui/core/Typography/index';
import InputAdornment from '@material-ui/core/InputAdornment/index';
import Combobox from 'react-widgets/lib/Combobox';
import Button from "@material-ui/core/Button/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import * as actions from '../../../../../01_actions/01_index';

const styles = {
    table: {
        fontSize: '0.8rem',
        td: {
            padding: '0',
            margin: '0',
            paddingLeft: '3px',
            paddingRight: '3px',
            border: '1px solid black'
        },
        td_right: {
            padding: '0',
            margin: '0',
            paddingRight: '3px',
            paddingLeft: '3px',
            textAlign: 'right',
            border: '1px solid black'
        },
        td_total: {
            padding: '0',
            margin: '0',
            paddingRight: '3px',
            paddingLeft: '3px',
            textAlign: 'right',
            borderBottom: 'double 3px'
        },
        tr: {
            padding: '0',
            margin: '0',
        }
    },
};

const ImpuestoTable = (props) => {
    const {impuestos, onDelete} = props;
    return (
        <table className='table table-striped' style={styles.table}>
            <thead>
            <tr style={styles.table.tr}>
                <th style={styles.table.td}>Impuesto</th>
                <th style={styles.table.td}>Tipo Calculo</th>
                <th style={styles.table.td}>Cuantía Venta</th>
                <th style={styles.table.td}>Cuantía Compra</th>
                <th style={styles.table.td}></th>
            </tr>
            </thead>
            <tbody>
            {
                impuestos.map(e => {
                        const tipo_impuesto = e.tipo_calculo_impuesto === 3 ? '$' : '%';
                        let tasa_importe_venta = parseFloat(e.tasa_importe_venta).toFixed(2);
                        let tasa_importe_compra = parseFloat(e.tasa_importe_compra).toFixed(2);
                        tasa_importe_venta = tipo_impuesto === '%' ? `${tasa_importe_venta}%` : `$${tasa_importe_venta}`;
                        tasa_importe_compra = tipo_impuesto === '%' ? `${tasa_importe_compra}%` : `$${tasa_importe_compra}`;
                        return (
                            <tr style={styles.table.tr} key={e.id}>
                                <td style={styles.table.td}>{e.nombre}</td>
                                <td style={styles.table.td}>{e.tipo_calculo_impuesto_display}</td>
                                <td style={styles.table.td}>{tasa_importe_venta}</td>
                                <td style={styles.table.td}>{tasa_importe_compra}</td>
                                <td style={styles.table.td}>
                                    <FontAwesomeIcon
                                        className='puntero'
                                        onClick={() => onDelete(e.id)}
                                        icon={['far', 'minus-circle']}
                                    />
                                </td>
                            </tr>
                        )
                    }
                )
            }
            </tbody>
            <tfoot>
            <tr style={styles.table.tr}>

            </tr>
            </tfoot>
        </table>
    )
};


let Form = (props) => {
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
        error
    } = props;
    const dispatch = useDispatch();
    const impuestos = useSelector(state => state.contabilidad_impuestos);
    const valores = useSelector(state => selector(state, 'porcentaje_impuesto', 'valor', 'comision'));
    console.log(valores)
    const [impuesto_seleccionado_id, setImpuestoSeleccionado] = useState(null);
    const adicionarImpuesto = () => {
        return dispatch(actions.adicionarQuitarImpuestoTipoHabitacion(initialValues.id, impuesto_seleccionado_id));
    };
    const quitarImpuesto = (impuesto_id) => {
        return dispatch(actions.adicionarQuitarImpuestoTipoHabitacion(initialValues.id, impuesto_id))
    };
    useEffect(() => {
        if (initialValues) {
            dispatch(actions.fetchImpuestos());
        }
        return () => dispatch(actions.clearImpuestos());
    }, []);
    return (
        <MyFormTagModal
            fullScreen={true}
            onCancel={onCancel}
            onSubmit={handleSubmit(v => {
                dispatch(actions.fetchImpuestos());
                return onSubmit(v, null, null, false);
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
                className="col-12 col-md-5"
                nombre='Nombre'
                name='nombre'
                case='U'
            />
            <MyTextFieldSimple
                className="col-12 col-md-3 ml-3"
                nombre='Valor'
                name='valor'
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
            />
            <MyTextFieldSimple
                className="col-12 col-md-3 ml-3"
                nombre='Valor Add. Servicio'
                name='valor_adicional_servicio'
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
            />
            {
                initialValues &&
                <Fragment>
                    <Combobox
                        className="col-9"
                        data={_.map(impuestos)}
                        filter='contains'
                        placeholder='Buscar Impuesto'
                        valueField='id'
                        textField='nombre'
                        onSelect={e => {
                            setImpuestoSeleccionado(e.id);
                        }}
                    />
                    <Button
                        onClick={() => adicionarImpuesto()}
                        color='primary'
                        variant="outlined"
                    >
                        Adicionar
                    </Button>
                    <div className="col-12 mt-2">
                        <ImpuestoTable
                            impuestos={initialValues.impuestos}
                            onDelete={quitarImpuesto}
                        />
                    </div>
                </Fragment>
            }
            {
                initialValues &&
                <Fragment>
                    <div className="col-12">
                        <Typography variant="body1" gutterBottom>
                            <strong>Valor sin
                                Impuestos: </strong>{pesosColombianos(initialValues.valor_antes_impuestos)}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Impuestos: </strong>{pesosColombianos(initialValues.impuesto)}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Valor: </strong>{pesosColombianos(initialValues.valor)}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>$ Adi.
                                Servicio: </strong>{pesosColombianos(initialValues.valor_adicional_servicio)}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>$
                                Total: </strong>{pesosColombianos(parseFloat(initialValues.valor) + parseFloat(initialValues.valor_adicional_servicio))}
                        </Typography>
                    </div>
                </Fragment>
            }
        </MyFormTagModal>
    )
};


const selector = formValueSelector('habitacionesTipoForm');

Form = reduxForm({
    form: "habitacionesTipoForm",
    validate,
    enableReinitialize: true
})(Form);

export default Form;