import React, {Component} from 'react'
import ValidarPermisos from "../permisos/validar_permisos";
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function crudHOC(CreateForm, Tabla) {
    class CRUD extends Component {
        constructor(props) {
            super(props);
            this.state = ({
                item_seleccionado: null,
                modal_open: false
            });
            this.onSubmit = this.onSubmit.bind(this);
            this.onDelete = this.onDelete.bind(this);
            this.onSelectItemEdit = this.onSelectItemEdit.bind(this);
            this.setSelectItem = this.setSelectItem.bind(this);
        }

        onDelete(item) {
            const {method_pool, notificarAction, singular_name, successDeleteCallback = null} = this.props;
            const callback = () => {
                const {to_string} = item;
                notificarAction(`Se ha eliminado con éxito ${singular_name.toLowerCase()} ${to_string}`);
                this.setState({modal_open: false, item_seleccionado: null});
                if (successDeleteCallback) {
                    successDeleteCallback(item);
                }
            };
            method_pool.deleteObjectMethod(item.id, {callback});
        }

        onSubmit(item, uno = null, dos = null, cerrar_modal = true) {
            const {method_pool, notificarAction, singular_name, successSubmitCallback = null} = this.props;
            const callback = (response) => {
                const {to_string} = response;
                notificarAction(`Se ha ${item.id ? 'actualizado' : 'creado'} con éxito ${singular_name.toLowerCase()} ${to_string}`);
                this.setState({modal_open: !cerrar_modal, item_seleccionado: cerrar_modal ? null : response});
                if (successSubmitCallback) {
                    successSubmitCallback(response);
                }
            };
            if (item.id) {
                method_pool.updateObjectMethod(item.id, item, {callback});
            } else {
                method_pool.createObjectMethod(item, {callback});
            }
        }

        onSelectItemEdit(item) {
            const {method_pool} = this.props;
            const callback = () => this.setState({modal_open: true, item_seleccionado: item});
            method_pool.fetchObjectMethod(item.id, {callback});
        }

        setSelectItem(item_seleccionado) {
            this.setState({item_seleccionado})
        }

        render() {
            const {
                list,
                plural_name,
                permisos_object,
            } = this.props;
            const {
                item_seleccionado,
                modal_open
            } = this.state;
            const list_array = _.map(list, e => e);

            return (
                <ValidarPermisos can_see={permisos_object.list} nombre={plural_name}>
                    <Typography variant="h5" gutterBottom color="primary">
                        {plural_name}
                    </Typography>
                    {
                        permisos_object.add &&
                        <Button
                            color='primary'
                            className='ml-3'
                            onClick={() => {
                                this.setState({item_seleccionado: null, modal_open: true});
                            }}
                        >
                            Nuevo
                        </Button>

                    }
                    {
                        modal_open &&
                        <CreateForm
                            {...this.props}
                            item_seleccionado={item_seleccionado}
                            modal_open={modal_open}
                            onCancel={() => this.setState({modal_open: false, item_seleccionado: null})}
                            onSubmit={this.onSubmit}
                            setSelectItem={this.setSelectItem}
                        />
                    }

                    <Tabla
                        {...this.props}
                        data={list_array}
                        updateItem={this.onSubmit}
                        onDelete={this.onDelete}
                        onSelectItemEdit={this.onSelectItemEdit}
                    />
                </ValidarPermisos>
            )
        }
    }

    return CRUD;
}


crudHOC.propTypes = {
    plural_name: PropTypes.string,
    singular_name: PropTypes.string,
    method_pool: PropTypes.any,
    permisos_object: PropTypes.any,
    list: PropTypes.any
};

export default crudHOC;