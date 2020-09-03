import { SetMetadata } from '@nestjs/common';

const Privileges = (...privileges: Array<string>) => SetMetadata('privileges', privileges);

export default Privileges;
