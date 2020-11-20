import { environment } from 'src/environments/environment'
import { Menu } from './models/menu';
export const resource = {
    FILMS: '/films/',
    CHARACTER: '/characters/',
    PLANETS: '/planets/'
};

export const ResourceName = {
    FILMS: 'films',
    CHARACTER: 'people',
    PLANETS: 'planets'
}

export const resourceUrl = {
    FILMS: environment.api_URL + 'films/',
    CHARACTER: environment.api_URL + 'people/',
    PLANETS: environment.api_URL + 'planets/'
};

export const MenuLinks: Menu[] = [
    {
        label: 'Filme',
        routerLink: '/films',
    },
    {
        label: 'Charaktere',
        routerLink: '/characters',
    },
    {
        label: 'Planeteen',
        routerLink: '/planets',
    }
];
