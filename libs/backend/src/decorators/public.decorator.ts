import { SetMetadata } from '@nestjs/common';

/**
 * Use this decorator to mark a route as not requiring authentication/ authorization
 * @constructor
 */
const Public = () => SetMetadata('isPublic', true);

export default Public;
