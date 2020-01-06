import { environment } from '../environments/environment';

class Organization {
  static async get() {
    const where = {};
    if (environment.ORGANIZATION_ID) {
      where.id = environment.ORGANIZATION_ID;
    } else {
      where.name = 'Edudoor';
    }

    let organization = await models.Organization.findOne({ where });
    if (!organization) {
      organization = await models.Organization.findOne({ where: { name: 'Edudoor' } });
      environment.ORGANIZATION_ID = organization.id;
    }
    return organization;
  }

  static getId() {
    return environment.ORGANIZATION_ID;
  }
}

export default Organization;
