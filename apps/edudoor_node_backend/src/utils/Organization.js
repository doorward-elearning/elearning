class Organization {
  static async get() {
    const where = {};
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

export default Organization;
