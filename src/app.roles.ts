import {RolesBuilder} from 'nest-access-control';

export enum AppRoles{
    AUTHOR = 'AUTHOR',
    ADMIN = 'ADMIN',
    
}

export enum AppResource{
    USER = 'USER',
    POST = 'POST',
    MODULE = 'MODULE'
}


export const roles: RolesBuilder = new RolesBuilder();

roles
//AUTHOR ROLES
//crear, actualizar, eliminar su propio articulo
.grant(AppRoles.AUTHOR)
.updateOwn([AppResource.USER])
.deleteOwn([AppResource.USER])
.createOwn([AppResource.POST])
.updateOwn([AppResource.POST])
.deleteOwn([AppResource.POST])
.createOwn([AppResource.MODULE])
.updateOwn([AppResource.MODULE])
//AUTHOR ROLES
.grant(AppRoles.ADMIN)
.extend(AppRoles.AUTHOR)
.createAny([AppResource.USER])
.updateAny([AppResource.POST,AppResource.USER])
.deleteAny([AppResource.POST,AppResource.USER])
