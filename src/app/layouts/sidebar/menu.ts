import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [

    {
        id: 1,
        label: 'MENUITEMS.WEBSITE.TEXT',
        icon: 'grid',
        subItems: [
            {
                id: 2,
                label: 'MENUITEMS.WEBSITE.LIST.HOME',
                link: '/website/home',
                parentId: 1
            },
            {
                id: 3,
                label: 'MENUITEMS.WEBSITE.LIST.SHARE',
                link: '/website/share',
                parentId: 1
            },
        ]

    },

];

