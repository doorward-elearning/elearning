import DApiResponse from '@doorward/common/dtos/response/base.response';

export class JitsiBrandingResponse extends DApiResponse {
  logoClickUrl: string;
  logoImageUrl: string;
  inviteDomain: string;
}
