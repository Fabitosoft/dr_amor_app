import React from "react";
import MyDialogButtonDelete from '../../../../../00_utilities/components/ui/dialog/delete_dialog';
import IconButtonTableEdit from '../../../../../00_utilities/components/ui/icon/table_icon_button_edit';

import ReactTable from "react-table";
import {Link} from "react-router-dom";
import IconButtonTableSee from "../../../../../00_utilities/components/ui/icon/table_icon_button_detail";

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
                                    return row[filter.id].includes(filter.value.toLowerCase())
                                }
                            },
                            {
                                Header: "Bodega",
                                accessor: "bodega_nombre",
                                maxWidth: 150
                            },
                            {
                                Header: "Tipo",
                                accessor: "tipo_nombre",
                                maxWidth: 150
                            },
                        ]
                    },
                    {
                        Header: "Opciones",
                        columns: [
                            {
                                Header: "Ver",
                                show: permisos_object.detail,
                                maxWidth: 60,
                                Cell: row =>
                                    <Link to={`/app/admin/puntos_ventas/puntos_ventas/detail/${row.original.id}`}>
                                        <IconButtonTableSee/>
                                    </Link>

                            },
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