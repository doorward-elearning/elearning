import models from '../../database/models';
import OrganizationUtils from '../../utils/OrganizationUtils';
import { Op } from 'sequelize';

class OrganizationController {
  static async create(req) {
    const organization = await models.Organization.create({
      ...req.body,
    });

    return [200, { organization }, 'Organization created successfully!'];
  }

  static async getAll() {
    const organizations = await models.Organization.findAll({
      where: {
        id: {
          [Op.ne]: process.env.DEFAULT_ORGANIZATION_ID,
        },
      },
    });

    return [200, { organizations }];
  }

  static async updateOrganization(req) {
    const { organizationId } = req.params;
    const { name, icon, description } = req.body;

    const organization = await models.Organization.findByPk(organizationId);

    await organization.update({
      name,
      icon,
      description,
    });
    await organization.reload();

    return [200, { organization }, 'Organization updated successfully.'];
  }

  static async getOrganization(req) {
    const { organizationId } = req.params;

    const organization = await models.Organization.findByPk(organizationId);

    return [200, { organization }];
  }

  static async getCurrentOrganization(req) {
    return [200, { organization: await OrganizationUtils.get() }];
  }
}

export default OrganizationController;
