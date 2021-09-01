import { SetMetadata } from '@nestjs/common';

const PayloadSize = (size: number) => SetMetadata('payloadSizeLimit', size);

export default PayloadSize;
