import OrganizationUtils from '../../utils/OrganizationUtils';

export default class JitsiController {
  static async getBranding(req, res) {
    const organization = await OrganizationUtils.get();
    return res.status(200).json({
      logoClickUrl: organization.link,
      logoImageUrl: organization.icon,
      inviteDomain: req.headers.origin,
    });
  }
}
