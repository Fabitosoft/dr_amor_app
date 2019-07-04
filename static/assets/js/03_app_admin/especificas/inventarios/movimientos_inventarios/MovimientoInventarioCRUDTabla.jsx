import React, {memo} from "react";
import MyDialogButtonDelete from '../../../../00_utilities/components/ui/dialog/DeleteDialog';
import {fechaFormatoUno} from '../../../../00_utilities/common';
import IconButtonTableSee from '../../../../00_utilities/components/ui/icon/TableIconButtonDetail';
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome/index';

import ReactTable from "react-table";

const areEqual = (prevProps, nextProps) => {
    return prevProps.list === nextProps.list;
};

const Tabla = memo((props) => {
    const data = _.map(props.list);
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
                            Header: "Id",
                            accessor: "id",
                            maxWidth: 100
                        },
                        {
                            Header: "Fecha",
                            accessor: "fecha",
                            maxWidth: 150,
                            Cell: row => fechaFormatoUno(row.value)
                        },
                        {
                            Header: "Proveedor",
                            accessor: "proveedor_nombre",
                            maxWidth: 250,
                        },
                        {
                            Header: "Bodega",
                            accessor: "bodega_nombre",
                            maxWidth: 150,
                        },
                        {
                            Header: "Detalle",
                            accessor: "detalle",
                            maxWidth: 300,
                        },
                        {
                            Header: "Cargado",
                            accessor: "cargado",
                            maxWidth: 100,
                            Cell: row => {
                                return (
                                    <div className='text-center'>
                                        {
                                            row.value &&
                                            <FontAwesomeIcon
                                                icon={['far', 'check-circle']}
                                                style={{color: 'green'}}
                                            />
                                        }
                                    </div>
                                )
                            }
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
                                !row.original.cargado &&
                                <MyDialogButtonDelete
                                    onDelete={() => {
                                        onDelete(row.original)
                                    }}
                                    element_name={`de ${fechaFormatoUno(row.original.fecha)} número ${row.original.id}`}
                                    element_type={singular_name}
                                />

                        },
                        {
                            Header: "Ver",
                            show: permisos_object.detail,
                            maxWidth: 60,
                            Cell: row =>
                                <Link
                                    to={`/app/admin/inventarios/movimientos_inventarios/detail/${row.original.id}`}>
                                    <IconButtonTableSee/>
                                </Link>

                        }
                    ]
                }
            ]}
            defaultPageSize={10}
            className="-striped -highlight tabla-maestra"
        />
    );
}, areEqual);
export default Tabla;