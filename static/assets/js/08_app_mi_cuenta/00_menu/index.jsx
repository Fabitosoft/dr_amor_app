import React, {Fragment, memo} from 'react';
import DrawerListItem from '../../00_utilities/components/ui/drawer/DrawerMenuListItem';

const Menu = () => <Fragment>
    <DrawerListItem
        size='lg'
        link='/app/mi_cuenta/seguridad/'
        texto='Seguridad'
        icono='shield-check'
    />
    <DrawerListItem
        size='lg'
        link='/app/mi_cuenta/financiero/'
        texto='Financiero'
        icono='coins'
    />
</Fragment>;

export default memo(Menu);