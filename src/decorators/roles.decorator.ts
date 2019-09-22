import { ReflectMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => ReflectMetadata('roles', roles);


// NEW VERSION USE

// import { SetMetadata } from '@nestjs/common';

// export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
