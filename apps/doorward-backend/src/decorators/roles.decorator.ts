import { SetMetadata } from '@nestjs/common';
import { Roles } from '@doorward/common/types/roles';

const AllowedRoles = (...roles: Roles[]) => SetMetadata('roles', roles);

export default AllowedRoles;
