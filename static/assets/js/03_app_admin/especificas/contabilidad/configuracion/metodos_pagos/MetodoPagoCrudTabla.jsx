import React, {memo} from "react";
import MyDialogButtonDelete from '../../../../../00_utilities/components/ui/dialog/DeleteDialog';
import IconButtonTableEdit from '../../../../../00_utilities/components/ui/icon/TableIconButtonEdit';

import ReactTable from "react-table";


const areEqual = (prevProps, nextProps) => {
    return prevProps.list === nextProps.list;
};
const Tabla = memo((props) => {
    let data = _.map(props.list);
    const {
        updateItem,
        singular_name,
        onDelete,
        onSelectItemEdit,
        permisos_object
    } = props;

    return (
        <ReactTable
            data={data}
            noDataText={`No hay elementos para mostrar tipo ${singular_name}`}
            columns={[
                {
                    Header: "Caracteristicas",
                    columns: [
                        {
                            Header: "Nombre",
                            accessor: "nombre",
                            maxWidth: 250,
                            filterable: true
                        },
                        {
                            Header: "Tipo",
                            accessor: "get_tipo_display",
                            maxWidth: 80,
                            filterable: true
                        },
                        {
                            Header: "Cuenta Bancaria",
                            accessor: "cuenta_bancaria_descripcion",
                            maxWidth: 200,
                            filterable: true,
                            Cell: row => {
                                return (
                                    <div style={{
                                        fontSize: '0.6rem',
                                        whiteSpace: 'normal'
                                    }}>{row.value}</div>
                                )
                            }
                        },
                        {
                            Header: "Cuenta Método Pago",
                            accessor: "cuenta_metodo_pago_codigo",
                            maxWidth: 200,
                            Cell: row => {
                                return (
                                    <div style={{
                                        fontSize: '0.6rem',
                                        whiteSpace: 'normal'
                                    }}>{row.value} - {row.original.cuenta_metodo_pago_descripcion}</div>
                                )
                            }
                        },
                        {
                            Header: "Cuenta Método Pago Devo",
                            accessor: "cuenta_metodo_pago_devolucion_codigo",
                            maxWidth: 200,
                            Cell: row => {
                                return (
                                    <div style={{
                                        fontSize: '0.6rem',
                                        whiteSpace: 'normal'
                                    }}>{row.value} - {row.original.cuenta_metodo_pago_devolucion_descripcion}</div>
                                )
                            }
                        },
                        {
                            Header: "Diario Contable",
                            accessor: "diario_contable_nombre",
                            maxWidth: 180,
                            filterable: true
                        },
                    ]
                },
                {
                    Header: "Opciones",
                    columns: [
                        {
                            Header: "Elimi.",
                            show: permisos_object.delete,
                            maxWidth: 60,
                            Cell: row => <MyDialogButtonDelete
                                onDelete={() => {
                                    onDelete(row.original)
                                }}
                                element_name={row.original.to_string}
                                element_type={singular_name}
                            />

                        },
                        {
                            Header: "Editar",
                            show: permisos_object.change,
                            maxWidth: 60,
                            Cell: row =>
                                <IconButtonTableEdit
                                    onClick={() => {
                                        onSelectItemEdit(row.original);
                                    }}/>
                        },
                    ]
                }
            ]}
            defaultPageSize={10}
            className="-striped -highlight tabla-maestra"
        />
    );
}, areEqual);


export default Tabla;