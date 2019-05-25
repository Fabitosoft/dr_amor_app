import React from "react";
import MyDialogButtonDelete from '../../../../../00_utilities/components/ui/dialog/delete_dialog';
import {pesosColombianos} from '../../../../../00_utilities/common';
import IconButtonTableEdit from '../../../../../00_utilities/components/ui/icon/table_icon_button_edit';

import ReactTable from "react-table";

class Tabla extends React.Component {
    render() {

        const data = this.props.data;
        const {
            updateItem,
            singular_name,
            onDelete,
            onSelectItemEdit,
            permisos_object
        } = this.props;


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
                                maxWidth: 150,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].includes(filter.value.toUpperCase())
                                }
                            },
                            {
                                Header: "$ Impuestos",
                                accessor: "impuesto",
                                maxWidth: 150,
                                Cell: row => pesosColombianos(row.value)
                            },
                            {
                                Header: "$ Ant. Impuesto",
                                maxWidth: 150,
                                accessor: "valor_antes_impuestos",
                                Cell: row => pesosColombianos(row.value)
                            },
                            {
                                Header: "$ Habitación",
                                accessor: "valor",
                                maxWidth: 150,
                                Cell: row => pesosColombianos(row.value)
                            },
                            {
                                Header: "$ Adi. Servicio",
                                accessor: "valor_adicional_servicio",
                                maxWidth: 150,
                                Cell: row => pesosColombianos(row.value)
                            },
                            {
                                Header: "$ Total",
                                accessor: "valor_adicional_servicio",
                                maxWidth: 150,
                                Cell: row => pesosColombianos(parseFloat(row.value) + parseFloat(row.original.valor))
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
                                Cell: row =>
                                    <MyDialogButtonDelete
                                        onDelete={() => {
                                            onDelete(row.original)
                                        }}
                                        element_name={row.original.nombre}
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
    }
}

export default Tabla;