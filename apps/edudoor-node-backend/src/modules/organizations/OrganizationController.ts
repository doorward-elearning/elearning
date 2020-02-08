import models from '../../database/models';

class OrganizationController {
  static async create(req) {
    const organization = await models.Organization.create({
      ...req.body,
    });

    return [200, { organization }, 'Organization created successfully!'];
  }

  static async getAll() {
    const organizations = await models.Organization.findAll();

    return [200, { organizations }];
  }
}

export default OrganizationController;
