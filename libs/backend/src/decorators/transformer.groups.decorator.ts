import { SetMetadata } from '@nestjs/common';

/**
 * Used to specify the groups that will be used by the class-transformer during serialization.
 *
 * @param groups
 * @constructor
 */
const TransformerGroups = (...groups: Array<string>) => SetMetadata('transformerGroups', groups);

export default TransformerGroups;
