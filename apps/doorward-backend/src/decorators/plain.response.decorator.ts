import { SetMetadata } from '@nestjs/common';

const PlainResponse = () => SetMetadata('plain-response', true);

export default PlainResponse;
