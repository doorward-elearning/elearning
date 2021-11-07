import { SetMetadata } from '@nestjs/common';


/**
 * Set the payload size in bytes
 * @param size
 * @constructor
 */
const PayloadSize = (size: number) => SetMetadata('payloadSizeLimit', size);

export default PayloadSize;
