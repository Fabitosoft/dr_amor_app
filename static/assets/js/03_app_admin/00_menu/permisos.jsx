import React from 'react';
import DrawerListItem from '../../00_utilities/components/ui/drawer/DrawerMenuListItem';
import ListCollapse from '../../00_utilities/components/ui/drawer/DrawerMenuListCollapse';


const MenuPermisos = (props) => (
    <ListCollapse icono='lock' texto='Permisos'>
        <DrawerListItem
            size='1x'
            link='/app/admin/permisos/list'
            texto='Permisos'
            icono='lock'
            type='nested'
        />
        <DrawerListItem
            size='1x'
            link='/app/admin/grupos_permisos/list'
            texto='Grupos'
            icono='object-group'
            type='nested'
        />
    </ListCollapse>
);


export default MenuPermisos;
