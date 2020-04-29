import { Op } from 'sequelize';
const roles = require('../utils/roles');
import bcrypt from 'bcrypt';
import models from '../database/models';

class OrganizationUtils {
  static async initialize(models) {
    let organization: any;
    if (process.env.ORGANIZATION_NAME) {
      organization = await models.Organization.findOne({
        where: {
          name: {
            [Op.iLike]: process.env.ORGANIZATION_NAME,
          },
        },
      });
      if (!organization) {
        organization = await models.Organization.create({
          name: process.env.ORGANIZATION_NAME,
          description: '',
          icon: process.env.ORGANIZATION_LOGO,
          link: process.env.ORGANIZATION_WEBSITE_LINK,
          darkThemeIcon: process.env.ORGANIZATION_LOGO_DARK_THEME,
        });

        const fullName = process.env.ORGANIZATION_DEFAULT_ADMIN_FULLNAME.trim().split(/\s+/);
        // create the organization admin
        const admin = await models.User.create({
          username: process.env.ORGANIZATION_DEFAULT_ADMIN_USERNAME,
          firstName: fullName[0],
          lastName: fullName.length > 1 ? fullName.splice(1).join(' ') : '',
          password: await bcrypt.hash(
            process.env.ORGANIZATION_DEFAULT_ADMIN_PASSWORD,
            +process.env.BCRYPT_PASSWORD_SALT
          ),
          email: process.env.ORGANIZATION_DEFAULT_ADMIN_EMAIL,
          status: 'ACTIVE_NOT_DELETABLE',
          organizationId: organization.id,
        });

        const adminRole = await models.Role.findOne({
          name: roles.SUPER_ADMINISTRATOR,
        });

        await models.UserRole.create({
          userId: admin.id,
          roleId: adminRole.id,
        });
      }

      process.env.ORGANIZATION_ID = organization.id;
    } else {
      throw new Error('Organization name not specified in the environment');
    }
  }
  static async get() {
    return await models.Organization.findByPk(process.env.ORGANIZATION_ID);
  }

  static getId() {
    return process.env.ORGANIZATION_ID;
  }
}

export default OrganizationUtils;
