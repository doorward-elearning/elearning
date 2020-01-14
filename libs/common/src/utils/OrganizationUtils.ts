import models from '../../../../apps/edudoor-node-backend/src/database/models';

class OrganizationUtils {
  static async get() {
    const where: any = {};
    if (process.env.ORGANIZATION_ID) {
      where.id = process.env.ORGANIZATION_ID;
    } else {
      where.name = 'Edudoor';
    }

    let organization = await models.Organization.findOne({ where });
    if (!organization) {
      organization = await models.Organization.findOne({ where: { name: 'Edudoor' } });
      process.env.ORGANIZATION_ID = organization.id;
    }
    return organization;
  }

  static getId() {
    return process.env.ORGANIZATION_ID;
  }
}

export default OrganizationUtils;
